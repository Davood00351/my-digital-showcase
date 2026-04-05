import { Mail, Phone, MapPin } from "lucide-react";

const Footer = () => (
  <footer className="bg-foreground text-background py-12 no-print">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-heading font-bold mb-4">Davood Sharifi</h3>
          <p className="text-sm opacity-70">Software Developer & Creative Designer based in Braga, Portugal.</p>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 opacity-80">Contact</h4>
          <div className="space-y-2 text-sm opacity-70">
            <div className="flex items-center gap-2"><Phone size={14} /> +351 927 717 490</div>
            <div className="flex items-center gap-2"><Mail size={14} /> davood00351@gmail.com</div>
            <div className="flex items-center gap-2"><MapPin size={14} /> Braga, Portugal</div>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-semibold mb-3 opacity-80">Quick Links</h4>
          <div className="space-y-2 text-sm opacity-70">
            <a href="/" className="block hover:opacity-100 transition-opacity">My CV</a>
            <a href="/shop" className="block hover:opacity-100 transition-opacity">Shop</a>
            <a href="/chat" className="block hover:opacity-100 transition-opacity">Chat</a>
          </div>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-background/10 text-center text-sm opacity-50">
        © {new Date().getFullYear()} Davood Sharifi. All rights reserved.
      </div>
    </div>
  </footer>
);

export default Footer;
