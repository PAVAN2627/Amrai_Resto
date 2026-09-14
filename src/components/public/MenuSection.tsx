import { useState, useMemo } from 'react';
import { Reveal } from '@/components/Reveal';
import { Flame, Star, Leaf, Drumstick, Utensils } from 'lucide-react';
import { mockMenuItems } from '@/lib/mockData';
import { formatCurrency } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';

const MENU_CATEGORIES_EN = ['All', 'Veg', 'Non-Veg', 'Starters', 'Main Course', 'Rice', 'Biryani', 'Roti / Bread', 'Chinese', 'Beverages', 'Specials'];
const MENU_CATEGORIES_MR = ['सर्व', 'शाकाहारी', 'मांसाहारी', 'स्टार्टर्स', 'मुख्य जेवण', 'भात / राईस', 'बिरयानी', 'रोटी / नान', 'चायनीज', 'पेये', 'खास पदार्थ'];

export function MenuSection() {
  const { lang } = useLanguage();
  const { theme } = useTheme();
  const isDark = theme === 'dark';
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);

  const items = useMemo(() => mockMenuItems.filter((i) => i.is_available && !i.is_bar_item).sort((a, b) => a.sort_order - b.sort_order), []);

  const activeCategoryEn = MENU_CATEGORIES_EN[activeCategoryIndex];

  const filtered = activeCategoryEn === 'All'
    ? items
    : activeCategoryEn === 'Veg'
    ? items.filter((i) => i.is_veg)
    : activeCategoryEn === 'Non-Veg'
    ? items.filter((i) => !i.is_veg)
    : items.filter((i) => i.category === activeCategoryEn);

  const mrDishes: Record<string, { nameMr: string; descMr: string }> = {
    'm1': { nameMr: 'पनीर टिक्का', descMr: 'तंदूरमध्ये फ्राय केलेले मसालेदार मऊ पनीर टिक्का' },
    'm2': { nameMr: 'सातारा मटण हंडी', descMr: 'अस्सल सातारकर पद्धतीने शिजवलेले झणझणीत मटण' },
    'm3': { nameMr: 'चिकन टिक्का', descMr: 'तंदूर मसाल्यामध्ये मॅरीनेट केलेले मऊ चिकन पीसेस' },
    'm4': { nameMr: 'सोलकढी', descMr: 'ताजी कोकम आणि नारळाच्या दुधापासून बनवलेली ताजी सोलकढी' },
    'm5': { nameMr: 'चिकन बिरयानी', descMr: 'सुगंधी बासमती तांदूळ व मसालेदार चिकन बिरयानी' },
    'm6': { nameMr: 'व्हेज बिरयानी', descMr: 'मसालेदार भाज्या आणि सुगंधी बासमती तांदूळ बिरयानी' },
    'm7': { nameMr: 'बटर चिकन', descMr: 'मलाईदार आणि गोड-तिखट टोमॅटो ग्रॅव्हीमध्ये बटर चिकन' },
    'm8': { nameMr: 'पनीर बटर मसाला', descMr: 'मलाईदार टोमॅटो ग्रॅव्हीमधील चमचमीत पनीर बटर मसाला' },
    'm9': { nameMr: 'सातारा स्पेशल व्हेज थाळी', descMr: '२ भाज्या, भाकरी/चपाती, डाळ फ्राय, भात, सोलकढी व गोड पदार्थ' },
    'm10': { nameMr: 'सातारा स्पेशल मटण थाळी', descMr: 'मटण सुक्का, तांबडा रस्सा, पांढरा रस्सा, भाकरी व इंद्रायणी भात' },
    'm11': { nameMr: 'बटर नान', descMr: 'तंदूरमध्ये भाजलेली मऊ बटर नान' },
    'm12': { nameMr: 'व्हेज मंचुरियन', descMr: 'चायनीज मसाल्यामधील क्रिस्पी व्हेज मंचुरियन' },
    'm13': { nameMr: 'गुलाब जामून', descMr: 'मऊ आणि साखरेच्या पाकातील गरमागरम गुलाब जामून' },
    'm14': { nameMr: 'चिकन ६५', descMr: 'कढीपत्ता आणि हिरव्या मिरचीचा तडका दिलेले चिकन ६५' },
    'm15': { nameMr: 'मसाला चहा', descMr: 'सुगंधी मसाल्यांचा गरमागरम चहा' },
  };

  return (
    <section id="menu" className={`section-padding relative overflow-hidden transition-colors duration-300 border-t ${
      isDark ? 'bg-stone-950 text-amber-50 border-amber-400/10' : 'bg-[#fdfcf7] text-stone-900 border-amber-200/80'
    }`}>
      <div className="container-max relative z-10">
        <Reveal className="text-center mb-10 sm:mb-14">
          <div className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-3 border ${
            isDark ? 'bg-amber-400/10 border-amber-400/30 text-amber-300' : 'bg-amber-100 border-amber-300 text-amber-900'
          }`}>
            <Utensils size={14} className={isDark ? 'text-amber-400' : 'text-amber-700'} />
            <span>{lang === 'mr' ? 'अस्सल मेजवानी मेनू' : 'Authentic Restaurant Menu'}</span>
          </div>
          <h2 className={`font-serif text-4xl sm:text-5xl lg:text-6xl mb-3 font-bold ${
            isDark ? 'text-amber-50' : 'text-stone-900'
          }`}>
            {lang === 'mr' ? 'आमचा विशेष मेनू' : 'Our Dining Menu'}
          </h2>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${
            isDark ? 'text-stone-300/80' : 'text-stone-600'
          }`}>
            {lang === 'mr'
              ? 'ताजे साहित्य आणि अस्सल सातारकर मसाल्यांनी तयार केलेले शाकाहारी व मांसाहारी चवदार पदार्थ.'
              : 'A curated selection of vegetarian and non-vegetarian Satara specialties prepared fresh daily.'}
          </p>
        </Reveal>

        {/* Category Pills */}
        <Reveal delay={1}>
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MENU_CATEGORIES_EN.map((catEn, index) => {
              const label = lang === 'mr' ? MENU_CATEGORIES_MR[index] : catEn;
              const isActive = activeCategoryIndex === index;

              return (
                <button
                  key={catEn}
                  onClick={() => setActiveCategoryIndex(index)}
                  className={`px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all duration-300 ${
                    isActive
                      ? 'bg-amber-400 text-stone-950 shadow-lg scale-105'
                      : isDark
                      ? 'bg-stone-900 text-stone-300 hover:bg-stone-800 border border-amber-400/20'
                      : 'bg-stone-100 text-stone-700 hover:bg-stone-200 border border-stone-300'
                  }`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Menu Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((item, i) => {
            const mrInfo = mrDishes[item.id];
            const name = lang === 'mr' && mrInfo ? mrInfo.nameMr : item.name;
            const desc = lang === 'mr' && mrInfo ? mrInfo.descMr : item.description;

            return (
              <Reveal key={item.id} delay={((i % 3) + 1) as 1 | 2 | 3}>
                <div className={`group rounded-2xl overflow-hidden card-hover shadow-xl flex flex-col justify-between h-full border ${
                  isDark
                    ? 'bg-stone-900 border-amber-400/20 hover:border-amber-400/60'
                    : 'bg-white border-amber-200/80 hover:border-amber-400 shadow-md'
                }`}>
                  <div>
                    <div className="relative h-52 overflow-hidden">
                      <img
                        src={item.image_url}
                        alt={name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${
                        isDark ? 'from-stone-950 via-stone-950/20' : 'from-stone-900/80 via-transparent'
                      } to-transparent`} />
                      
                      {/* Veg / Non-Veg Indicator */}
                      <div className="absolute top-3 left-3 flex gap-2">
                        <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-full text-[11px] font-bold ${
                          item.is_veg ? 'bg-emerald-600 text-white' : 'bg-red-700 text-white'
                        }`}>
                          {item.is_veg ? (lang === 'mr' ? '● शाकाहारी' : '● Veg') : (lang === 'mr' ? '▲ मांसाहारी' : '▲ Non-Veg')}
                        </span>
                      </div>

                      {/* Special Badges */}
                      <div className="absolute top-3 right-3 flex gap-1.5">
                        {item.is_special && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-md">
                            <Star size={11} className="fill-stone-950" /> {lang === 'mr' ? 'खास' : 'Special'}
                          </span>
                        )}
                        {item.is_featured && (
                          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-orange-600 text-white text-xs font-bold shadow-md">
                            <Flame size={11} /> {lang === 'mr' ? 'लोकप्रिय' : 'Popular'}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="p-5">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className={`font-serif text-xl sm:text-2xl font-bold transition-colors ${
                          isDark ? 'text-amber-100 group-hover:text-amber-300' : 'text-stone-900 group-hover:text-amber-800'
                        }`}>
                          {name}
                        </h3>
                        <span className={`font-serif text-xl font-bold whitespace-nowrap ml-2 ${
                          isDark ? 'text-amber-400' : 'text-amber-700'
                        }`}>
                          {formatCurrency(item.price)}
                        </span>
                      </div>
                      <p className={`text-xs sm:text-sm leading-relaxed ${
                        isDark ? 'text-stone-300/70' : 'text-stone-600'
                      }`}>{desc}</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-stone-400/60 py-12">
            {lang === 'mr' ? 'या प्रकारात सध्या पदार्थ उपलब्ध नाहीत.' : 'No items found in this category.'}
          </p>
        )}
      </div>
    </section>
  );
}
