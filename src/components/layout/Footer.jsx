import { Link } from 'react-router';
import { Phone, Mail, MapPin, ExternalLink } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const quickLinks = [
  { name: 'Home', path: '/' },
  { name: 'About', path: '/about' },
  { name: 'Services', path: '/services' },
  { name: 'Gallery', path: '/gallery' },
  { name: 'Testimonials', path: '/testimonials' },
  { name: 'Book Now', path: '/book' },
];

export default function Footer() {
  return (
    <footer className="bg-primary border-t border-gold/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="space-y-4">
            <img
              src="/images/logo.png"
              alt="Ravélle Beauty House"
              className="h-16 w-auto"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'block';
              }}
            />
            <h3
              className="font-heading text-gold text-2xl tracking-wider hidden"
            >
              RAVÉLLE
            </h3>
            <p className="text-text-light/50 text-sm italic font-heading">
              Where Beauty Becomes Art
            </p>
            <p className="text-text-light/40 text-sm leading-relaxed">
              Mobile beauty services delivered to your door in Calgary, AB.
              Premium lashes, henna, waxing & more.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-gold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-text-light/50 hover:text-gold transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-gold text-lg mb-4">Contact</h4>
            <ul className="space-y-4">
              <li>
                <a
                  href="tel:8257363649"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors"
                >
                  <Phone className="w-4 h-4 text-gold" />
                  <div>
                    <p className="text-sm font-medium">Text to Book</p>
                    <p className="text-gold text-lg font-heading">825-736-3649</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="mailto:ravellebeautyhouse@gmail.com"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors"
                >
                  <Mail className="w-4 h-4 text-gold" />
                  <div>
                    <p className="text-sm font-medium">Email</p>
                    <p className="text-gold text-sm">ravellebeautyhouse@gmail.com</p>
                  </div>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/ravellebeautyhouse"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  @ravellebeautyhouse
                </a>
              </li>
              <li>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                  Message on Facebook
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@gypsysoul_gemini"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.34-6.34V8.73a8.19 8.19 0 004.76 1.52v-3.4a4.85 4.85 0 01-1-.16z"/></svg>
                  @gypsysoul_gemini
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/18257363649"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-text-light/60 hover:text-gold transition-colors text-sm"
                >
                  <svg className="w-4 h-4 text-gold fill-current" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                  WhatsApp
                </a>
              </li>
              <li className="flex items-center gap-3 text-text-light/60 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                Calgary, AB — Mobile Service
              </li>
            </ul>
          </div>

          {/* QR Codes */}
          <div>
            <h4 className="font-heading text-gold text-lg mb-4">Connect</h4>
            <div className="grid grid-cols-2 gap-4">
              <a href="https://instagram.com/ravellebeautyhouse" target="_blank" rel="noopener noreferrer" className="text-center hover:opacity-80 transition-opacity">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://instagram.com/ravellebeautyhouse"
                    size={72}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">Instagram</p>
              </a>
              <a href="https://snapchat.com/t/dmuOE4Id" target="_blank" rel="noopener noreferrer" className="text-center hover:opacity-80 transition-opacity">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://snapchat.com/t/dmuOE4Id"
                    size={72}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">Snapchat</p>
              </a>
              <a href="https://www.tiktok.com/@gypsysoul_gemini" target="_blank" rel="noopener noreferrer" className="text-center hover:opacity-80 transition-opacity">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://www.tiktok.com/@gypsysoul_gemini"
                    size={72}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">TikTok</p>
              </a>
              <a href="https://wa.me/18257363649" target="_blank" rel="noopener noreferrer" className="text-center hover:opacity-80 transition-opacity">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://wa.me/18257363649"
                    size={72}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">WhatsApp</p>
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gold/10 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-text-light/30 text-sm">
            &copy; 2026 Rav&eacute;lle Beauty House. All rights reserved.
          </p>
          <p className="text-text-light/20 text-xs">
            Designed for the Modern Muse
          </p>
        </div>
      </div>
    </footer>
  );
}
