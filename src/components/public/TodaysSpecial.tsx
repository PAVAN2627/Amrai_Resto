import { useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Star, MessageCircle } from 'lucide-react';
import { mockMenuItems } from '@/lib/mockData';
import { formatCurrency, BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function TodaysSpecial() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const items = useMemo(() => mockMenuItems.filter((i) => i.is_special && i.is_available && !i.is_bar_item).sort((a, b) => a.sort_order - b.sort_order), []);

  if (items.length === 0) return null;

  return (
    <section className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#faf6f0] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>{lang === 'mr' ? 'आजचे खास पदार्थ' : "Chef's Recommendations Today"}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आजचे विशेष मेनू' : "Today's Chef Specials"}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'खास सातारी चव आणि ताजे तयार केलेले आमराई रिसॉर्टचे विशेष पदार्थ.'
              : 'Authentic Satara flavors and signature resort delicacies prepared fresh today.'}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {items.map((item, i) => (
            <Reveal key={item.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className={`group rounded-2xl overflow-hidden card-hover flex flex-col justify-between h-full shadow-xl border ${
                isDark ? 'bg-stone-900 border-amber-400/20 hover:border-amber-400/60' : 'bg-white border-amber-200 hover:border-amber-400'
              }`}>
                <div>
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-stone-950 via-stone-950/20' : 'from-stone-900/80 via-transparent'
                    } to-transparent opacity-85`} />
                    
                    {/* Badge */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      <span className={`px-2.5 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase ${
                        item.is_veg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'
                      }`}>
                        {item.is_veg ? (lang === 'mr' ? '● शाकाहारी' : '● Veg') : (lang === 'mr' ? '▲ मांसाहारी' : '▲ Non-Veg')}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                      <span className="font-serif text-2xl text-amber-300 font-bold text-shadow-md">
                        {formatCurrency(item.price)}
                      </span>
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-md">
                        <Star size={11} className="fill-stone-950" /> {lang === 'mr' ? 'खास' : 'Special'}
                      </span>
                    </div>
                  </div>

                  <div className="p-4 sm:p-5">
                    <h3 className={`font-serif text-xl font-bold mb-1.5 transition-colors ${
                      isDark ? 'text-amber-100 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-800'
                    }`}>
                      {item.name}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-stone-300/70' : 'text-stone-600'
                    }`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                <div className={`p-4 pt-0 border-t ${isDark ? 'border-amber-400/10' : 'border-stone-100'}`}>
                  <a
                    href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent(
                      lang === 'mr'
                        ? `नमस्कार आमराई रिसॉर्ट, मला "${item.name}" बद्दल ऑर्डर/चौकशी करायची आहे.`
                        : `Hello Aamrai Resort, I would like to order/enquire about "${item.name}".`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5 mt-3"
                  >
                    <MessageCircle size={14} /> {lang === 'mr' ? 'ऑर्डर चौकशी' : 'Order Enquiry'}
                  </a>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
