import React, { useState } from "react";
import { ChevronDown, Twitter, Instagram, Linkedin } from "lucide-react";

interface FooterSectionProps {
  title: string;
  children: React.ReactNode;
}

const FooterSection: React.FC<FooterSectionProps> = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-4">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex justify-between items-center md:cursor-default md:select-none"
      >
        <h3 className="font-arial-sans-serif text-xl text-[#34495e]">{title}</h3>
        <ChevronDown
          className={`transition-transform duration-300 md:hidden ${isOpen ? "rotate-180" : "rotate-0"}`}
          size={20}
          color="#34495e"
        />
      </button>
      <div className={`${isOpen ? "block" : "hidden"} md:block mt-2`}>
        {children}
      </div>
    </div>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-8">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FooterSection title="Creative Tool">
            <p className="font-helvetica-sans-serif text-base text-[#34495e]">
              Empowering your web development journey.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" aria-label="Twitter" className="transition-colors hover:text-[#2ecc71]">
                <Twitter size={20} color="#3498db" />
              </a>
              <a href="#" aria-label="Instagram" className="transition-colors hover:text-[#2ecc71]">
                <Instagram size={20} color="#3498db" />
              </a>
              <a href="#" aria-label="LinkedIn" className="transition-colors hover:text-[#2ecc71]">
                <Linkedin size={20} color="#3498db" />
              </a>
            </div>
          </FooterSection>

          <FooterSection title="Quick Links">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Templates
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Features
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Pricing
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  About
                </a>
              </li>
            </ul>
          </FooterSection>

          <FooterSection title="Support">
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Help Center
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Privacy
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-base font-helvetica-sans-serif text-[#34495e] transition-colors hover:text-[#3498db]"
                >
                  Terms
                </a>
              </li>
            </ul>
          </FooterSection>
        </div>

        <div className="mt-8 border-t border-gray-200 pt-4">
          <p className="text-center text-sm font-helvetica-sans-serif text-[#34495e]">
            © {new Date().getFullYear()} Creative Tool. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;