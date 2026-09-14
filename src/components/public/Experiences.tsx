import { Reveal } from '@/components/Reveal';
import { Utensils, Wine, PartyPopper, Cake, Zap, Car, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const experiences = [
  {
    icon: Utensils,
    titleEn: 'Family Restaurant',
    titleMr: 'फॅमिली रेस्टॉरंट',
    descEn: 'Delicious Veg & Non-Veg Satara Specialties',
    descMr: 'अस्सल शाकाहारी व मांसाहारी मेजवानी',
    image: 'https://images.pexels.com/photos/29819295/pexels-photo-29819295.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Wine,
    titleEn: 'Separate AC Bar',
    titleMr: 'सेपरेट एसी बार',
    descEn: 'Comfortable & Relaxed Lounge Atmosphere',
    descMr: 'सुसज्ज, वातानुकूलित व शांत बार विभाग',
    image: 'https://images.pexels.com/photos/11828428/pexels-photo-11828428.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: PartyPopper,
    titleEn: 'Spacious Event Lawn',
    titleMr: 'भव्य इव्हेंट लॉन',
    descEn: 'Weddings, Receptions, Mehendi & Celebrations',
    descMr: 'लग्नकार्य, मेहेंदी, संगीत व कौटुंबिक कार्यक्रम',
    image: 'https://images.pexels.com/photos/31217382/pexels-photo-31217382.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Cake,
    titleEn: 'Private Celebrations',
    titleMr: 'वाढदिवस व सोहळे',
    descEn: 'Birthday Parties, Anniversaries & Get-Togethers',
    descMr: 'वाढदिवस, ॲनिव्हर्सरी व फॅमिली गेट-टुगेदर',
    image: 'https://images.pexels.com/photos/4887782/pexels-photo-4887782.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Zap,
    titleEn: '24/7 EV Charging',
    titleMr: '२४/७ ईव्ही चार्जिंग',
    descEn: 'Convenient Fast Charging Station on NH4',
    descMr: 'महामार्गावरील २४/७ जलद ईव्ही चार्जिंग',
    image: 'https://images.pexels.com/photos/4678065/pexels-photo-4678065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
  {
    icon: Car,
    titleEn: 'Spacious Parking',
    titleMr: 'सुरक्षित पार्किंग',
    descEn: 'Ample Safe & CCTV Monitored Premises',
    descMr: 'मोठी, प्रशस्त व सुरक्षित पार्किंग सुविधा',
    image: 'https://images.pexels.com/photos/9716297/pexels-photo-9716297.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
  },
];

export function Experiences() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="experiences" className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#faf6f0] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Sparkles size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'सुविधा व अनुभव' : 'Resort Offerings'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमच्या प्रमुख सेवा' : 'Everything Under One Roof'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'पुणे-बंगळुरु हायवेवरील प्रवासादरम्यान किंवा कौटुंबिक सोहळ्यांसाठी सर्वोत्कृष्ट सुविधा.'
              : 'Designed for comfort, celebration, and convenience for all highway guests.'}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiences.map((exp, i) => (
            <Reveal key={exp.titleEn} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className={`group rounded-2xl overflow-hidden card-hover shadow-xl flex flex-col h-full border ${
                isDark ? 'bg-stone-900 border-amber-400/20 hover:border-amber-400/60' : 'bg-white border-amber-200 hover:border-amber-400 shadow-md'
              }`}>
                <div className="relative h-48 sm:h-52 overflow-hidden">
                  <img
                    src={exp.image}
                    alt={exp.titleEn}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${
                    isDark ? 'from-stone-950 via-stone-950/30' : 'from-stone-900/70 via-transparent'
                  } to-transparent`} />
                  <div className="absolute top-3 left-3">
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center shadow-md ${
                      isDark ? 'bg-stone-950/90 border-amber-400/40 text-amber-400' : 'bg-white border-amber-300 text-amber-800'
                    }`}>
                      <exp.icon size={20} />
                    </div>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <h3 className={`font-serif text-xl font-bold mb-1.5 transition-colors ${
                      isDark ? 'text-amber-100 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-800'
                    }`}>
                      {lang === 'mr' ? exp.titleMr : exp.titleEn}
                    </h3>
                    <p className={`text-xs sm:text-sm leading-relaxed ${
                      isDark ? 'text-stone-300/70' : 'text-stone-600'
                    }`}>
                      {lang === 'mr' ? exp.descMr : exp.descEn}
                    </p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
