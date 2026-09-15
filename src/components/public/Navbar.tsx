import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, Phone, TreePalm, MessageCircle, Languages, UserCheck, Sun, Moon } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BASE, MARATHI_LABELS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const links = [
    { label: lang === 'mr' ? MARATHI_LABELS.home : 'Home', href: '#home' },
    { label: lang === 'mr' ? MARATHI_LABELS.about : 'About', href: '#about' },
    { label: lang === 'mr' ? MARATHI_LABELS.experiences : 'Offerings', href: '#experiences' },
    { label: lang === 'mr' ? MARATHI_LABELS.menu : 'Menu', href: '#menu' },
    { label: lang === 'mr' ? MARATHI_LABELS.gallery : 'Gallery', href: '#gallery' },
    { label: lang === 'mr' ? MARATHI_LABELS.events : 'Events', href: '#events' },
    { label: lang === 'mr' ? MARATHI_LABELS.contact : 'Contact', href: '#contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? isDark
              ? 'bg-stone-950/95 backdrop-blur-md py-3 shadow-2xl border-b border-amber-400/20'
              : 'bg-white/95 backdrop-blur-md py-3 shadow-md border-b border-amber-200/60'
            : isDark
              ? 'bg-gradient-to-b from-stone-950/90 via-stone-950/50 to-transparent py-4 sm:py-5'
              : 'bg-gradient-to-b from-amber-100/80 via-amber-50/40 to-transparent py-4 sm:py-5'
        }`}
      >
        <div className="container-max flex items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#home" className="flex items-center gap-2.5 group">
            <img
              src="/logo.png"
              alt="Aamrai Resort Logo"
              className="w-10 h-10 object-contain rounded-full bg-white p-0.5 shadow-md border border-amber-400/50 group-hover:scale-105 transition-transform"
            />
            <div className="flex flex-col leading-none">
              <span className={`font-serif text-xl sm:text-2xl tracking-wide transition-colors font-bold ${
                isDark ? 'text-amber-50 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-800'
              }`}>
                {lang === 'mr' ? BUSINESS_INFO.nameMarathi : BUSINESS_INFO.name}
              </span>
              <span className={`text-xs tracking-widest uppercase font-sans mt-0.5 ${
                isDark ? 'text-amber-200/70' : 'text-amber-800/80'
              }`}>
                {lang === 'mr' ? 'शेंद्रे फाटा • सातारा NH4' : 'Shendre Phata • NH4 Satara'}
              </span>
            </div>
          </a>

          <div className="hidden lg:flex items-center gap-5">
            {links.map((link) => (
              <a key={link.href} href={link.href} className={`text-sm font-medium tracking-wide transition-colors ${
                isDark ? 'text-stone-200 hover:text-amber-300' : 'text-stone-800 hover:text-amber-700 font-semibold'
              }`}>
                {link.label}
              </a>
            ))}

            {/* Language Toggle Button */}
            <button
              onClick={toggleLang}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-amber-400 text-stone-950 hover:bg-amber-300 transition-all font-bold text-xs shadow-md hover:scale-105 active:scale-95 border border-amber-300"
              title="Switch Language / भाषा बदला"
            >
              <Languages size={15} />
              <span>{lang === 'en' ? 'मराठी' : 'ENGLISH'}</span>
            </button>

            {/* Theme Toggle Button (Light/Dark) */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-full transition-all border shadow-md flex items-center justify-center hover:scale-105 ${
                isDark
                  ? 'bg-stone-900 text-amber-300 border-amber-400/30 hover:bg-stone-800'
                  : 'bg-amber-100 text-amber-900 border-amber-300 hover:bg-amber-200'
              }`}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <Sun size={17} className="text-amber-400" /> : <Moon size={17} className="text-amber-800" />}
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-semibold transition-all ${
                isDark
                  ? 'border-amber-400/30 text-amber-100 hover:border-amber-400 hover:text-amber-400'
                  : 'border-amber-700/40 text-stone-900 hover:border-amber-700 hover:text-amber-800'
              }`}
            >
              <Phone size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} /> {BUSINESS_INFO.phones[0]}
            </a>
            <Link
              to="/login"
              className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold transition-all border shadow-sm ${
                isDark
                  ? 'bg-stone-900 text-amber-300 hover:bg-stone-800 border-amber-400/30'
                  : 'bg-stone-900 text-amber-300 hover:bg-stone-800 border-stone-800'
              }`}
            >
              <UserCheck size={14} /> Staff
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            {/* Mobile Language Switcher */}
            <button
              onClick={toggleLang}
              className="px-2.5 py-1.5 rounded-full bg-amber-400 text-stone-950 text-xs font-bold flex items-center gap-1 border border-amber-300 shadow-md"
            >
              <Languages size={13} />
              <span>{lang === 'en' ? 'मराठी' : 'ENG'}</span>
            </button>

            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-1.5 rounded-full border shadow-md flex items-center justify-center ${
                isDark ? 'bg-stone-900 text-amber-400 border-amber-400/30' : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
              title="Theme Toggle"
            >
              {isDark ? <Sun size={15} /> : <Moon size={15} />}
            </button>

            <a
              href={`tel:${BUSINESS_INFO.phones[0]}`}
              className={`p-2 rounded-full border ${
                isDark ? 'bg-stone-900 text-amber-400 border-amber-400/30' : 'bg-amber-100 text-amber-800 border-amber-300'
              }`}
              aria-label="Call Now"
            >
              <Phone size={16} />
            </a>
            <button
              className={`p-2 rounded-lg border ${
                isDark ? 'text-amber-50 bg-stone-900 border-amber-400/20' : 'text-stone-900 bg-white border-amber-300'
              }`}
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Navigation */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-stone-950/80 backdrop-blur-md animate-fade-in" onClick={() => setMobileOpen(false)} />
          <div className="absolute top-0 right-0 bottom-0 w-80 max-w-[85vw] bg-stone-950 border-l border-amber-400/20 shadow-2xl pt-20 pb-8 px-6 flex flex-col justify-between animate-slide-in-right">
            <div>
              <div className="flex items-center justify-between pb-4 mb-6 border-b border-amber-400/10">
                <div className="flex items-center gap-2.5">
                  <img src="/logo.png" alt="Aamrai Resort Logo" className="w-9 h-9 object-contain rounded-full bg-white p-0.5 shadow-md border border-amber-400/50" />
                  <div>
                    <h3 className="font-serif text-lg text-amber-50 font-bold">
                      {lang === 'mr' ? BUSINESS_INFO.nameMarathi : BUSINESS_INFO.name}
                    </h3>
                    <p className="text-[11px] text-amber-200/60">NH4 Shendre Satara</p>
                  </div>
                </div>
                
                <button
                  onClick={toggleLang}
                  className="px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold"
                >
                  {lang === 'en' ? 'मराठी' : 'ENG'}
                </button>
              </div>

              <div className="flex flex-col gap-4">
                {links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className="text-stone-200 hover:text-amber-400 transition-colors text-base font-serif tracking-wide flex items-center justify-between py-1"
                  >
                    <span>{link.label}</span>
                    <span className="text-amber-400/40 text-xs">→</span>
                  </a>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-6 border-t border-amber-400/10">
              <a
                href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent('Hello Aamrai Resort, I would like to enquire.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-emerald-600 text-white font-bold text-sm shadow-md"
              >
                <MessageCircle size={17} /> {lang === 'mr' ? MARATHI_LABELS.whatsappBook : 'WhatsApp Booking'}
              </a>
              <a
                href={`tel:${BUSINESS_INFO.phones[0]}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-stone-900 border border-amber-400/30 text-amber-100 font-semibold text-sm"
              >
                <Phone size={17} className="text-amber-400" /> Call {BUSINESS_INFO.phones[0]}
              </a>
              <Link
                to="/login"
                onClick={() => setMobileOpen(false)}
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-amber-400 text-stone-950 font-bold text-xs mt-1"
              >
                Staff POS & Admin Portal
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
