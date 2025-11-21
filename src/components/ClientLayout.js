'use client';

import { usePathname } from "next/navigation";
import Header from "../Header";
import Footer from "../Footer";

export default function ClientLayout({ children }) {
  const pathname = usePathname();
  // Hide Header/Footer on Admin and Client Portal routes
  const hideNav = pathname?.startsWith('/admin') || pathname?.startsWith('/client-portal');

  return (
    <>
      {!hideNav && <Header />}
      <main className="main-content">{children}</main>
      {!hideNav && <Footer />}
    </>
  );
}
