import { Navbar } from '@/components/public/Navbar';
import { Hero, CustomersCount } from '@/components/public/Hero';
import { About } from '@/components/public/About';
import { Experiences } from '@/components/public/Experiences';
import { TodaysSpecial } from '@/components/public/TodaysSpecial';
import { MenuSection } from '@/components/public/MenuSection';
import { Gallery } from '@/components/public/Gallery';
import { BarSection } from '@/components/public/BarSection';
import { EventsSection } from '@/components/public/EventsSection';
import { LodgingSection, EVParkingSection } from '@/components/public/LodgingEV';
import { Reviews } from '@/components/public/Reviews';
import { WhyChoose } from '@/components/public/WhyChoose';
import { Contact } from '@/components/public/Contact';
import { Footer } from '@/components/public/Footer';
import { MobileStickyBar } from '@/components/public/MobileStickyBar';
import { useTheme } from '@/context/ThemeContext';

export function PublicSite() {
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div className={`min-h-screen transition-colors duration-300 ${
      isDark ? 'bg-stone-950 text-[#fcf6e8]' : 'bg-[#faf6f0] text-[#23150c]'
    }`}>
      <Navbar />
      <Hero />
      <CustomersCount />
      <About />
      <Experiences />
      <TodaysSpecial />
      <MenuSection />
      <Gallery />
      <BarSection />
      <EventsSection />
      <LodgingSection />
      <EVParkingSection />
      <Reviews />
      <WhyChoose />
      <Contact />
      <Footer />
      <MobileStickyBar />
      <div className="h-14 lg:hidden" />
    </div>
  );
}
