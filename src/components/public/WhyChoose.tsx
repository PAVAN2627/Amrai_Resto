import { Reveal } from '@/components/Reveal';
import { Sparkles, Utensils, Wine, PartyPopper, Zap, Car, ShieldCheck, Clock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const reasons = [
  { icon: Sparkles, titleEn: 'Peaceful Resort Ambience', titleMr: 'प्रसन्न रिसॉर्ट वातावरण', descEn: 'Spacious, clean, and tranquil surroundings', descMr: 'प्रशस्त, स्वच्छ आणि निसर्गरम्य वातावरण' },
  { icon: Utensils, titleEn: 'Family Dining Restaurant', titleMr: 'स्वतंत्र फॅमिली रेस्टॉरंट', descEn: 'Authentic Veg & Non-Veg Maharashtrian delicacies', descMr: 'अस्सल व्हेज व नॉन-व्हेज जेवणाची सोय' },
  { icon: Wine, titleEn: 'Separate AC Bar Lounge', titleMr: 'सेपरेट एसी बार', descEn: 'Comfortable, premium & private bar section', descMr: 'वातानुकूलित व स्वतंत्र बार सेक्शन' },
  { icon: PartyPopper, titleEn: 'Spacious Event Lawns', titleMr: 'भव्य इव्हेंट लॉन्स', descEn: 'Weddings, mehendi, receptions & corporate events', descMr: 'लग्नकार्ये, वाढदिवस व मोठ्या कार्यक्रमांसाठी' },
  { icon: Zap, titleEn: '24/7 EV Fast Charger', titleMr: '२४/७ ईव्ही चार्जिंग', descEn: 'Convenient highway fast-charging station', descMr: 'महामार्गावर जलद ईव्ही चार्जिंग सोय' },
  { icon: Car, titleEn: 'Ample Safe Parking', titleMr: 'प्रशस्त पार्किंग', descEn: 'Secure, CCTV monitored parking for all vehicles', descMr: 'सर्व वाहनांसाठी सुरक्षित पार्किंग जागा' },
  { icon: ShieldCheck, titleEn: 'Hygienic & Professional', titleMr: 'उत्कृष्ट सर्व्हिस', descEn: 'Trained, courteous staff and fresh preparation', descMr: 'प्रशिक्षित कर्मचारी व ताजे अन्न पदार्थ' },
  { icon: Clock, titleEn: 'Express Highway Service', titleMr: 'जलद सेवा', descEn: 'Quick hospitality tailored for travelers', descMr: 'प्रवाशांसाठी त्वरित व तत्पर सेवा' },
];

export function WhyChoose() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#fdfcf7] text-stone-900 border-amber-200/80'
    }`}>
      {/* Background ambient lighting */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        isDark ? 'bg-amber-500/5' : 'bg-amber-300/10'
      }`} />

      <div className="container-max relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <p className={`text-xs sm:text-sm tracking-[0.25em] uppercase mb-3 font-bold ${
            isDark ? 'text-amber-400' : 'text-amber-800'
          }`}>
            {lang === 'mr' ? 'आमची खास वैशिष्ट्ये' : 'Why Guests Choose Us'}
          </p>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमराई रिसॉर्ट का निवडावे?' : 'The Aamrai Resort Distinction'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'उत्कृष्ट चव, आरामदायी वातावरण, सेपरेट फॅमिली डाइनिंग, बार आणि २४/७ महामार्ग सोयी एकाच ठिकाणी.'
              : 'Unmatched taste, serene ambience, separate dining/bar sections, and 24/7 highway conveniences.'}
          </p>
        </Reveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {reasons.map((reason, i) => (
            <Reveal key={reason.titleEn} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
              <div className={`rounded-2xl border p-5 sm:p-6 text-center transition-all duration-300 hover:-translate-y-1.5 shadow-xl h-full flex flex-col justify-between group ${
                isDark ? 'bg-stone-900/90 border-amber-400/20 hover:border-amber-400/60' : 'bg-white border-amber-200 hover:border-amber-400 shadow-md'
              }`}>
                <div>
                  <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform ${
                    isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                  }`}>
                    <reason.icon size={24} />
                  </div>
                  <h3 className={`font-serif text-lg sm:text-xl mb-2 font-bold leading-tight ${
                    isDark ? 'text-amber-100' : 'text-stone-900'
                  }`}>
                    {lang === 'mr' ? reason.titleMr : reason.titleEn}
                  </h3>
                  <p className={`text-xs sm:text-sm leading-relaxed ${
                    isDark ? 'text-stone-300/70' : 'text-stone-600'
                  }`}>
                    {lang === 'mr' ? reason.descMr : reason.descEn}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
