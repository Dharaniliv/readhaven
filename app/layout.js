
import "./globals.css";

export const metadata = {
  title: {
    default: "ReadHaven - Discover Your Next Favorite Book",
    template: "%s - ReadHaven",
  },
  description: "Explore and buy your favorite books online at ReadHaven.",
  keywords: [
    "books", "buy books", "online bookstore", "ReadHaven", "bookstore",
    "reading", "novels", "fiction", "non-fiction"
  ],
  openGraph: {
    title: "ReadHaven",
    description: "Explore and buy your favorite books online at ReadHaven.",
    url: "https://readhaven.vercel.app",
    siteName: "ReadHaven",
    type: "website",
    images: [
      {
        url: "/images/og-image.jpg",  
        width: 1200,
        height: 630,
        alt: "ReadHaven - Discover Your Next Favorite Book",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ReadHaven",
    description: "Explore and buy your favorite books online at ReadHaven.",
    images: "/images/og-image.jpg",  
  },
  icons: {
    icon: "/favicon.png",  
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  alternates: {
    canonical: "https://readhaven.vercel.app",
  },  
};

export const viewport = {
  themeColor: "#7A4E2D",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
