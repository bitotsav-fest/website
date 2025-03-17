
import { isBitWellfareEmail } from "@/lib/email"
import arr from "@/lib/wellfare-emails"

export default function page() {

  return (
    <div className="mt-24">
         
      {
        Boolean(String(isBitWellfareEmail("btech10574.24@bitmesra.ac.in") ))
      }
    </div>
  )
}
