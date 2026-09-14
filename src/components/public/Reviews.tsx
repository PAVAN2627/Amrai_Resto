import { useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Star, Quote, ExternalLink } from 'lucide-react';
import { mockReviews } from '@/lib/mockData';
import { BUSINESS_INFO } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

export function Reviews() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const reviews = useMemo(() => mockReviews, []);

  if (!reviews || reviews.length === 0) return null;

  return (
    <section className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-900 text-amber-50 border-amber-400/10' : 'bg-[#faf6f0] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Star size={15} className="fill-amber-400 text-amber-400" />
            <span>{BUSINESS_INFO.rating} ★ / 5 from {BUSINESS_INFO.reviewsCount} Google Reviews</span>
          </div>

          <h2 className={`font-serif text-4xl sm:text-5xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'ग्राहकांचे अभिप्राय व अनुभव' : 'Guest Feedback & Reviews'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'आमराई रिसॉर्ट, शेंद्रे सातारा येथील ग्राहकांचे प्रत्यक्ष अनुभव आणि अभिप्राय.'
              : 'Read what highway travelers, families, and party hosts say about their experience at Aamrai Resort, Shendre Satara.'}
          </p>
        </Reveal>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
          {reviews.map((review, i) => {
            const revMr = (review as any).textMr;
            const textToDisplay = lang === 'mr' && revMr ? revMr : review.text;

            return (
              <Reveal key={review.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`rounded-2xl border p-6 card-hover h-full flex flex-col justify-between shadow-xl ${
                  isDark ? 'bg-stone-950 border-amber-400/20' : 'bg-white border-amber-200 shadow-md'
                }`}>
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex gap-1">
                        {[...Array(5)].map((_, idx) => (
                          <Star
                            key={idx}
                            size={16}
                            className={idx < review.rating ? 'text-amber-400 fill-amber-400' : isDark ? 'text-stone-700' : 'text-stone-300'}
                          />
                        ))}
                      </div>
                      <Quote className={isDark ? 'text-amber-400/40' : 'text-amber-700/40'} size={24} />
                    </div>
                    <p className={`text-sm sm:text-base leading-relaxed mb-6 italic font-normal ${
                      isDark ? 'text-stone-200' : 'text-stone-800'
                    }`}>
                      "{textToDisplay}"
                    </p>
                  </div>

                  <div className={`flex items-center gap-3 pt-4 border-t ${
                    isDark ? 'border-amber-400/10' : 'border-stone-200'
                  }`}>
                    <div className={`w-10 h-10 rounded-full border flex items-center justify-center font-serif text-lg font-bold shadow ${
                      isDark ? 'bg-stone-800 border-amber-400/30 text-amber-400' : 'bg-amber-100 border-amber-300 text-amber-800'
                    }`}>
                      {review.author_name.charAt(0)}
                    </div>
                    <div>
                      <p className={`font-serif text-base font-bold ${
                        isDark ? 'text-amber-100' : 'text-stone-900'
                      }`}>
                        {review.author_name}
                      </p>
                      <p className={`text-[11px] ${
                        isDark ? 'text-amber-300/60' : 'text-amber-800/80'
                      }`}>
                        {lang === 'mr' ? '✓ खात्रीशीर ट्रॅव्हलर' : '✓ Verified Highway Guest'}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={3}>
          <div className="text-center">
            <a
              href="https://www.google.com/maps/search/?api=1&query=Aamrai+Resort+Shendre+Satara"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-amber-400 text-stone-950 font-bold text-xs sm:text-sm shadow-xl hover:bg-amber-300 transition-all hover:scale-105"
            >
              <ExternalLink size={16} />
              {lang === 'mr' ? 'गूगलवर सर्व रिव्ह्यूज पहा →' : 'Read All Google Reviews →'}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
