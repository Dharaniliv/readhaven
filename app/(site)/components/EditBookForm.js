"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import Image from "next/image";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  author: yup.string().required("Author is required"),
  image: yup
    .mixed()
    .nullable()        
    .notRequired()   
    .test(
      "fileType",
      "Only image files are allowed",
      value => (
        !value ||                              
        (value instanceof FileList &&
         value[0].type.startsWith("image/"))    
      )
    ),
  price: yup.string().required("Price is required"),
  originalPrice: yup.string().required("Original price is required"),
  category: yup.string().required("Category is required"),
  description: yup.string().required("Description is required"),
});

export default function EditBookForm({ book }) {
  const router = useRouter();
  const [previewImage, setPreviewImage] = useState(null);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      title: book.title,
      author: book.author,
      image: null,          
      price: book.price,
      originalPrice: book.originalPrice,
      category: book.category,
      description: book.description,
    },
  });

  const onSubmit = async (data) => {
    try {
      let imageUrl = book.image; 
      if (data.image?.length) {
        
        const imgForm = new FormData();
        imgForm.append("image", data.image[0]);
        const uploadRes = await fetch("/api/uploadImage", {
          method: "POST",
          body: imgForm,
        });
        const uploadJson = await uploadRes.json();
        if (!uploadRes.ok) throw new Error(uploadJson.error || "Upload failed");
        imageUrl = uploadJson.imageUrl;
      }

  
      const res = await fetch(`/api/books/${book.googleId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, imageUrl }),
      });
      if (!res.ok) {
        const json = await res.json();
        throw new Error(json.error || "Update failed");
      }
      router.push(`/book/${book.googleId}`);
    } catch (err) {
      if (process.env.NODE_ENV === "development") {
        console.error(err);
      }

    
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="w-full max-w-[500px] mx-auto space-y-6 p-6 bg-[#F5E8D9] rounded-[15px]"
    >
 
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Title</label>
        <input type="text" {...register("title")} className="w-full px-4 py-2 border rounded-md" />
        {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title.message}</p>}
      </div>

      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Author</label>
        <input type="text" {...register("author")} className="w-full px-4 py-2 border rounded-md" />
        {errors.author && <p className="text-red-600 text-sm mt-1">{errors.author.message}</p>}
      </div>
    
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Category</label>
        <input type="text" {...register("category")} className="w-full px-4 py-2 border rounded-md" />
        {errors.category && <p className="text-red-600 text-sm mt-1">{errors.category.message}</p>}
      </div>
   
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Price</label>
        <input type="text" {...register("price")} className="w-full px-4 py-2 border rounded-md" />
        {errors.price && <p className="text-red-600 text-sm mt-1">{errors.price.message}</p>}
      </div>
     
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Original Price</label>
        <input type="text" {...register("originalPrice")} className="w-full px-4 py-2 border rounded-md" />
        {errors.originalPrice && <p className="text-red-600 text-sm mt-1">{errors.originalPrice.message}</p>}
      </div>
   
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">Description</label>
        <textarea {...register("description")} className="w-full px-4 py-2 border rounded-md h-[120px]" />
        {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description.message}</p>}
      </div>
 
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">
          Current Cover
        </label>
        <Image
          src={book.image}
          alt="Current cover"
          width={200}
          height={200}
          className="rounded-md"
        />
      </div>

  
      <div>
        <label className="block mb-1 font-inter text-sm text-[#5A3E36]">
          Upload New Cover (optional)
        </label>
        <Controller
          name="image"
          control={control}
          render={({ field: { onChange, ref } }) => (
            <input
              type="file"
              accept="image/*"
              ref={ref}
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) {
                  onChange(e.target.files);
                  setPreviewImage(URL.createObjectURL(file));
                }
              }}
              className="w-full px-4 py-2 border rounded-md"
            />
          )}
        />
       
        {previewImage && (
          <Image
            src={previewImage}
            alt="New preview"
            width={200}
            height={200}
            className="mt-4 rounded-md"
          />
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full py-3 bg-[#1E3A5F] hover:bg-[#002244] text-white rounded-md text-lg"
      >
        {isSubmitting ? "Updating…" : "Update Book"}
      </button>
    </form>
  );
}