import { Link } from "react-router-dom";
import logoImg from "../assets/logo.png"; // Reference logo image

function Footer() {
  return (
    <footer className="bg-[#182612] text-slate-300 pt-12 pb-6 border-t border-[#25381C]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand Col */}
          <div className="space-y-3 md:col-span-2">
            <div className="flex items-center gap-2">
              <img src={logoImg} alt="MarketLink" className="h-8 w-auto brightness-200" />
              <span className="text-xl font-bold text-white">MarketLink</span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              Where farmers meet customers — and good food finds its way home. Connecting local produce directly with nearby households.
            </p>
          </div>

          {/* Explore Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Explore</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/markets" className="hover:text-amber-400">Markets</Link></li>
              <li><Link to="/farmers" className="hover:text-amber-400">Farmers</Link></li>
              <li><Link to="/products" className="hover:text-amber-400">Products</Link></li>
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company</h4>
            <ul className="space-y-2 text-xs text-slate-400">
              <li><Link to="/about" className="hover:text-amber-400">About</Link></li>
              <li><Link to="/contact" className="hover:text-amber-400">Contact</Link></li>
              <li><Link to="/register" className="hover:text-amber-400">Become a seller</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400">
          <p>© {new Date().getFullYear()} MarketLink. All rights reserved.</p>
          <p className="mt-2 sm:mt-0">Connecting Farmers & Communities</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;