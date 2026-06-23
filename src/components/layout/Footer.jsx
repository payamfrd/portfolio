const Footer = () => {
  return (
    <footer className="border-t border-slate-800 mt-24">
      <div className="max-w-7xl mx-auto px-6 py-12 grid md:grid-cols-4 gap-8">
        <div>
          <h3 className="font-bold text-lg">Mohammadmehdi Fard</h3>
          <p className="mt-2 text-slate-400">Front-End Developer</p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Navigation</h4>
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
          <h4 className="font-semibold mb-3">Popular Articls</h4>
          <ul className="space-y-2">
            <li>Next.js Guide</li>
            <li>React Best Practies</li>
            <li>Front-End SEO</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Contact</h4>
          <ul className="space-y-2">
            <li>GitHub</li>
            <li>Linkedin</li>
            <li>WhatsApp</li>
            <li>Email</li>
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
