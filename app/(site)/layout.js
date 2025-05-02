import React from "react";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import Loading from "./loading";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import DismissToast from "./components/DismissToast";
import ClientProviders from "./components/ClientProviders";

export default function SiteLayout({ children }) {
  return (
    <ClientProviders>
      <div className="min-h-screen bg-[#F5E8D9] flex flex-col">
        <Navbar />
        <ToastContainer
            position="top-center"
            autoClose={4000}
            newestOnTop
            closeOnClick
            rtl={false}
            draggable
            pauseOnHover={false}
          />
          <DismissToast />
        <React.Suspense fallback={<Loading />}>
        
          <main className="flex-grow">{children}</main>
        </React.Suspense>
        <div className="mt-[80px] md:mt-[190px]">
          <Footer />
        </div>
      </div>
    </ClientProviders>
  );
}
