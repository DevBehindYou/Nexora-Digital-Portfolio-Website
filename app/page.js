import dbConnect from '@/lib/mongodb';
import { Hero, Service, Blog, CaseStudy, CTA, Ad, Stat } from '@/models';
import Navigation        from '@/components/Navigation';
import AnimatedBackground from '@/components/AnimatedBackground';
import HeroSection        from '@/components/sections/HeroSection';
import ServicesSection    from '@/components/sections/ServicesSection';
import StatsSection       from '@/components/sections/StatsSection';
import CaseStudiesSection from '@/components/sections/CaseStudiesSection';
import BlogsSection       from '@/components/sections/BlogsSection';
import AdsSection         from '@/components/sections/AdsSection';
import CTASection         from '@/components/sections/CTASection';
import ContactSection     from '@/components/sections/ContactSection';
import Footer             from '@/components/sections/Footer';

function serialize(data) { return JSON.parse(JSON.stringify(data)); }

export const revalidate = 60;

export default async function HomePage() {
  let data = { hero:null, services:[], blogs:[], caseStudies:[], cta:null, ads:[], stats:[] };
  try {
    await dbConnect();
    const [hero, services, blogs, caseStudies, cta, ads, stats] = await Promise.all([
      Hero.findOne({ active:true }).sort({ updatedAt:-1 }).lean(),
      Service.find({ active:true }).sort({ order:1 }).lean(),
      Blog.find({ published:true }).sort({ publishedAt:-1 }).limit(3).lean(),
      CaseStudy.find({ active:true }).sort({ createdAt:-1 }).limit(3).lean(),
      CTA.findOne({ active:true }).lean(),
      Ad.find({ active:true }).sort({ order:1 }).lean(),
      Stat.find({ active:true }).sort({ order:1 }).lean(),
    ]);
    data = serialize({ hero, services, blogs, caseStudies, cta, ads, stats });
  } catch (err) {
    console.error('DB fetch error (using fallback data):', err.message);
  }

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <div className="noise-overlay" aria-hidden="true"/>
      <AnimatedBackground/>
      <Navigation/>
      <HeroSection        data={data.hero}/>
      <ServicesSection    data={data.services}/>
      <StatsSection       data={data.stats}/>
      <CaseStudiesSection data={data.caseStudies}/>
      <BlogsSection       data={data.blogs}/>
      <AdsSection         data={data.ads}/>
      <CTASection         data={data.cta}/>
      <ContactSection/>
      <Footer/>
    </main>
  );
}
