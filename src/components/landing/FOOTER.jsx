import Link from "next/link";
import { FaFacebook, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

export default function Footer() {
  return (
    <div>
      <div className="text-white py-8 px-6 md:px-20 border-t border-white border-opacity-25">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start space-y-6 md:space-y-0">
          {/* College Logo & Description */}
          <section className="md:w-1/3 text-center md:text-left">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <span> X </span> {/* Replace*/}
              Birla Institute of Technology, Mesra
            </h2>
            <p className="text-sm mt-2 opacity-80">
              Bitotsav is a grand celebration of India&apos;s rich cultural
              heritage, bringing together students from all walks of life to
              revel in the vibrant essence of tradition and creativity.
            </p>
            {/* Social Media*/}
            <div className="flex justify-center md:justify-start space-x-4 mt-4">
              <Link
                href="https://twitter.com/Bitotsav"
                className="hover:opacity-80"
              >
                <FaXTwitter size={20} />
              </Link>
              <Link
                href="https://www.instagram.com/bitotsav.25/"
                className="hover:opacity-80"
              >
                <FaInstagram size={20} />
              </Link>
              <Link
                href="https://www.youtube.com/@bitotsav3377"
                className="hover:opacity-80"
              >
                <FaYoutube size={20} />
              </Link>
              <Link
                href="https://www.facebook.com/bitotsav/"
                className="hover:opacity-80"
              >
                <FaFacebook size={20} />
              </Link>
              <Link
                href="https://www.linkedin.com/company/bitotsavbitmesra/"
                className="hover:opacity-80"
              >
                <FaLinkedin size={20} />
              </Link>
            </div>
          </section>

          {/* Technical Queries */}
          <section className="text-center md:text-left">
            <h3 className="font-semibold text-md pb-1">Technical Queries</h3>
            <p className="text-sm">Shashwat: 9508846600</p>
            <p className="text-sm">Abhinav Choudhary: 9939110848</p>
          </section>

          {/* Virtual Helpdesk */}
          <section className="text-center md:text-left">
            <h3 className="font-semibold text-md">Need Assistance?</h3>
            <p className="text-sm opacity-80">Get in touch</p>
            <Link href="LINK" target="_blank" rel="noopener noreferrer">
              <button className="mt-3 px-4 py-2 bg-white text-black font-semibold rounded-lg transition-all duration-300 hover:bg-opacity-90 hover:scale-105 hover:shadow-lg">
                Virtual Helpdesk
              </button>
            </Link>
          </section>
        </div>
      </div>
      {/* Copyright Line */}
      <div className="border-t border-white border-opacity-25 my-4"></div>
      <div className="text-center text-sm mt-6 opacity-70">
        &copy; {new Date().getFullYear()} BIT Mesra. All rights reserved.
      </div>
    </div>
  );
}
