import { BitotsavHero } from "@/components/landing/BG";
import { Nav } from "@/components/landing/NAV";
import { Connect } from "@/components/landing/TICKET";
 
  
export default function Home() {
  return (
    <>
    <div>
      <Nav/>
      <BitotsavHero/>
      <Connect/>
    </div>
    </>
  );
}
