import { Link } from 'react-router';
import { Phone, MapPin, Heart, ExternalLink } from 'lucide-react';
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
            <div className="flex items-center gap-2 text-rose text-sm font-medium">
              <Heart className="w-4 h-4 fill-rose" />
              Ladies Only Service
            </div>
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
              <li className="flex items-center gap-3 text-text-light/60 text-sm">
                <MapPin className="w-4 h-4 text-gold" />
                Calgary, AB — Mobile Service
              </li>
            </ul>
          </div>

          {/* QR Codes */}
          <div>
            <h4 className="font-heading text-gold text-lg mb-4">Connect</h4>
            <div className="flex gap-6">
              <div className="text-center">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://instagram.com/ravellebeautyhouse"
                    size={80}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">Instagram</p>
              </div>
              <div className="text-center">
                <div className="bg-white p-2 rounded-lg inline-block">
                  <QRCodeSVG
                    value="https://snapchat.com/add/ravellebeauty"
                    size={80}
                    fgColor="#0A0A0A"
                    bgColor="#FFFFFF"
                  />
                </div>
                <p className="text-text-light/40 text-xs mt-2">Snapchat</p>
              </div>
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
