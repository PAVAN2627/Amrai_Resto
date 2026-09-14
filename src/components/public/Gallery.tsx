import { useState, useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { mockGalleryImages } from '@/lib/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const CATEGORIES_EN = ['All', 'Resort & Garden', 'Restaurant', 'Property', 'Events', 'Evening Ambience', 'Parking', 'EV Charging'];
const CATEGORIES_MR = ['सर्व', 'रिसॉर्ट व बाग', 'रेस्टॉरंट', 'वास्तू परिसर', 'इव्हेंट्स & लॉन', 'सायंकाळचे वातावरण', 'पार्किंग', 'ईव्ही चार्जिंग'];

export function Gallery() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);

  const images = useMemo(() => [...mockGalleryImages].sort((a, b) => a.sort_order - b.sort_order), []);

  const activeCategoryEn = CATEGORIES_EN[activeCategoryIndex];

  const filtered = activeCategoryEn === 'All' ? images : images.filter((img) => img.category === activeCategoryEn);

  const closeLightbox = () => setLightbox(null);
  const nextImage = () => setLightbox((prev) => (prev === null ? null : (prev + 1) % filtered.length));
  const prevImage = () => setLightbox((prev) => (prev === null ? null : (prev - 1 + filtered.length) % filtered.length));

  return (
    <section id="gallery" className={`section-padding relative overflow-hidden border-t transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#faf6f0] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Camera size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'फोटो गॅलरी' : 'Visual Resort Tour'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमराई रिसॉर्ट छायाचित्रे' : 'Resort Gallery'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'येण्यापूर्वी आमराई रिसॉर्टच्या परिसराची, रेस्टॉरंटची आणि लॉन्सची एक झलक पहा.'
              : 'Experience the pristine ambience, dining spaces, and event lawns before you arrive.'}
          </p>
        </Reveal>

        {/* Categories Pills */}
        <Reveal delay={1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {CATEGORIES_EN.map((catEn, idx) => {
              const label = lang === 'mr' ? CATEGORIES_MR[idx] : catEn;
              const isActive = activeCategoryIndex === idx;

              return (
                <button
                  key={catEn}
                  onClick={() => setActiveCategoryIndex(idx)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 shadow-lg scale-105'
                      : isDark
                      ? 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'
                      : 'bg-white text-stone-700 hover:bg-amber-100 border border-stone-300'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filtered.map((img, idx) => (
            <Reveal key={img.id} delay={((idx % 4) + 1) as 1 | 2 | 3 | 4}>
              <div
                onClick={() => setLightbox(idx)}
                className={`group relative rounded-2xl overflow-hidden cursor-pointer h-48 sm:h-64 shadow-xl border ${
                  isDark ? 'border-amber-400/20 hover:border-amber-400/70' : 'border-amber-200/80 hover:border-amber-400'
                }`}
              >
                <img
                  src={img.url}
                  alt={`Aamrai Resort ${img.category}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-stone-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                  <span className="px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold w-fit shadow">
                    {img.category}
                  </span>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightbox !== null && filtered[lightbox] && (
        <div className="fixed inset-0 z-50 bg-stone-950/95 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-stone-300 hover:text-white p-2 rounded-full bg-stone-900 border border-stone-800"
          >
            <X size={24} />
          </button>
          <button
            onClick={prevImage}
            className="absolute left-4 text-stone-300 hover:text-white p-3 rounded-full bg-stone-900 border border-stone-800"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextImage}
            className="absolute right-4 text-stone-300 hover:text-white p-3 rounded-full bg-stone-900 border border-stone-800"
          >
            <ChevronRight size={24} />
          </button>
          <div className="max-w-4xl max-h-[80vh] overflow-hidden rounded-2xl border border-amber-400/30">
            <img
              src={filtered[lightbox].url}
              alt="Aamrai Resort preview"
              className="w-full h-full object-contain max-h-[80vh]"
            />
          </div>
        </div>
      )}
    </section>
  );
}
