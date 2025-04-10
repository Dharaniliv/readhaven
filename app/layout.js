import './globals.css';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';

export const metadata = {
  title: 'ReadHaven',
  description: 'Your next favorite book is here.',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-[#F5E8D9]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        
        {/* Add spacing above footer here */}
        <div className="mt-[100px]">
          <Footer />
        </div>
      </body>
    </html>
  );
}
