import { Link } from 'react-router-dom';
import { TreePalm, Phone, Mail, MapPin, Leaf, Wine, PartyPopper, Bed, Zap, Car, ArrowUp } from 'lucide-react';
import { BUSINESS_INFO, MARATHI_LABELS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function Footer() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const services = [
    { icon: Leaf, label: lang === 'mr' ? 'फॅमिली रेस्टॉरंट' : 'Family Restaurant' },
    { icon: Wine, label: lang === 'mr' ? 'सेपरेट एसी बार' : 'Separate AC Bar' },
    { icon: PartyPopper, label: lang === 'mr' ? 'कार्यक्रम व लॉन्स' : 'Events & Lawns' },
    { icon: Bed, label: lang === 'mr' ? 'सुसज्ज रूम्स' : 'Lodging Rooms' },
    { icon: Zap, label: lang === 'mr' ? '२४/७ ईव्ही चार्जिंग' : 'EV Fast Charging' },
    { icon: Car, label: lang === 'mr' ? 'भव्य पार्किंग' : 'Spacious Parking' },
  ];

  const quickLinks = [
    { label: lang === 'mr' ? MARATHI_LABELS.home : 'Home', href: '#home' },
    { label: lang === 'mr' ? MARATHI_LABELS.about : 'About', href: '#about' },
    { label: lang === 'mr' ? MARATHI_LABELS.menu : 'Restaurant Menu', href: '#menu' },
    { label: lang === 'mr' ? MARATHI_LABELS.gallery : 'Gallery', href: '#gallery' },
    { label: lang === 'mr' ? MARATHI_LABELS.events : 'Events', href: '#events' },
    { label: lang === 'mr' ? MARATHI_LABELS.contact : 'Contact', href: '#contact' },
    { label: lang === 'mr' ? MARATHI_LABELS.staffLogin : 'Staff Login', to: '/login' },
  ];

  return (
    <footer className={`pt-14 pb-8 border-t transition-colors duration-300 ${
      isDark
        ? 'bg-[#120b06] text-[#fcf6e8] border-[#e6c278]/25'
        : 'bg-[#faf5e9] text-[#23150c] border-amber-300'
    }`}>
      <div className="container-max px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 mb-10 sm:mb-12">
          
          {/* COLUMN 1: Brand Info */}
          <div>
            <div className="flex items-center gap-2.5 mb-3">
              <img src="/logo.png" alt="Aamrai Resort Logo" className="w-9 h-9 object-contain rounded-full bg-white p-0.5 shadow-md border border-amber-400/50" />
              <span className={`font-serif text-2xl font-bold ${
                isDark ? 'text-[#ffffff]' : 'text-[#23150c]'
              }`}>
                {lang === 'mr' ? BUSINESS_INFO.nameMarathi : BUSINESS_INFO.name}
              </span>
            </div>

            <p className={`text-sm italic mb-4 font-serif text-lg ${
              isDark ? 'text-[#e6c278]/90' : 'text-amber-900 font-medium'
            }`}>
              "{lang === 'mr' ? BUSINESS_INFO.taglineMarathi : BUSINESS_INFO.tagline}"
            </p>

            <div className="space-y-2">
              {services.map((s) => (
                <div key={s.label} className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-xs font-semibold mr-1.5 mb-1.5 border shadow-sm ${
                  isDark ? 'bg-[#23150c] border-[#e6c278]/30 text-amber-100' : 'bg-white border-amber-300 text-stone-900'
                }`}>
                  <s.icon size={13} className={isDark ? 'text-[#e6c278]' : 'text-amber-700'} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* COLUMN 2: Quick Links */}
          <div>
            <h4 className={`font-serif text-lg font-bold pb-2 mb-4 border-b ${
              isDark ? 'text-[#e6c278] border-[#e6c278]/20' : 'text-[#23150c] border-amber-300/60'
            }`}>
              {lang === 'mr' ? 'महत्वाचे दुवे' : 'Quick Links'}
            </h4>
            <ul className="space-y-2.5">
              {quickLinks.map((link) =>
                link.to ? (
                  <li key={link.label}>
                    <Link
                      to={link.to}
                      className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        isDark ? 'text-stone-300 hover:text-[#e6c278]' : 'text-stone-800 hover:text-amber-800'
                      }`}
                    >
                      <span className="text-amber-500 text-xs">✦</span> {link.label}
                    </Link>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className={`text-sm font-semibold transition-colors flex items-center gap-1.5 ${
                        isDark ? 'text-stone-300 hover:text-[#e6c278]' : 'text-stone-800 hover:text-amber-800'
                      }`}
                    >
                      <span className="text-amber-500 text-xs">✦</span> {link.label}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* COLUMN 3: Contact & Location */}
          <div>
            <h4 className={`font-serif text-lg font-bold pb-2 mb-4 border-b ${
              isDark ? 'text-[#e6c278] border-[#e6c278]/20' : 'text-[#23150c] border-amber-300/60'
            }`}>
              {lang === 'mr' ? 'संपर्क व लोकेशन' : 'Contact & Location'}
            </h4>
            <div className="space-y-3.5 text-sm font-medium">
              <div className="flex items-start gap-2.5">
                <MapPin size={16} className={`flex-shrink-0 mt-0.5 ${isDark ? 'text-[#e6c278]' : 'text-amber-800'}`} />
                <span className={isDark ? 'text-stone-300' : 'text-stone-800'}>
                  {lang === 'mr' ? BUSINESS_INFO.locationMarathi : BUSINESS_INFO.location}, {BUSINESS_INFO.city}
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone size={16} className={`flex-shrink-0 ${isDark ? 'text-[#e6c278]' : 'text-amber-800'}`} />
                <a href={`tel:${BUSINESS_INFO.phones[0]}`} className={`font-bold hover:underline ${
                  isDark ? 'text-amber-200' : 'text-amber-900'
                }`}>
                  {BUSINESS_INFO.phones[0]}
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail size={16} className={`flex-shrink-0 ${isDark ? 'text-[#e6c278]' : 'text-amber-800'}`} />
                <span className={isDark ? 'text-stone-300' : 'text-stone-800'}>{BUSINESS_INFO.email}</span>
              </div>
            </div>
          </div>

          {/* COLUMN 4: Operating Hours */}
          <div>
            <h4 className={`font-serif text-lg font-bold pb-2 mb-4 border-b ${
              isDark ? 'text-[#e6c278] border-[#e6c278]/20' : 'text-[#23150c] border-amber-300/60'
            }`}>
              {lang === 'mr' ? 'वेळ व सोयी' : 'Hours & Conveniences'}
            </h4>
            <div className={`p-4 rounded-2xl border shadow-sm ${
              isDark ? 'bg-[#23150c]/80 border-[#e6c278]/30' : 'bg-white border-amber-300/80'
            }`}>
              <p className={`text-xs sm:text-sm font-bold mb-1.5 ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>
                {lang === 'mr' ? 'उघडण्याची वेळ: ०६:०० AM - ११:३० PM' : 'Opening Hours: 06:00 AM - 11:30 PM'}
              </p>
              <p className={`text-xs font-extrabold mb-2 ${isDark ? 'text-emerald-400' : 'text-emerald-700'}`}>
                {lang === 'mr' ? '⚡ २४/७ फास्ट ईव्ही चार्जिंग सोय' : '⚡ 24/7 Fast EV Charging Station'}
              </p>
              <p className={`text-[11px] leading-relaxed ${isDark ? 'text-stone-300/80' : 'text-stone-600'}`}>
                {lang === 'mr'
                  ? 'पुणे-बंगळुरु राष्ट्रीय महामार्गावरील (NH4) शेंद्रे फाटा, सातारा येथील हक्काचे विश्रांती स्थान.'
                  : 'A peaceful highway nature retreat at Shendre Phata, NH4 Highway Satara.'}
              </p>
            </div>
          </div>

        </div>

        {/* BOTTOM COPYRIGHT BAR */}
        <div className={`pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-semibold ${
          isDark ? 'border-[#e6c278]/15 text-stone-400' : 'border-amber-300/60 text-stone-700'
        }`}>
          <p>© {new Date().getFullYear()} {BUSINESS_INFO.name}. All rights reserved.</p>
          <a
            href="#home"
            className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full border transition-all hover:scale-105 shadow-sm ${
              isDark
                ? 'bg-stone-900 border-[#e6c278]/40 text-[#e6c278] hover:bg-stone-800'
                : 'bg-white border-amber-300 text-stone-900 hover:bg-amber-100'
            }`}
          >
            <span>{lang === 'mr' ? 'वरती जा' : 'Back to Top'}</span>
            <ArrowUp size={13} />
          </a>
        </div>
      </div>
    </footer>
  );
}
