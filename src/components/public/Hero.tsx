import { Utensils, MessageCircle, MapPin, Leaf, Wine, PartyPopper, Zap, TreePalm, Star, Phone, BedDouble, ChevronDown, Car } from 'lucide-react';
import { Reveal } from '@/components/Reveal';
import { BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function Hero() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const pedestalFeatures = [
    {
      icon: Utensils,
      titleEn: 'Multi-Cuisine',
      titleMr: 'उत्कृष्ट भोजन',
      subEn: 'Family Dining',
      subMr: 'स्वतंत्र फॅमिली डाइनिंग',
    },
    {
      icon: Wine,
      titleEn: 'Separate',
      titleMr: 'सेपरेट',
      subEn: 'AC Bar',
      subMr: 'वातानुकूलित बार',
    },
    {
      icon: PartyPopper,
      titleEn: 'Lush',
      titleMr: 'भव्य',
      subEn: 'Event Lawns',
      subMr: 'इव्हेंट लॉन्स',
    },
    {
      icon: BedDouble,
      titleEn: 'Cozy',
      titleMr: 'सुसज्ज',
      subEn: 'Rooms',
      subMr: 'कॉटेज व रूम्स',
    },
    {
      icon: Zap,
      titleEn: 'EV Fast',
      titleMr: '२४/७ ईव्ही',
      subEn: 'Charging',
      subMr: 'फास्ट charge',
    },
  ];

  return (
    <section
      id="home"
      className={`relative min-h-[90vh] sm:min-h-screen flex flex-col justify-between overflow-hidden pt-20 sm:pt-24 pb-6 sm:pb-8 transition-colors duration-300 ${
        isDark ? 'bg-[#160d07] text-[#fcf6e8]' : 'bg-[#faf6f0] text-[#23150c]'
      }`}
    >
      {/* Backdrop & Centered Warm Radial Glow */}
      <div className={`absolute inset-0 ${isDark ? 'bg-[#160d07]' : 'bg-[#faf6f0]'}`} />
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: isDark
            ? 'radial-gradient(circle at 50% 38%, rgba(230,194,120,0.22) 0%, rgba(35,21,12,0.95) 55%, rgba(13,7,3,1) 100%)'
            : 'radial-gradient(circle at 50% 38%, rgba(230,194,120,0.35) 0%, rgba(250,246,240,0.95) 60%, rgba(244,237,226,1) 100%)',
        }}
      />

      {/* Floating Ambient Particles */}
      <div className="absolute top-24 left-[8%] text-emerald-500/40 animate-float pointer-events-none text-lg sm:text-xl">🍃</div>
      <div className="absolute top-36 right-[10%] text-emerald-500/40 animate-float pointer-events-none text-base sm:text-lg" style={{ animationDelay: '2s' }}>🍃</div>
      <div className="absolute bottom-32 left-[12%] text-emerald-500/30 animate-float pointer-events-none text-lg sm:text-xl" style={{ animationDelay: '4s' }}>🍃</div>

      {/* Main Hero Body Container */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 flex-1 flex flex-col justify-center my-auto">
        <div className="grid lg:grid-cols-12 gap-4 sm:gap-6 items-center py-2 sm:py-3">

          {/* LEFT COLUMN: NH4 Signboard & Curved Highway SVG */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between space-y-5">
            <Reveal>
              <div className="space-y-3">
                {/* Cursive Script */}
                <div className={`font-serif italic text-xl leading-snug space-y-1 ${isDark ? 'text-[#e6c278]' : 'text-amber-800'}`}>
                  <p className="tracking-wide">Relax</p>
                  <p className={`pl-4 ${isDark ? 'text-amber-200/80' : 'text-amber-900/80'}`}>✦ Dine</p>
                  <p className="pl-8 tracking-wide">Celebrate</p>
                  <p className={`pl-12 ${isDark ? 'text-amber-200/80' : 'text-amber-900/80'}`}>Stay 🍃</p>
                </div>

                {/* NH4 Signboard Box */}
                <div className={`rounded-2xl p-3 shadow-xl backdrop-blur-md w-44 mt-3 border ${
                  isDark ? 'bg-[#23150c]/90 border-[#e6c278]/40 text-[#fcf6e8]' : 'bg-white/95 border-amber-300/80 text-[#23150c]'
                }`}>
                  <div className={`flex items-center justify-between mb-1.5 pb-1.5 border-b ${isDark ? 'border-[#e6c278]/20' : 'border-amber-200'}`}>
                    <span className="px-2 py-0.5 rounded bg-[#e6c278] text-[#160d07] font-extrabold text-[11px] tracking-wider">
                      NH4
                    </span>
                    <span className={`text-[10px] uppercase tracking-widest font-bold ${isDark ? 'text-amber-200/70' : 'text-amber-900/70'}`}>SATARA</span>
                  </div>
                  <div className="space-y-1 text-xs font-bold">
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#e6c278]">📍</span> {lang === 'mr' ? 'पुणे (Pune)' : 'Pune'}
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-[#e6c278]">↓</span> {lang === 'mr' ? 'बंगळुरु (Bangalore)' : 'Bangalore'}
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Glowing Winding Highway Vector SVG */}
            <Reveal delay={2}>
              <div className="relative w-full h-32 pt-1">
                <svg className="w-full h-full overflow-visible" viewBox="0 0 200 90" fill="none">
                  <path
                    d="M 10 80 C 70 70, 90 35, 190 10"
                    stroke={isDark ? '#e6c278' : '#c49035'}
                    strokeWidth="10"
                    strokeLinecap="round"
                    opacity="0.25"
                    className="blur-sm"
                  />
                  <path
                    d="M 10 80 C 70 70, 90 35, 190 10"
                    stroke="url(#highwayGlow)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <path
                    d="M 10 80 C 70 70, 90 35, 190 10"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    strokeLinecap="round"
                    opacity="0.9"
                  />
                  <defs>
                    <linearGradient id="highwayGlow" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#b4832f" />
                      <stop offset="50%" stopColor="#e6c278" />
                      <stop offset="100%" stopColor="#ffd88a" />
                    </linearGradient>
                  </defs>
                </svg>
                <p className={`text-[10px] font-serif italic mt-1 ${isDark ? 'text-amber-200/70' : 'text-amber-900/80'}`}>
                  "{lang === 'mr' ? 'प्रवासातील हक्काचे विश्रांती स्थान' : 'A Perfect Stop Along Your Journey'}"
                </p>
              </div>
            </Reveal>
          </div>

          {/* CENTER COLUMN: Logo, Headline Title & Primary CTAs */}
          <div className="lg:col-span-6 text-center space-y-3 sm:space-y-4">
            
            {/* Top Glowing Brand Logo */}
            <Reveal>
              <div className="flex justify-center mb-2">
                <div className={`p-2 sm:p-3 rounded-full border shadow-2xl transition-all animate-hero-logo ${
                  isDark
                    ? 'bg-white/95 border-[#e6c278]/60'
                    : 'bg-white border-amber-300'
                }`}>
                  <img
                    src="/logo.png"
                    alt="Aamrai Resort Logo"
                    className="w-16 h-16 sm:w-24 sm:h-24 object-contain"
                  />
                </div>
              </div>
            </Reveal>

            {/* Main Headline Title */}
            <Reveal delay={1}>
              <h1 className={`font-serif text-4xl sm:text-6xl lg:text-7xl xl:text-8xl font-extrabold tracking-tight leading-[1.05] drop-shadow-md animate-hero-title ${
                isDark ? 'text-[#ffffff]' : 'text-[#23150c]'
              }`}>
                {lang === 'mr' ? BUSINESS_INFO.nameMarathi : BUSINESS_INFO.name}
              </h1>
            </Reveal>

            {/* Flanked Tagline */}
            <Reveal delay={2}>
              <div className="flex items-center justify-center gap-2 sm:gap-3 max-w-xl mx-auto animate-hero-sub">
                <div className={`h-[1px] flex-1 bg-gradient-to-r ${isDark ? 'from-transparent via-[#e6c278]/60 to-transparent' : 'from-transparent via-amber-600/60 to-transparent'}`} />
                <p className={`font-serif text-xs sm:text-lg lg:text-xl font-medium italic px-2 ${
                  isDark ? 'text-amber-200' : 'text-amber-900'
                }`}>
                  {lang === 'mr' ? BUSINESS_INFO.taglineMarathi : BUSINESS_INFO.tagline}
                </p>
                <div className={`h-[1px] flex-1 bg-gradient-to-r ${isDark ? 'from-transparent via-[#e6c278]/60 to-transparent' : 'from-transparent via-amber-600/60 to-transparent'}`} />
              </div>
            </Reveal>

            {/* Paragraph Description */}
            <Reveal delay={3}>
              <p className={`text-xs sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed font-normal animate-hero-sub ${
                isDark ? 'text-stone-300/90' : 'text-stone-700'
              }`}>
                {lang === 'mr'
                  ? 'पुणे-बंगळुरु राष्ट्रीय महामार्गावरील (NH4) शेंद्रे फाटा, सातारा येथील निसर्गरम्य हक्काचे ठिकाण. फॅमिली रेस्टॉरंट, सेपरेट एसी बार, भव्य लॉन्स, कॉटेज रूम्स व २४/७ ईव्ही charge सोय.'
                  : 'A tranquil nature retreat on the Pune-Bangalore Highway (NH4) at Shendre, Satara. Multi-cuisine family dining, separate AC bar, lush event lawns, cozy rooms & EV fast charging.'}
              </p>
            </Reveal>

            {/* Primary Action Buttons */}
            <Reveal delay={4}>
              <div className="flex flex-wrap items-center justify-center gap-3 pt-2 animate-hero-cta">
                <a
                  href="#menu"
                  className="btn-gold flex items-center gap-2"
                >
                  <Utensils size={18} /> {lang === 'mr' ? 'मेनू कार्ड पहा →' : 'Explore Now →'}
                </a>
                <a
                  href="#lodging"
                  className={`btn-secondary flex items-center gap-2 ${
                    isDark ? '' : 'border-amber-700/50 text-stone-900 hover:bg-amber-100/60'
                  }`}
                >
                  <BedDouble size={18} className={isDark ? 'text-[#e6c278]' : 'text-amber-800'} /> {lang === 'mr' ? 'रूम्स पहा' : 'View Rooms'}
                </a>
                </div>
            </Reveal>

            {/* Mobile Location Badge */}
            <div className="lg:hidden flex flex-wrap items-center justify-center gap-2 pt-2">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-xs font-bold shadow-md ${
                isDark ? 'bg-[#23150c] border-[#e6c278]/30 text-amber-200' : 'bg-white border-amber-300 text-stone-900'
              }`}>
                <MapPin size={13} className={isDark ? 'text-[#e6c278]' : 'text-amber-700'} /> NH4 Shendre Phata, Satara
              </span>
              <a
                href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent('Hello Aamrai Resort, I would like to enquire.')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-emerald-600 text-white text-xs font-bold shadow-md"
              >
                <MessageCircle size={13} /> WhatsApp
              </a>
            </div>
          </div>

          {/* RIGHT COLUMN: Dotted Path & Shendre Satara Location Pin */}
          <div className="lg:col-span-3 hidden lg:flex flex-col justify-between space-y-5 text-right">
            <Reveal>
              <div className="space-y-3">
                <p className={`font-serif italic text-xl leading-snug ${isDark ? 'text-[#e6c278]' : 'text-amber-800'}`}>
                  "Good Food, <br />Better Moments ♡"
                </p>

                {/* Dotted Route SVG & Location Pin */}
                <div className="relative pt-3 flex flex-col items-end">
                  <div className="flex items-center gap-1.5 mb-1">
                    <span className={`text-[11px] font-mono ${isDark ? 'text-amber-300/80' : 'text-amber-900/80'}`}>NH4 Route</span>
                    <Car size={15} className={`animate-pulse ${isDark ? 'text-[#e6c278]' : 'text-amber-700'}`} />
                  </div>

                  <svg className="w-44 h-9 overflow-visible" viewBox="0 0 170 35" fill="none">
                    <path
                      d="M 10 18 C 70 5, 110 30, 160 18"
                      stroke={isDark ? '#e6c278' : '#c49035'}
                      strokeWidth="2"
                      strokeDasharray="4 6"
                      opacity="0.85"
                    />
                  </svg>

                  <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-2xl border shadow-xl backdrop-blur-md text-xs font-bold mt-1 ${
                    isDark ? 'bg-[#23150c]/90 border-[#e6c278]/40 text-[#fcf6e8]' : 'bg-white/95 border-amber-300/80 text-stone-900'
                  }`}>
                    <MapPin size={14} className={isDark ? 'text-[#e6c278]' : 'text-amber-700'} />
                    <span>Shendre, Satara</span>
                  </div>
                </div>
              </div>
            </Reveal>

            <Reveal delay={2}>
              <div className="space-y-3">
                <p className={`font-serif italic text-xs sm:text-sm ${isDark ? 'text-amber-200/70' : 'text-amber-900/80'}`}>
                  "More than a stay,<br />It's an experience 🍃"
                </p>

                {/* Bottom Right Nature Badge */}
                <div className={`inline-flex items-center gap-2.5 p-2.5 pr-4 rounded-2xl border text-left shadow-xl backdrop-blur-md ${
                  isDark ? 'bg-[#23150c]/90 border-[#e6c278]/30' : 'bg-white/95 border-amber-300/70'
                }`}>
                  <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-400/30 flex items-center justify-center">
                    <Leaf size={16} className="text-emerald-500" />
                  </div>
                  <div>
                    <p className={`text-xs font-bold ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>{lang === 'mr' ? 'निसर्गरम्य वातावरण' : 'Nature Comfort'}</p>
                    <p className={`text-[10px] ${isDark ? 'text-amber-200/60' : 'text-stone-600'}`}>{lang === 'mr' ? 'सदैव तत्पर सेवा' : 'Always with You'}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

        </div>
      </div>

      {/* BOTTOM PEDESTAL BAR: Clean Mobile & Desktop Layout */}
      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8 mt-5 sm:mt-6">
        <Reveal delay={3}>
          <div className="max-w-6xl mx-auto">
            {/* Mobile View: Clean Borderless Horizontal Scroll Bar (No tall enclosed square box) */}
            <div className="sm:hidden flex items-center gap-2.5 overflow-x-auto pb-3 px-1 scrollbar-none snap-x">
              {pedestalFeatures.map((item) => (
                <div
                  key={item.titleEn}
                  className={`snap-center flex-shrink-0 min-w-[115px] flex flex-col items-center text-center p-3 rounded-2xl border shadow-md transition-all ${
                    isDark
                      ? 'bg-[#23150c]/95 border-[#e6c278]/40 text-[#fcf6e8]'
                      : 'bg-white border-amber-300/70 text-[#23150c]'
                  }`}
                >
                  <div className="relative mb-2">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md ${
                      isDark ? 'bg-[#160d07] border-[#e6c278]/50 text-[#e6c278]' : 'bg-amber-50 border-amber-400 text-amber-800'
                    }`}>
                      <item.icon size={18} />
                    </div>
                    <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-1.5 rounded-[100%] blur-sm pointer-events-none ${
                      isDark ? 'bg-[#e6c278]/40' : 'bg-amber-400/40'
                    }`} />
                  </div>

                  <h3 className={`font-serif text-xs font-extrabold leading-tight ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>
                    {lang === 'mr' ? item.titleMr : item.titleEn}
                  </h3>
                  <p className={`text-[10px] mt-0.5 font-semibold leading-tight ${isDark ? 'text-stone-300/80' : 'text-stone-600'}`}>
                    {lang === 'mr' ? item.subMr : item.subEn}
                  </p>
                </div>
              ))}
            </div>

            {/* Desktop View: Sleek 5-Column Divided Card Bar */}
            <div className={`hidden sm:block rounded-3xl p-4 shadow-2xl backdrop-blur-md border ${
              isDark ? 'bg-[#23150c]/90 border-[#e6c278]/35' : 'bg-white/95 border-amber-300/70'
            }`}>
              <div className={`grid sm:grid-cols-3 lg:grid-cols-5 gap-2 lg:gap-0 lg:divide-x ${
                isDark ? 'lg:divide-[#e6c278]/20' : 'lg:divide-amber-200'
              }`}>
                {pedestalFeatures.map((item) => (
                  <div key={item.titleEn} className="flex flex-col items-center text-center p-2 group">
                    <div className="relative mb-2">
                      <div className={`w-12 h-12 rounded-full border flex items-center justify-center transition-all ${
                        isDark
                          ? 'bg-[#160d07] border-[#e6c278]/40 shadow-[0_0_20px_rgba(230,194,120,0.3)] group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(230,194,120,0.6)]'
                          : 'bg-amber-50 border-amber-300 shadow-sm group-hover:scale-110'
                      }`}>
                        <item.icon size={20} className={isDark ? 'text-[#e6c278] group-hover:text-amber-200' : 'text-amber-800'} />
                      </div>
                      <div className={`absolute -bottom-1 left-1/2 -translate-x-1/2 w-9 h-2 rounded-[100%] blur-sm pointer-events-none ${
                        isDark ? 'bg-[#e6c278]/35' : 'bg-amber-400/30'
                      }`} />
                    </div>

                    <h3 className={`font-serif text-sm font-extrabold leading-tight ${isDark ? 'text-amber-100' : 'text-stone-900'}`}>
                      {lang === 'mr' ? item.titleMr : item.titleEn}
                    </h3>
                    <p className={`text-xs mt-0.5 font-bold leading-tight ${isDark ? 'text-stone-300/80' : 'text-stone-600'}`}>
                      {lang === 'mr' ? item.subMr : item.subEn}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

      </div>
    </section>
  );
}

export function CustomersCount() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative py-10 sm:py-14 overflow-hidden border-y transition-colors duration-300 ${
      isDark
        ? 'bg-[#160d07] text-[#fcf6e8] border-[#e6c278]/15'
        : 'bg-[#faf6f0] text-[#23150c] border-amber-200/80'
    }`}>
      <div className="relative container-max px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 text-center">
          <Reveal>
            <div className="p-2">
              <div className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-1 ${
                isDark ? 'text-[#e6c278]' : 'text-amber-800'
              }`}>
                2,500+
              </div>
              <p className={`text-xs sm:text-sm font-bold tracking-wide ${
                isDark ? 'text-stone-300/90' : 'text-stone-700'
              }`}>
                {lang === 'mr' ? 'आनंदी महामार्ग ग्राहक' : 'Happy Highway Guests'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="p-2">
              <div className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-1 flex items-center justify-center gap-1 ${
                isDark ? 'text-[#e6c278]' : 'text-amber-800'
              }`}>
                3.9<span className="text-2xl sm:text-3xl text-amber-400">★</span>
              </div>
              <p className={`text-xs sm:text-sm font-bold tracking-wide ${
                isDark ? 'text-stone-300/90' : 'text-stone-700'
              }`}>
                {lang === 'mr' ? '२,०००+ गूगल रिव्ह्यूज' : '2,000+ Google Reviews'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={2}>
            <div className="p-2">
              <div className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-1 ${
                isDark ? 'text-[#e6c278]' : 'text-amber-800'
              }`}>
                500+
              </div>
              <p className={`text-xs sm:text-sm font-bold tracking-wide ${
                isDark ? 'text-stone-300/90' : 'text-stone-700'
              }`}>
                {lang === 'mr' ? 'कार्यक्रम लॉन क्षमता' : 'Event Lawn Guest Capacity'}
              </p>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <div className="p-2">
              <div className={`font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold mb-1 ${
                isDark ? 'text-[#e6c278]' : 'text-amber-800'
              }`}>
                24/7
              </div>
              <p className={`text-xs sm:text-sm font-bold tracking-wide ${
                isDark ? 'text-stone-300/90' : 'text-stone-700'
              }`}>
                {lang === 'mr' ? 'ईव्ही फास्ट चार्जिंग स्टेशन' : 'EV Fast Charging Station'}
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
