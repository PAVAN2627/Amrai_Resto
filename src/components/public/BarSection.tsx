import { Reveal } from '@/components/Reveal';
import { Wine, MessageCircle, Phone, Sparkles } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function BarSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`relative py-20 sm:py-24 overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#f8f3ea] text-stone-900 border-amber-200/80'
    }`}>
      {/* Background with soft ambient image overlay */}
      <div className="absolute inset-0">
        <img
          src="https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
          alt="Bar ambience"
          className={`w-full h-full object-cover ${isDark ? 'opacity-20' : 'opacity-10'}`}
          loading="lazy"
        />
        <div className={`absolute inset-0 bg-gradient-to-r ${
          isDark ? 'from-stone-950 via-stone-950/90 to-stone-950/60' : 'from-[#f8f3ea] via-[#f8f3ea]/90 to-[#f8f3ea]/60'
        }`} />
      </div>

      <div className="relative z-10 container-max px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <Reveal>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
              isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}>
              <Wine size={16} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
              <span>{lang === 'mr' ? 'स्वतंत्र एसी बार विभाग' : 'Separate AC Bar Section'}</span>
            </div>

            <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-6 leading-tight font-bold ${
              isDark ? 'text-amber-50' : 'text-stone-900'
            }`}>
              {lang === 'mr' ? (
                <>
                  शांत व आरामदायी वातावरणात <br />
                  <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>प्रीमियम ड्रिंक्सची सोय</span>
                </>
              ) : (
                <>
                  Premium Beverages in a <br />
                  <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>Warm, Relaxed Lounge Setting</span>
                </>
              )}
            </h2>

            <p className={`text-base sm:text-lg leading-relaxed mb-8 ${
              isDark ? 'text-stone-300/80' : 'text-stone-700'
            }`}>
              {lang === 'mr'
                ? 'आमच्या स्वतंत्र वातानुकूलित (AC) बार विभागात उत्तम रोषणाई, आरामदायक बैठकीची सोय आणि विविध ब्रँड्सच्या पेय पदार्थांचा आनंद घ्या. महामार्ग प्रवासादरम्यान विश्रांतीसाठी सर्वोत्तम ठिकाण.'
                : 'Our separate AC bar lounge provides a sophisticated atmosphere with ambient warm lighting, plush seating, and a curated menu of drinks. The ultimate spot to unwind on your journey.'}
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent(
                  lang === 'mr' ? 'नमस्कार, मला आमराई रिसॉर्ट बार विभागाबद्दल माहिती हवी आहे.' : 'Hello Aamrai Resort, I would like to enquire about the bar section.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold tracking-wide transition-all duration-300 shadow-xl hover:scale-105"
              >
                <MessageCircle size={18} />
                {lang === 'mr' ? 'व्हॉट्सॲप चौकशी' : 'Enquire on WhatsApp'}
              </a>

              <a
                href={`tel:${BUSINESS_INFO.phones[0]}`}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full font-bold border transition-all ${
                  isDark ? 'border-amber-400/30 text-amber-200 hover:border-amber-400' : 'border-stone-800 text-stone-900 hover:border-amber-700'
                }`}
              >
                <Phone size={18} />
                {BUSINESS_INFO.phones[0]}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
