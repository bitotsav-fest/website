import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-br from-[#0A0118] via-[#2D1E0F] to-[#1A0B2E] text-[#F6F1E2] py-12 px-6 md:px-20 border-t border-[#EFCA4E]/20 z-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-8 md:space-y-0 md:space-x-8">
          {/* College Logo & Description */}
          <div className="md:w-1/3 text-center md:text-left space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-3 text-[#EFCA4E]">
              <img src="/bitotsav-logo.svg" alt="bitotsav logo" className="w-12 h-auto" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">
                Birla Institute of Technology, Mesra
              </span>
            </h2>
            <p className="text-sm leading-relaxed text-[#F6F1E2]/80">
              Bitotsav is a grand celebration of India's rich cultural
              heritage, bringing together students from all walks of life to
              revel in the vibrant essence of tradition and creativity.
            </p>
            {/* Social Media */}
            <div className="flex justify-center md:justify-start space-x-4 mt-6">
              {[
                { icon: FaXTwitter, href: "https://twitter.com/Bitotsav", label: "Twitter" },
                { icon: FaInstagram, href: "https://www.instagram.com/bitotsav.25/", label: "Instagram" },
                { icon: FaYoutube, href: "https://www.youtube.com/@bitotsav3377", label: "YouTube" },
                { icon: FaFacebook, href: "https://www.facebook.com/bitotsav/", label: "Facebook" },
                { icon: FaLinkedin, href: "https://www.linkedin.com/company/bitotsavbitmesra/", label: "LinkedIn" }
              ].map((social, index) => (
                <Link 
                  key={index}
                  href={social.href} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="p-2 rounded-full bg-[#EFCA4E]/10 hover:bg-[#EFCA4E]/20 transition-all duration-300 hover:scale-110"
                >
                  <social.icon size={20} className="text-[#EFCA4E]" />
                </Link>
              ))}
            </div>
          </div>

          {/* Technical Queries */}
          <div className="text-center md:text-left bg-[#EFCA4E]/5 p-6 rounded-2xl backdrop-blur-sm border border-[#EFCA4E]/10">
            <h3 className="text-lg font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">
              Technical Queries
            </h3>
            <div className="space-y-3">
              <p className="text-sm">
                <span className="text-[#EFCA4E]/80">Shaswat Raj:</span>{" "}
                <a href="tel:+919508846600" className="hover:text-[#EFCA4E] transition-colors">9508846600</a>
              </p>
              <p className="text-sm">
                <span className="text-[#EFCA4E]/80">Abhinav Kumar Choudhary:</span>{" "}
                <a href="tel:+919939110848" className="hover:text-[#EFCA4E] transition-colors">9939110848</a>
              </p>
            </div>
          </div>

          {/* Virtual Helpdesk */}
          <div className="text-center md:text-left bg-[#EFCA4E]/5 p-6 rounded-2xl backdrop-blur-sm border border-[#EFCA4E]/10">
            <h3 className="text-lg font-bold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-[#EFCA4E] to-[#F6F1E2]">
              Need Assistance?
            </h3>
            <p className="text-sm text-[#F6F1E2]/80 mb-4">Get in touch with our team</p>
            <Link href="/virtual-helpdesk"  rel="noopener noreferrer">
              <button className="w-full px-6 py-3 bg-gradient-to-r from-[#EFCA4E] to-[#2D1E0F] text-[#F6F1E2] font-semibold rounded-xl transition-all duration-300 hover:shadow-lg hover:shadow-[#EFCA4E]/20 hover:scale-105 border border-[#EFCA4E]/20">
                Virtual Helpdesk
              </button>
            </Link>
          </div>
        </div>

        {/* Copyright Line */}
        <div className="mt-12 pt-6 border-t border-[#EFCA4E]/10">
          <div className="text-center text-sm text-[#F6F1E2]/60">
            © {new Date().getFullYear()} BIT Mesra. All rights reserved.
          </div>
        </div>
      </div>
    </footer>
  );
}
