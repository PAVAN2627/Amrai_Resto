import { Reveal } from '@/components/Reveal';
import { Phone, Mail, MapPin, MessageCircle, Clock, Navigation } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BASE } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function Contact() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <section id="contact" className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#faf6f0] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-12 sm:mb-16">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <MapPin size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'लोकेशन व संपर्क' : 'Contact & Location'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमराई रिसॉर्टला भेट द्या' : 'Visit Aamrai Resort'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'पुणे-बंगळुरु राष्ट्रीय महामार्ग (NH4), शेंद्रे फाटा, सातारा. आम्ही तुमचे स्वागत करण्यास उत्सुक आहोत.'
              : 'Located on the Pune-Bangalore Highway (NH4) at Shendre Phata, Satara. We look forward to welcoming you.'}
          </p>
        </Reveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <Reveal>
            <div className={`rounded-3xl border p-6 sm:p-8 h-full shadow-2xl flex flex-col justify-between ${
              isDark ? 'bg-stone-900 border-amber-400/20' : 'bg-white border-amber-200 shadow-md'
            }`}>
              <div>
                <h3 className={`font-serif text-2xl sm:text-3xl mb-6 font-bold ${
                  isDark ? 'text-amber-100' : 'text-stone-900'
                }`}>
                  {lang === 'mr' ? 'संपर्क माहिती' : 'Contact Information'}
                </h3>

                <div className="space-y-6">
                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}>
                      <MapPin size={22} />
                    </div>
                    <div>
                      <p className={`font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'text-amber-200' : 'text-amber-900'
                      }`}>
                        {lang === 'mr' ? 'पत्ता (Address)' : 'Address'}
                      </p>
                      <p className={`text-sm mt-1 leading-relaxed ${
                        isDark ? 'text-stone-200' : 'text-stone-800'
                      }`}>
                        {lang === 'mr' ? BUSINESS_INFO.locationMarathi : BUSINESS_INFO.location}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        isDark ? 'text-stone-400' : 'text-stone-500'
                      }`}>
                        {lang === 'mr' ? BUSINESS_INFO.cityMarathi : BUSINESS_INFO.city} - {BUSINESS_INFO.pincode}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}>
                      <Phone size={22} />
                    </div>
                    <div>
                      <p className={`font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'text-amber-200' : 'text-amber-900'
                      }`}>
                        {lang === 'mr' ? 'फोन नंबर (Phone)' : 'Phone Contacts'}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-1.5">
                        <a href={`tel:${BUSINESS_INFO.phones[0]}`} className={`text-sm font-bold hover:underline ${
                          isDark ? 'text-amber-300' : 'text-amber-800'
                        }`}>
                          {BUSINESS_INFO.phones[0]} ({lang === 'mr' ? 'हॉटेल' : 'Resort'})
                        </a>
                        <a href={`tel:${BUSINESS_INFO.phones[1]}`} className={`text-sm font-bold hover:underline ${
                          isDark ? 'text-amber-300' : 'text-amber-800'
                        }`}>
                          {BUSINESS_INFO.phones[1]} ({lang === 'mr' ? 'इव्हेंट' : 'Events'})
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-start gap-4">
                    <div className={`w-12 h-12 rounded-full border flex items-center justify-center flex-shrink-0 ${
                      isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}>
                      <Clock size={22} />
                    </div>
                    <div>
                      <p className={`font-bold text-xs uppercase tracking-wider ${
                        isDark ? 'text-amber-200' : 'text-amber-900'
                      }`}>
                        {lang === 'mr' ? 'वेळ (Hours)' : 'Opening Hours'}
                      </p>
                      <p className={`text-sm mt-1 font-bold ${
                        isDark ? 'text-stone-200' : 'text-stone-800'
                      }`}>
                        {lang === 'mr' ? 'सकाळी ०६:०० ते रात्री ११:३०' : '06:00 AM - 11:30 PM (Daily)'}
                      </p>
                      <p className={`text-xs mt-0.5 ${
                        isDark ? 'text-amber-300/70' : 'text-amber-800/80'
                      }`}>
                        {lang === 'mr' ? '● २४/७ ईव्ही फास्ट चार्जिंग उपलब्ध' : '● 24/7 Fast EV Charging Open'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 mt-6">
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=Aamrai+Resort+Shendre+Satara`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-amber-300 transition-all hover:scale-105"
                >
                  <Navigation size={16} />
                  {lang === 'mr' ? 'गूगल मॅप नेव्हिगेशन' : 'Google Maps Directions'}
                </a>
                <a
                  href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent(
                    lang === 'mr' ? 'नमस्कार आमराई रिसॉर्ट, मी संपर्क साधत आहे.' : 'Hello Aamrai Resort, I am contacting you.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-emerald-600 text-white font-bold text-xs sm:text-sm shadow-xl hover:bg-emerald-500 transition-all hover:scale-105"
                >
                  <MessageCircle size={16} />
                  {lang === 'mr' ? 'व्हॉट्सॲप मेसेज' : 'WhatsApp Us'}
                </a>
              </div>
            </div>
          </Reveal>

          {/* Embedded Google Map iframe */}
          <Reveal delay={2}>
            <div className={`rounded-3xl overflow-hidden shadow-2xl h-full min-h-[380px] border ${
              isDark ? 'border-amber-400/30' : 'border-amber-300'
            }`}>
              <iframe
                title="Aamrai Resort Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3817.8099042571216!2d74.004128!3d17.610543!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2374ef06b9cb5%3A0x886b7ab1ffc129e2!2sAamrai%20Resort!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
