import { BitotsavHero } from "@/components/landing/BG";
import Footer from "@/components/landing/FOOTER";
 import { Nav } from "@/components/landing/NAV";
import { Connect } from "@/components/landing/TICKET";
  
  
export default function Home() {
  return (
    <>
    <div>
      <Nav/>
      <BitotsavHero/>
      <Connect/>

      <Footer/>
      

     </div>
    </>
  );
}
