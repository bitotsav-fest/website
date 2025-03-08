// Footer.jsx
import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <footer className="w-full bg-black text-white py-8 px-6 md:px-20 border-t border-white border-opacity-25 z-50">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
        {/* College Logo & Description */}
        <div className="md:w-1/3 text-center md:text-left">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <img src="/bitotsav-logo.svg" alt="bitotsav logo" className="w-10 h-auto" />
            Birla Institute of Technology, Mesra
          </h2>
          <p className="text-sm mt-2 opacity-80">
            Bitotsav is a grand celebration of India's rich cultural
            heritage, bringing together students from all walks of life to
            revel in the vibrant essence of tradition and creativity.
          </p>
          {/* Social Media */}
          <div className="flex justify-center md:justify-start space-x-4 mt-4">
            <Link href="https://twitter.com/Bitotsav" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaXTwitter size={20} />
            </Link>
            <Link href="https://www.instagram.com/bitotsav.25/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaInstagram size={20} />
            </Link>
            <Link href="https://www.youtube.com/@bitotsav3377" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaYoutube size={20} />
            </Link>
            <Link href="https://www.facebook.com/bitotsav/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaFacebook size={20} />
            </Link>
            <Link href="https://www.linkedin.com/company/bitotsavbitmesra/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80">
              <FaLinkedin size={20} />
            </Link>
          </div>
        </div>

        {/* Technical Queries */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-md pb-1">Technical Queries</h3>
          <p className="text-sm">
            Shaswat Raj: <a href="tel:+919508846600">9508846600</a>
          </p>
          <p className="text-sm">
            Abhinav Kumar Choudhary: <a href="tel:+919939110848">9939110848</a>
          </p>
        </div>

        {/* Virtual Helpdesk */}
        <div className="text-center md:text-left">
          <h3 className="font-semibold text-md">Need Assistance?</h3>
          <p className="text-sm opacity-80">Get in touch</p>
          <Link href="LINK" target="_blank" rel="noopener noreferrer">
            <button className="mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
              Virtual Helpdesk
            </button>
          </Link>
        </div>
      </div>

      {/* Copyright Line */}
      <div className="border-t border-white border-opacity-25 my-4"></div>
      <div className="text-center text-sm mt-6 opacity-70">
        © {new Date().getFullYear()} BIT Mesra. All rights reserved.
      </div>
    </footer>
  );
}
