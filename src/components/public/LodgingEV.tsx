import { useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Bed, Check, Phone, MessageCircle, Zap, Car, ShieldCheck, Sparkles } from 'lucide-react';
import { mockRooms } from '@/lib/mockData';
import { formatCurrency, BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function LodgingSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const rooms = useMemo(() => mockRooms.sort((a, b) => a.price - b.price), []);

  const roomTranslations: Record<string, { nameMr: string; descMr: string; amenitiesMr: string }> = {
    'rm1': {
      nameMr: 'डिलक्स एसी रूम (Deluxe)',
      descMr: 'निसर्गरम्य वातावरण, वातानुकूलन (AC) आणि सर्व आधुनिक सोयींनी युक्त आरामदायक रूम.',
      amenitiesMr: 'एसी, टीव्ही, गरम पाणी, वाय-फाय, अटॅच बाथरूम',
    },
    'rm2': {
      nameMr: 'प्रीमियम एसी रूम (Premium)',
      descMr: 'प्रशस्त रूम, उत्तम फर्निचर आणि निसर्गरम्य व्ह्यूसह आरामदायक मुक्काम.',
      amenitiesMr: 'एसी, टीव्ही, गरम पाणी, वाय-फाय, मिनी फ्रिज, गार्डन व्ह्यू',
    },
    'rm3': {
      nameMr: 'फॅमिली सूट (Family Suite)',
      descMr: 'मोठ्या कुटुंबासाठी विशेष प्रशस्त रूम, मल्टिपल बेड आणि सिटिंग एरिया.',
      amenitiesMr: 'एसी, टीव्ही, गरम पाणी, वाय-फाय, मिनी फ्रिज, सिटिंग एरिया',
    },
    'rm4': {
      nameMr: 'नेचर कॉटेज (Nature Cottage)',
      descMr: 'शांत व निवांत मुक्कामासाठी स्वतंत्र वूडन कॉटेज.',
      amenitiesMr: 'एसी, टीव्ही, गरम पाणी, वाय-फाय, प्रायव्हेट व्हरांडा, बागेत प्रवेश',
    },
  };

  return (
    <section id="lodging" className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#faf5e9] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Bed size={16} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'मुक्काम व निवास सोय' : 'Lodging & Rooms'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-4 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमराई रिसॉर्ट मुक्काम' : 'Stay at Aamrai Resort'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'पुणे-बंगळुरु हायवेवर उत्तम, स्वच्छ व वातानुकूलित रूम्स. बुकिंग व उपलब्धतेसाठी थेट कॉल करा.'
              : 'Clean, comfortable, air-conditioned rooms on the Pune-Bangalore Highway. Call directly for booking.'}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {rooms.map((room, i) => {
            const tr = roomTranslations[room.id];
            const name = lang === 'mr' && tr ? tr.nameMr : room.name;
            const desc = lang === 'mr' && tr ? tr.descMr : room.description;
            const amenitiesStr = lang === 'mr' && tr ? tr.amenitiesMr : room.amenities;

            return (
              <Reveal key={room.id} delay={((i % 4) + 1) as 1 | 2 | 3 | 4}>
                <div className={`group rounded-2xl overflow-hidden card-hover flex flex-col h-full shadow-xl border ${
                  isDark ? 'bg-stone-900 border-amber-400/20 hover:border-amber-400/60' : 'bg-white border-amber-200/80 hover:border-amber-400'
                }`}>
                  <div className="relative h-44 overflow-hidden">
                    <img
                      src={room.image_url}
                      alt={name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t ${
                      isDark ? 'from-stone-900 via-stone-900/30' : 'from-stone-900/70 via-transparent'
                    } to-transparent`} />
                    <div className="absolute top-3 right-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[11px] font-bold">
                        {lang === 'mr' ? 'उपलब्ध' : 'Available'}
                      </span>
                    </div>
                    <div className="absolute bottom-3 left-3">
                      <h3 className="font-serif text-lg text-amber-100 font-bold">{name}</h3>
                    </div>
                  </div>

                  <div className="p-5 flex flex-col flex-1">
                    <p className={`text-xs sm:text-sm leading-relaxed mb-4 flex-1 ${
                      isDark ? 'text-stone-300/70' : 'text-stone-600'
                    }`}>
                      {desc}
                    </p>

                    <div className="mb-5">
                      <div className="flex flex-wrap gap-1.5">
                        {amenitiesStr.split(',').map((a) => a.trim()).filter(Boolean).map((a) => (
                          <span key={a} className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] border ${
                            isDark ? 'bg-stone-950 border-amber-400/20 text-stone-300' : 'bg-amber-50 border-amber-300 text-stone-800'
                          }`}>
                            <Check size={10} className={isDark ? 'text-amber-400' : 'text-amber-700'} /> {a}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className={`flex items-center justify-between pt-4 border-t ${
                      isDark ? 'border-amber-400/10' : 'border-stone-200'
                    }`}>
                      <div>
                        <p className={`text-[10px] uppercase tracking-wider ${isDark ? 'text-stone-400' : 'text-stone-500'}`}>
                          {lang === 'mr' ? 'प्रति रात्र' : 'Per Night'}
                        </p>
                        <p className={`font-serif text-xl font-bold ${isDark ? 'text-amber-400' : 'text-amber-700'}`}>
                          {formatCurrency(room.price)}
                        </p>
                      </div>
                      <a
                        href={`tel:${BUSINESS_INFO.lodgingPhone}`}
                        className="inline-flex items-center gap-1 px-3 py-2 rounded-full bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs shadow-md transition-colors"
                      >
                        <Phone size={13} /> {lang === 'mr' ? 'कॉल करा' : 'Call'}
                      </a>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={3}>
          <div className="mt-10 text-center flex flex-wrap justify-center gap-4">
            <a href={`tel:${BUSINESS_INFO.lodgingPhone}`} className="btn-primary">
              <Phone size={18} /> {lang === 'mr' ? 'रूम बुक करण्यासाठी कॉल करा' : 'Call for Room Booking'}
            </a>
            <a
              href={`${WHATSAPP_BASE}${BUSINESS_INFO.lodgingPhone}?text=${encodeURIComponent(
                lang === 'mr'
                  ? 'नमस्कार आमराई रिसॉर्ट, मला रूम बुकिंगबद्दल माहिती हवी आहे.'
                  : 'Hello, I would like to enquire about room booking at Aamrai Resort.'
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm tracking-wide transition-all ${
                isDark ? 'border-amber-400/40 text-amber-100 hover:bg-amber-400/10' : 'border-amber-700/40 text-stone-900 hover:bg-amber-100'
              }`}
            >
              <MessageCircle size={18} /> {lang === 'mr' ? 'व्हॉट्सॲपवर चौकशी करा' : 'WhatsApp for Room Booking'}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function EVParkingSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-900 text-amber-50 border-amber-400/10' : 'bg-[#fdfcf7] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max grid lg:grid-cols-2 gap-12 items-center">
        <Reveal>
          <div className={`relative rounded-3xl overflow-hidden shadow-2xl border ${
            isDark ? 'border-amber-400/20' : 'border-amber-300'
          }`}>
            <img
              src="https://images.pexels.com/photos/4678065/pexels-photo-4678065.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
              alt="EV Charging station"
              className="w-full h-80 sm:h-96 object-cover"
              loading="lazy"
            />
            <div className={`absolute inset-0 bg-gradient-to-t ${
              isDark ? 'from-stone-950 via-stone-950/20' : 'from-stone-900/80 via-transparent'
            } to-transparent`} />
            <div className={`absolute bottom-4 left-4 right-4 backdrop-blur-md p-4 rounded-2xl border ${
              isDark ? 'bg-stone-950/80 border-amber-400/30' : 'bg-stone-900/90 text-amber-50 border-amber-300'
            }`}>
              <p className="text-amber-400 font-bold text-sm flex items-center gap-1.5">
                <Zap size={16} /> {lang === 'mr' ? '२४/७ फास्ट चार्जिंग पॉइंट' : '24/7 Fast EV Charging Point'}
              </p>
              <p className="text-stone-300 text-xs mt-1">
                {lang === 'mr' ? 'पुणे-बंगळुरु राष्ट्रीय महामार्ग (NH4), शेंद्रे फाटा' : 'Pune-Bangalore National Highway (NH4), Shendre Phata'}
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={2}>
          <div>
            <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-4 border ${
              isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
            }`}>
              <Zap size={16} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
              <span>{lang === 'mr' ? 'ईव्ही चार्जिंग स्टेशन' : 'EV Charging Available'}</span>
            </div>
            <h2 className={`font-serif text-4xl sm:text-5xl mb-4 font-bold leading-tight ${
              isDark ? 'text-amber-50' : 'text-stone-900'
            }`}>
              {lang === 'mr' ? (
                <>
                  जेवणाचा आस्वाद घ्या, <br />
                  <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>गाडी फास्ट चार्ज करा</span>
                </>
              ) : (
                <>
                  Charge Your Vehicle <br />
                  <span className={isDark ? 'text-amber-400' : 'text-amber-700'}>While You Dine & Relax</span>
                </>
              )}
            </h2>
            <p className={`text-base leading-relaxed mb-8 ${
              isDark ? 'text-stone-300/80' : 'text-stone-600'
            }`}>
              {lang === 'mr'
                ? 'महामार्गावरून प्रवास करणाऱ्या सर्व इलेक्ट्रिक वाहनधारकांसाठी २४/७ फास्ट ईव्ही चार्जिंग सोय उपलब्ध. गाडी चार्जिंगला लावा आणि उत्तम जेवणाचा आनंद घ्या.'
                : 'Convenient 24/7 fast-charging facility for electric vehicles travelling on the highway. Plug in, relax, and enjoy fresh delicacies while your vehicle charges.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <a href={`tel:${BUSINESS_INFO.phones[0]}`} className="btn-primary">
                <Phone size={18} /> {lang === 'mr' ? 'कॉल करा' : 'Call Now'}
              </a>
              <a
                href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent(
                  lang === 'mr'
                    ? 'नमस्कार, मला ईव्ही चार्जिंग स्टेशनबद्दल माहिती हवी आहे.'
                    : 'Hello Aamrai Resort, I would like to know about EV charging.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border font-bold text-sm tracking-wide transition-all ${
                  isDark ? 'border-amber-400/40 text-amber-100 hover:bg-amber-400/10' : 'border-amber-700/40 text-stone-900 hover:bg-amber-100'
                }`}
              >
                <MessageCircle size={18} /> {lang === 'mr' ? 'व्हॉट्सॲप' : 'WhatsApp'}
              </a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="container-max mt-16 sm:mt-20">
        <div className="grid sm:grid-cols-3 gap-6">
          {[
            {
              icon: Car,
              titleEn: 'Ample Safe Parking',
              titleMr: 'प्रशस्त व सुरक्षित पार्किंग',
              descEn: 'Spacious parking area for cars, SUVs & buses',
              descMr: 'कार, एसयूव्ही व बसेससाठी प्रशस्त जागा',
            },
            {
              icon: Sparkles,
              titleEn: 'Peaceful Atmosphere',
              titleMr: 'प्रसन्न वातावरण',
              descEn: 'Clean, green & hygienic surroundings',
              descMr: 'स्वच्छ व निसर्गरम्य परिसर',
            },
            {
              icon: ShieldCheck,
              titleEn: '24/7 CCTV Security',
              titleMr: '२४/७ सुरक्षा व्यवस्था',
              descEn: 'CCTV monitored premises & attentive staff',
              descMr: 'सीसीटीव्ही निगराणी व मदतनीस कर्मचारी',
            },
          ].map((item, i) => (
            <Reveal key={item.titleEn} delay={((i % 3) + 1) as 1 | 2 | 3}>
              <div className={`rounded-2xl border p-6 text-center card-hover shadow-md ${
                isDark ? 'bg-stone-950 border-amber-400/20' : 'bg-white border-amber-200'
              }`}>
                <div className={`w-12 h-12 rounded-full border flex items-center justify-center mx-auto mb-4 ${
                  isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                }`}>
                  <item.icon size={24} />
                </div>
                <h3 className={`font-serif text-xl mb-2 font-bold ${
                  isDark ? 'text-amber-100' : 'text-stone-900'
                }`}>
                  {lang === 'mr' ? item.titleMr : item.titleEn}
                </h3>
                <p className={`text-xs sm:text-sm ${
                  isDark ? 'text-stone-300/70' : 'text-stone-600'
                }`}>
                  {lang === 'mr' ? item.descMr : item.descEn}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
