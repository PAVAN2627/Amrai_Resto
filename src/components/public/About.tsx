import { useState, useEffect, useRef } from 'react';
import { Reveal } from '@/components/Reveal';
import { Leaf, MapPin, Star, Wine, PartyPopper, Zap, Sparkles } from 'lucide-react';
import { BUSINESS_INFO } from '@/lib/constants';
import { aboutSliderImages } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function About() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [currentSlide, setCurrentSlide] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSliderImages.length);
    }, 3500);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, []);

  const goToSlide = (idx: number) => {
    setCurrentSlide(idx);
    if (timerRef.current) clearInterval(timerRef.current);
    timerRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % aboutSliderImages.length);
    }, 3500);
  };

  return (
    <section id="about" className={`section-padding relative overflow-hidden transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-stone-100' : 'bg-[#faf5e9] text-stone-900'
    }`}>
      <div className="container-max grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <Reveal as="div" className="relative">
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl h-[380px] sm:h-[480px] border ${
            isDark ? 'border-[#e6c278]/40' : 'border-amber-300'
          }`}>
            {aboutSliderImages.map((img, i) => (
              <div
                key={i}
                className="absolute inset-0 transition-opacity duration-1000"
                style={{ opacity: i === currentSlide ? 1 : 0 }}
              >
                <img
                  src={img}
                  alt={`Aamrai Resort Shendre Satara ${i + 1}`}
                  className="w-full h-full object-cover"
                  loading={i === 0 ? 'eager' : 'lazy'}
                />
              </div>
            ))}
            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-stone-950/90 to-transparent">
              <div className="flex justify-center gap-2">
                {aboutSliderImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goToSlide(i)}
                    className={`h-2 rounded-full transition-all duration-300 ${
                      i === currentSlide ? 'w-8 bg-amber-400' : 'w-2 bg-white/40 hover:bg-white/60'
                    }`}
                    aria-label={`Go to slide ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>

          <div className={`absolute -bottom-5 -right-4 sm:right-6 rounded-2xl p-5 shadow-2xl border max-w-[240px] ${
            isDark ? 'bg-stone-900 text-amber-50 border-amber-400/30' : 'bg-white text-stone-900 border-amber-300'
          }`}>
            <div className="flex items-center gap-1.5 text-amber-400 mb-1">
              <Star size={18} className="fill-amber-400" />
              <span className="font-bold text-lg">{BUSINESS_INFO.rating} / 5</span>
            </div>
            <p className={`font-serif text-lg leading-tight mb-1 ${isDark ? 'text-amber-100' : 'text-stone-900 font-bold'}`}>
              {lang === 'mr' ? 'हायवे रिसॉर्ट' : 'Top Highway Resort'}
            </p>
            <p className={`text-xs ${isDark ? 'text-stone-300/70' : 'text-stone-600'}`}>{BUSINESS_INFO.reviewsCount} Google Reviews</p>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4 border ${
              isDark ? 'bg-amber-400/20 text-amber-300 border-amber-400/30' : 'bg-amber-100 text-amber-900 border-amber-300'
            }`}>
              <Sparkles size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
              <span>{lang === 'mr' ? BUSINESS_INFO.presentedByMarathi : BUSINESS_INFO.presentedBy}</span>
            </div>

            <h2 className={`font-serif text-4xl sm:text-5xl mb-6 leading-tight font-bold ${
              isDark ? 'text-amber-50' : 'text-stone-900'
            }`}>
              {lang === 'mr'
                ? 'पुणे-बंगळुरु महामार्गावरील हक्काचे विश्रांती स्थान'
                : 'Your Haven of Hospitality on NH4 Highway'}
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed mb-6 font-normal ${
              isDark ? 'text-stone-300' : 'text-stone-800'
            }`}>
              {lang === 'mr' ? (
                <>
                  सातारा येथील पुणे-बंगळुरु राष्ट्रीय महामार्गावरील (NH4) शेंद्रे फाटा येथे स्थित <strong>आमराई रिसॉर्ट</strong> हे आंबा बागेच्या निसर्गरम्य वातावरणात वसलेले प्रसिद्ध ठिकाण आहे.
                </>
              ) : (
                <>
                  Located conveniently at Shendre Phata on the Pune-Bangalore Highway (NH4), Satara — <strong>Aamrai Resort</strong> is surrounded by lush mango groves and serene open spaces.
                </>
              )}
            </p>

            <p className={`text-sm sm:text-base leading-relaxed mb-8 ${
              isDark ? 'text-stone-400' : 'text-stone-600'
            }`}>
              {lang === 'mr'
                ? 'येथे उत्तम दर्जाचे शाकाहारी व मांसाहारी जेवण, सातारी मटण हंडी, सेपरेट वातानुकूलित (AC) बार, ५०० लोकांच्या क्षमतेचे भव्य कार्यक्रम लॉन्स, सुसज्ज रूम्स आणि २४/७ फास्ट ईव्ही चार्जिंग उपलब्ध आहे.'
                : 'We offer authentic multi-cuisine dining featuring Satara Mutton Handi, Veg Thalis, Tandoori items, a separate AC Bar, 500-guest capacity Event Lawns, AC Rooms, and 24/7 Fast EV Charging.'}
            </p>

            <div className="grid grid-cols-2 gap-3.5">
              <div className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-sm ${
                isDark ? 'bg-stone-900 border-amber-400/20 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
              }`}>
                <MapPin className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-sm">
                    {lang === 'mr' ? 'हायवे लोकेशन' : 'Prime Location'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    {lang === 'mr' ? 'NH4 शेंद्रे फाटा, सातारा' : 'NH4 Shendre, Satara'}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-sm ${
                isDark ? 'bg-stone-900 border-amber-400/20 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
              }`}>
                <Wine className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-sm">
                    {lang === 'mr' ? 'सेपरेट एसी बार' : 'Separate AC Bar'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    {lang === 'mr' ? 'वातानुकूलित लाउंज' : 'AC Lounge & Drinks'}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-sm ${
                isDark ? 'bg-stone-900 border-amber-400/20 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
              }`}>
                <PartyPopper className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-sm">
                    {lang === 'mr' ? 'कार्यक्रम लॉन्स' : 'Event Lawns'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    {lang === 'mr' ? 'लग्न व वाढदिवस' : 'Weddings & Parties'}
                  </p>
                </div>
              </div>

              <div className={`flex items-start gap-3 p-3.5 rounded-xl border shadow-sm ${
                isDark ? 'bg-stone-900 border-amber-400/20 text-stone-100' : 'bg-white border-stone-200 text-stone-900'
              }`}>
                <Zap className="text-amber-500 flex-shrink-0 mt-0.5" size={20} />
                <div>
                  <p className="font-bold text-sm">
                    {lang === 'mr' ? 'ईव्ही स्टेशन' : 'EV Charging'}
                  </p>
                  <p className={`text-xs ${isDark ? 'text-stone-400' : 'text-stone-600'}`}>
                    {lang === 'mr' ? '२४/७ फास्ट चार्जिंग' : '24/7 Highway Fast Station'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
