import Header from "@/Components/Header/Header";
import Footer from "@/Components/Footer/Footer";

export default function SiteLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}
