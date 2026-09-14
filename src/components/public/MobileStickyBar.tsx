import { Utensils, Phone, MessageCircle, MapPin } from 'lucide-react';
import { BUSINESS_INFO, WHATSAPP_BASE, MARATHI_LABELS } from '@/lib/constants';
import { useLanguage } from '@/context/LanguageContext';

export function MobileStickyBar() {
  const { lang } = useLanguage();

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-stone-950/95 backdrop-blur-lg border-t border-amber-400/20 px-2 py-2 flex items-center gap-1.5 shadow-2xl">
      <a
        href="#menu"
        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-stone-900 text-amber-100 text-xs font-bold border border-amber-400/20 active:scale-95 transition-transform"
      >
        <Utensils size={14} className="text-amber-400" /> {lang === 'mr' ? 'मेनू' : 'Menu'}
      </a>

      <a
        href={`tel:${BUSINESS_INFO.phones[0]}`}
        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-stone-800 text-amber-100 text-xs font-bold border border-amber-400/20 active:scale-95 transition-transform"
      >
        <Phone size={14} className="text-amber-400" /> {lang === 'mr' ? 'कॉल' : 'Call'}
      </a>

      <a
        href={`${WHATSAPP_BASE}${BUSINESS_INFO.phones[0]}?text=${encodeURIComponent('Hello Aamrai Resort, I would like to enquire.')}`}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-emerald-600 text-white text-xs font-bold active:scale-95 transition-transform shadow-md"
      >
        <MessageCircle size={14} /> {lang === 'mr' ? 'बुकिंग' : 'Book'}
      </a>

      <a
        href={BUSINESS_INFO.mapsLink}
        target="_blank"
        rel="noopener noreferrer"
        className="flex-1 flex items-center justify-center gap-1 py-2.5 rounded-xl bg-amber-400 text-stone-950 text-xs font-bold active:scale-95 transition-transform shadow-md"
      >
        <MapPin size={14} /> {lang === 'mr' ? 'मॅप' : 'Map'}
      </a>
    </div>
  );
}


