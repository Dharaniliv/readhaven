"use client";

import { useEffect, useState } from "react";
import { useForm, Controller }   from "react-hook-form";
import { useRouter }              from "next/navigation";
import { useSession }             from "next-auth/react";
import * as yup                   from "yup";
import { yupResolver }            from "@hookform/resolvers/yup";
import Image                      from "next/image";

const schema = yup.object().shape({
  googleId:    yup.string().required("Google ID is required"),
  title:       yup.string().required("Title is required"),
  author:      yup.string().required("Author is required"),
  image: yup
    .mixed()
    .required("Image is required")
    .test("fileType","Only image files are allowed",(value)=>{
      return value instanceof FileList &&
             value.length > 0 &&
             value[0].type.startsWith("image/");
    }),
  price:         yup.string().required("Price is required"),
  originalPrice: yup.string().required("Original price is required"),
  category:      yup.string().required("Category is required"),
  description:   yup.string().required("Description is required"),
});

export default function AddBookPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      googleId:     "",
      title:        "",
      author:       "",
      image:        null,
      price:        "",
      originalPrice:"",
      category:     "",
      description:  "",
    },
  });
  const [previewImage, setPreviewImage] = useState(null);

  
  useEffect(() => {
    setValue("googleId", crypto.randomUUID());
  }, [setValue]);


  useEffect(() => {
    if (status === "loading") return;       
    if (!session || !session.user.isAdmin) { 
      router.push("/");
    }
  }, [status, session, router]);


  const onSubmit = async (data) => {
    try {
   
      const imgForm = new FormData();
      imgForm.append("image", data.image[0]);
      const uploadRes = await fetch("/api/uploadImage", { method: "POST", body: imgForm });
      const uploadJson = await uploadRes.json().catch(() => { throw new Error("Invalid JSON from upload"); });
      if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");

    
      const payload = {
        googleId:     data.googleId,
        title:        data.title,
        author:       data.author,
        imageUrl:     uploadJson.imageUrl,
        price:        data.price,
        originalPrice:data.originalPrice,
        category:     data.category,
        description:  data.description,
      };
      const saveRes = await fetch("/api/saveBook", {
        method:  "POST",
        headers: { "Content-Type": "application/json" },
        body:    JSON.stringify(payload),
      });
      const saveJson = await saveRes.json();
      if (!saveRes.ok) throw new Error(saveJson.error || "Save failed");

      router.push("/");
    } catch (err) {
      setFormError("Please try again.");
    
    }
  };


  if (status === "loading") {
    return <div>Loading…</div>;
  }
  if (!session || !session.user.isAdmin) {
    return null;
  }


  return (
    <div className="w-full min-h-screen bg-[#7A4E2D] mt-[57px] flex justify-center items-center px-4 py-10">
      <div className="w-full max-w-[800px] bg-[#F5E8D9] rounded-[15px] p-6 md:p-10 flex flex-col items-center">
        <h2 className="text-[#162B44] font-playfair font-semibold text-[24px] md:text-[32px] text-center">
          Add Book
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-[500px] mt-10 space-y-6">
       
          <div>
            <label className="font-inter text-[#5A3E36] text-sm">Google ID</label>
            <div className="flex gap-2 mt-1">
              <input readOnly className="flex-1 h-[44px] px-4 border rounded-[8px] bg-gray-100" {...register("googleId")} />
              <button
                type="button"
                onClick={() => setValue("googleId", crypto.randomUUID())}
                className="px-4 bg-[#1E3A5F] text-white rounded-md hover:bg-[#002244]"
              >
                Regenerate
              </button>
            </div>
            {errors.googleId && <p className="text-red-600 text-sm mt-1">{errors.googleId.message}</p>}
          </div>

         
          {["title", "author", "category"].map((f) => (
            <div key={f}>
              <label className="font-inter text-[#5A3E36] text-sm">{f.charAt(0).toUpperCase() + f.slice(1)}</label>
              <input
                type="text"
                className="w-full h-[44px] px-4 border rounded-[8px] bg-transparent mt-1"
                {...register(f)}
              />
              {errors[f] && <p className="text-red-600 text-sm mt-1">{errors[f].message}</p>}
            </div>
          ))}

         
          <div>
            <label className="font-inter text-[#5A3E36] text-sm">Upload Image</label>
            <Controller
              name="image"
              control={control}
              render={({ field: { onChange, ref }, fieldState: { error } }) => (
                <>
                  <input
                    type="file"
                    accept="image/*"
                    ref={ref}
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file && file.type.startsWith("image/")) {
                        onChange(e.target.files);
                        setPreviewImage(URL.createObjectURL(file));
                      } else {
                        onChange(null);
                        setPreviewImage(null);
                      }
                    }}
                    className="w-full h-[44px] px-3 py-2 border rounded-[8px] bg-white mt-1"
                  />
                  {error && <p className="text-red-600 text-sm mt-1">{error.message}</p>}
                </>
              )}
            />
            {previewImage && (
              <div className="mt-4">
                <Image src={previewImage} alt="Preview" width={200} height={200} className="rounded-md border object-contain" />
              </div>
            )}
          </div>

     
          {["price", "originalPrice"].map((n) => (
            <div key={n}>
              <label className="font-inter text-[#5A3E36] text-sm">{n === "price" ? "Price" : "Original Price"}</label>
              <input type="text" className="w-full h-[44px] px-4 border rounded-[8px] bg-transparent mt-1" {...register(n)} />
              {errors[n] && <p className="text-red-600 text-sm mt-1">{errors[n].message}</p>}
            </div>
          ))}

       
          <div>
            <label className="font-inter text-[#5A3E36] text-sm">Description</label>
            <textarea className="w-full h-[120px] px-4 border rounded-[8px] bg-transparent mt-1" {...register("description")} />
            {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
          </div>

         
          <button type="submit" className="w-full h-[52px] bg-[#1E3A5F] text-white rounded-[8px] font-semibold hover:bg-[#002244] mt-4">
            Add Book
          </button>
        </form>
      </div>
    </div>
  );
}
