import Hero from "@/components/Hero";
import SearchInput from "@/components/SearchInput";

// local imports
import HeadBar from "@/components/HeadBar";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <HeadBar />
      <div className="w-full min-h-screen h-auto p-5 sm:px-10 md:px-20">
        <Hero />
        <SearchInput />
      </div>
      <Footer />
    </>
  );
}
