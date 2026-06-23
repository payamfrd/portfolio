import Link from "next/link";
import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";

const Footer = () => {
  return (
    <footer className="border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8 max-md:grid-cols-2">
        <div className="flex flex-col">
          <h3 className="font-bold text-lg">Mohammadmehdi Fard</h3>
          <p className="mt-2 text-slate-400">Front-End Developer</p>
          <a
            href="/Fard.Mohammadmehdi.pdf"
            download
            className="px-4 py-2 rounded-xl bg-blue-600 w-fit mt-3"
          >
            Download Resume
          </a>
        </div>
        <div>
          <h4 className="font-bold mb-3">Navigation</h4>
          <ul className="space-y-2">
            <li>
              <a href="#about">About</a>
            </li>
            <li>
              <a href="#skills">Skills</a>
            </li>
            <li>
              <a href="#projects">Projects</a>
            </li>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Popular Articls</h4>
          <ul className="flex flex-col space-y-2">
            <Link href="/blog/nextjs-seo-guide">Next.js seo Guide</Link>
            <Link href="/blog/test">Test</Link>
          </ul>
        </div>
        <div>
          <h4 className="font-bold mb-3">Connect</h4>
          <ul className="space-y-2">
            <li>
              <a
                href="https://github.com/payamfrd"
                target="_blank"
                className="flex gap-2"
              >
                <FaGithub size={20} />
                GitHub
              </a>
            </li>
            <li>
              <a
                href="https://www.linkedin.com/in/mohammadmehdi-fard-a430a1222"
                target="_blank"
                className="flex gap-2"
              >
                <FaLinkedin size={20} />
                Linkedin
              </a>
            </li>
            <li>
              <a
                href="https://wa.me/+989301801747"
                target="_blank"
                className="flex gap-2"
              >
                <FaWhatsapp size={20} />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href="mailto:Fard.Mehammadmehdi@Gamail.com"
                target="_blank"
                className="flex gap-2"
              >
                <HiOutlineMailOpen size={20} />
                Email
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-slate-800 py-6 text-center text-sm text-slate-500">
        &copy; 2026 Mohammadmehdi Fard
      </div>
    </footer>
  );
};

export default Footer;
