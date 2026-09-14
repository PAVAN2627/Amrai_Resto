export const BUSINESS_INFO = {
  name: 'Aamrai Resort',
  nameMarathi: 'आमराई रिसॉर्ट',
  presentedBy: 'Meghdoot Hotels & Services',
  presentedByMarathi: 'मेघदूत हॉटेल्स & सर्व्हिसेस',
  logo: '/logo.png',
  tagline: "Nature's Escape on the NH4 Highway",
  taglineMarathi: 'पुणे-बंगळुरु महामार्गावरील निसर्गरम्य हक्काचे ठिकाण',
  location: 'NH 4, Pune-Bangalore Highway, Near Shendre Phata',
  locationMarathi: 'एन.एच. ४, पुणे-बंगळुरु हायवे, शेंद्रे फाटा जवळ',
  city: 'Satara, Maharashtra, India',
  cityMarathi: 'सातारा, महाराष्ट्र',
  pincode: '415002',
  phones: ['7030906868', '7030926868'],
  lodgingPhone: '7888047149',
  email: 'amruta9762@gmail.com',
  hours: '11:00 AM – 11:30 PM (Open 7 Days)',
  hoursMarathi: 'सकाळी ११:०० ते रात्री ११:३० (रोज उघडे)',
  rating: 3.9,
  reviewsCount: '2,000+',
  customersServed: '2,500+',
  mapsLink: 'https://www.google.com/maps/search/?api=1&query=Aamrai+Resort+Shendre+Satara',
  instagramLink: 'https://www.instagram.com/explore/tags/amrairesort/',
  specialties: ['Satara Mutton Handi', 'Chicken Tandoor', 'Authentic Veg & Non-Veg Thalis', 'Solkadhi', 'Paneer Butter Masala'],
};

export const MARATHI_LABELS = {
  home: 'मुख्य पान',
  about: 'आमच्याबद्दल',
  experiences: 'वैशिष्ट्ये',
  menu: 'मेनू कार्ड',
  gallery: 'गॅलरी',
  events: 'कार्यक्रम व लॉन्स',
  contact: 'संपर्क',
  exploreMenu: 'मेनू पहा',
  whatsappBook: 'व्हॉट्सॲप चौकशी',
  getDirections: 'मॅप दिशा',
  callNow: 'कॉल करा',
  staffLogin: 'स्टाफ लॉगिन',
};

export const WHATSAPP_BASE = 'https://wa.me/';

export function formatWhatsAppMobile(mobile: string): string {
  const digits = mobile.replace(/\D/g, '');
  if (digits.length === 10) return `91${digits}`;
  if (digits.length === 12 && digits.startsWith('91')) return digits;
  return digits;
}

export function formatCurrency(amount: number): string {
  return `₹${amount.toLocaleString('en-IN', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`;
}

export function formatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
}

export function formatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', hour12: true });
}

export function formatDateTime(date: string | Date): string {
  return `${formatDate(date)} • ${formatTime(date)}`;
}

export function validateIndianMobile(mobile: string): boolean {
  return /^[6-9]\d{9}$/.test(mobile.replace(/\s/g, ''));
}

export function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good Morning';
  if (hour < 17) return 'Good Afternoon';
  if (hour < 20) return 'Good Evening';
  return 'Good Night';
}
