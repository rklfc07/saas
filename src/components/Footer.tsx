import { Link } from 'react-router-dom';
import { Linkedin, Twitter, Github } from 'lucide-react';

const Footer = () => {
  const productLinks = [
    { name: 'Lab Management', path: '/products/lab-management' },
    { name: 'Pharma Distribution', path: '/products/pharma-distribution' },
    { name: 'CRM Software', path: '/products/crm-software' },
  ];

  const companyLinks = [
    { name: 'About', path: '/about' },
    { name: 'Careers', path: '/careers' },
    { name: 'Blog', path: '/blog' },
  ];

  const supportLinks = [
    { name: 'Help Center', path: '/help' },
    { name: 'Contact', path: '/contact' },
    { name: 'FAQ', path: '/faq' },
  ];

  const socialLinks = [
    { name: 'LinkedIn', icon: Linkedin, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'GitHub', icon: Github, href: '#' },
  ];

  return (
    <footer className="bg-dark border-t border-white/10">
      {/* Top Border Gradient */}
      <div className="h-px bg-gradient-to-r from-transparent via-blue-primary to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-lg gradient-bg flex items-center justify-center transition-transform duration-200 ease-elastic group-hover:scale-105">
                <span className="text-white font-bold text-lg">G</span>
              </div>
              <span className="text-xl font-bold text-white">GyaaniWorld</span>
            </Link>
            <p className="mt-4 text-text-secondary text-sm max-w-xs leading-relaxed">
              Empowering businesses with intelligent SaaS solutions that transform how teams work, collaborate, and grow.
            </p>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Product</h3>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-white hover:translate-x-1 transition-all duration-200 ease-expo-out inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Company</h3>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-white hover:translate-x-1 transition-all duration-200 ease-expo-out inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              {supportLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.path}
                    className="text-text-secondary text-sm hover:text-white hover:translate-x-1 transition-all duration-200 ease-expo-out inline-block"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-text-secondary text-sm">
            © {new Date().getFullYear()} GyaaniWorld. All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-3">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center text-text-secondary hover:text-white hover:bg-white/10 hover:scale-110 transition-all duration-200 ease-elastic"
                aria-label={social.name}
              >
                <social.icon size={18} />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
