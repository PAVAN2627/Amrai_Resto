import { useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Users, Check, MessageCircle, PartyPopper, Calendar } from 'lucide-react';
import { mockEvents } from '@/lib/mockData';
import { formatCurrency, BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function EventsSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const packages = useMemo(() => mockEvents, []);

  const eventTranslations: Record<string, { nameMr: string; descMr: string; capacityMr: string; amenitiesMr: string }> = {
    'e1': {
      nameMr: 'भव्य लग्न सोहळा (Wedding)',
      descMr: 'निसर्गाच्या सानिध्यात भव्य लग्नसोहळे पार पाडा. ५०० हून अधिक पाहुण्यांसाठी भव्य इव्हेंट लॉन आणि उत्तम कॅटरिंग व्यवस्था.',
      capacityMr: '५०० लोकांपर्यंत क्षमता',
      amenitiesMr: 'इव्हेंट लॉन, डेकोरेशन, कॅटरिंग, पार्किंग, पॉवर बॅकअप',
    },
    'e2': {
      nameMr: 'महेंदी व संगीत संध्या',
      descMr: 'विवाहपूर्व विविध आनंददायी सोहळ्यांसाठी बाग परिसर, आकर्षक रोषणाई आणि ध्वनी प्रणालीसह सानुकूलित सोय.',
      capacityMr: '२०० लोकांपर्यंत क्षमता',
      amenitiesMr: 'गार्डन एरिया, साऊंड सिस्टीम, डेकोरेशन, कॅटरिंग',
    },
    'e3': {
      nameMr: 'वाढदिवस सोहळा',
      descMr: 'वाढदिवसाचे आनंददायी क्षण साजरे करण्यासाठी विशेष डेकोरेशन, केक टेबल आणि जेवणाची उत्तम सोय.',
      capacityMr: '१०० लोकांपर्यंत क्षमता',
      amenitiesMr: 'डेकोरेशन, केक टेबल, जेवण व्यवस्था, म्युझिक',
    },
    'e4': {
      nameMr: 'कॉर्पोरेट इव्हेंट्स',
      descMr: 'व्यावसायिक बैठकी, टीम आऊटिंग्स आणि कॉर्पोरेट मेळाव्यांसाठी बैठक व्यवस्था आणि पूर्ण कॅटरिंग सोय.',
      capacityMr: '१५० लोकांपर्यंत क्षमता',
      amenitiesMr: 'बैठक व्यवस्था, प्रोजेक्ट सेटअप, कॅटरिंग, पार्किंग',
    },
    'e5': {
      nameMr: 'ॲनिव्हर्सरी व फॅमिली सोहळे',
      descMr: 'लग्नाचा वाढदिवस व कौटुंबिक गेट-टुगेदरसाठी सुसज्ज व प्रसन्न वातावरणात खास सर्व्हिस.',
      capacityMr: '८० लोकांपर्यंत क्षमता',
      amenitiesMr: 'डेकोरेशन, प्रायव्हेट डाइनिंग, केक टेबल, म्युझिक',
    },
  };

  return (
    <section id="events" className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-900 text-amber-50 border-amber-400/10' : 'bg-[#fdfcf7] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <PartyPopper size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'कार्यक्रम व लॉन्स' : 'Events & Celebrations'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'इव्हेंट लॉन्स व पॅकेजेस' : 'Event Lawns & Packages'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'लग्नकार्ये, वाढदिवस आणि कॉर्पोरेट सोहळ्यांसाठी आमचे भव्य इव्हेंट लॉन्स आणि तत्पर सर्व्हिस उपलब्ध.'
              : 'From grand weddings to intimate celebrations, our spacious event lawns and dedicated service make every moment unforgettable.'}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg, i) => {
            const tr = eventTranslations[pkg.id];
            const name = lang === 'mr' && tr ? tr.nameMr : pkg.name;
            const desc = lang === 'mr' && tr ? tr.descMr : pkg.description;
            const capacity = lang === 'mr' && tr ? tr.capacityMr : pkg.capacity;
            const amenitiesStr = lang === 'mr' && tr ? tr.amenitiesMr : pkg.amenities;

            return (
              <Reveal key={pkg.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`group rounded-2xl overflow-hidden card-hover flex flex-col h-full shadow-xl border ${
                  isDark ? 'bg-stone-950 border-amber-400/20 hover:border-amber-400/60' : 'bg-white border-amber-200/80 hover:border-amber-400'
                }`}>
                  <div className="relative h-48 sm:h-52 overflow-hidden">
                    <img
                      src={pkg.image_url}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-stone-950 via-stone-950/40' : 'from-stone-900/80 via-stone-900/20'
                    } to-transparent`} />
                    <div className="absolute bottom-3 left-3 right-3">
                      <h3 className="font-serif text-xl sm:text-2xl text-amber-100 font-bold">{name}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <div className={`flex items-center gap-2 text-xs sm:text-sm font-semibold mb-3 ${
                      isDark ? 'text-amber-400' : 'text-amber-700'
                    }`}>
                      <Users size={16} /> {capacity}
                    </div>

                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 flex-1 ${
                      isDark ? 'text-stone-300/70' : 'text-stone-600'
                    }`}>
                      {desc}
                    </p>

                    <div className="mb-5">
                      <p className={`text-[11px] font-bold uppercase tracking-wider mb-2 ${
                        isDark ? 'text-amber-300' : 'text-amber-800'
                      }`}>
                        {lang === 'mr' ? 'सुविधा:' : 'Amenities included:'}
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {amenitiesStr.split(',').map((a) => a.trim()).filter(Boolean).map((a) => (
                          <span key={a} className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full border text-[11px] ${
                            isDark ? 'bg-stone-800 border-amber-400/20 text-stone-200' : 'bg-amber-50 border-amber-300 text-stone-800'
                          }`}>
                            <Check size={11} className={isDark ? 'text-amber-400' : 'text-amber-700'} /> {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`flex items-center justify-between pt-4 border-t ${
                      isDark ? 'border-amber-400/10' : 'border-stone-200'
                    }`}>
                      <div>
                        <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          {lang === 'mr' ? 'सुरुवातीची किंमत' : 'Starting from'}
                        </p>
                        <p className={`font-serif text-xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {formatCurrency(pkg.starting_price)}
                        </p>
                      </div>
                      <a
                        href={`${WHATSAPP_BASE}${pkg.contact}?text=${encodeURIComponent(
                          lang === 'mr'
                            ? `नमस्कार आमराई रिसॉर्ट, मला "${name}" इव्हेंट पॅकेजची चौकशी करायची आहे.`
                            : `Hello Aamrai Resort, I would like to enquire about the "${name}" event package.`
                        )}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors"
                      >
                        <MessageCircle size={14} /> {lang === 'mr' ? 'चौकशी करा' : 'Enquire'}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={3}>
          <p className={`text-center text-xs mt-8 italic ${isDark ? 'text-stone-400/60' : 'text-stone-500'}`}>
            {lang === 'mr'
              ? '* तारीख उपलब्धतेसाठी आणि सानुकूलित पॅकेजसाठी व्हॉट्सॲपवर संपर्क साधा.'
              : '* Contact on WhatsApp for date availability and custom packages.'}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
