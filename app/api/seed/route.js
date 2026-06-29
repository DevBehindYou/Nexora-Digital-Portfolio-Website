import { NextResponse } from 'next/server';
import dbConnect from '@/lib/mongodb';
import { Hero, Service, Blog, CaseStudy, CTA, Ad, Stat } from '@/models';

export async function GET() {
  try {
    await dbConnect();

    // Hero
    await Hero.deleteMany({});
    await Hero.create({
      headline: 'Engineering\nDigital Excellence',
      subheadline: 'We craft world-class digital products',
      description: 'Nexora Digital transforms ambitious ideas into powerful digital experiences — from sleek web apps and AI-powered platforms to growth-focused brand strategies.',
      ctaPrimary: 'Start a Project',
      ctaPrimaryLink: '#contact',
      ctaSecondary: 'View Our Work',
      ctaSecondaryLink: '#case-studies',
      badge: '✦ Award-Winning Digital Agency',
      active: true,
    });

    // Services
    await Service.deleteMany({});
    await Service.insertMany([
      { title: 'Web Development', description: 'Full-stack applications built with Next.js, React and Node.js — fast, scalable, and SEO-optimised by design.', icon: 'code', features: ['Next.js & React', 'REST & GraphQL APIs', 'Performance optimisation', 'SSR / ISR / SSG'], order: 0 },
      { title: 'UI/UX Design', description: 'Human-centred design that balances aesthetic beauty with frictionless usability — from wireframes to polished design systems.', icon: 'design', features: ['Figma prototyping', 'Design systems', 'Accessibility (WCAG)', 'Motion & micro-interactions'], order: 1 },
      { title: 'AI Integration', description: 'Embed cutting-edge AI capabilities into your products — from LLM-powered features to intelligent automation pipelines.', icon: 'ai', features: ['LLM / RAG pipelines', 'Chatbots & agents', 'Computer vision', 'Predictive analytics'], order: 2 },
      { title: 'Digital Strategy', description: 'Data-driven growth strategies that align your digital roadmap with business goals and measurable KPIs.', icon: 'strategy', features: ['Market research', 'Competitive analysis', 'OKR frameworks', 'Growth hacking'], order: 3 },
      { title: 'Cloud Architecture', description: 'Resilient, cost-efficient cloud infrastructure designed for scale — from serverless micro-services to Kubernetes clusters.', icon: 'cloud', features: ['AWS / GCP / Azure', 'Kubernetes & Docker', 'CI/CD pipelines', 'Zero-downtime deploys'], order: 4 },
      { title: 'SEO & Growth', description: 'Technical SEO, content strategy and conversion optimisation that compound your organic growth month over month.', icon: 'seo', features: ['Technical SEO audits', 'Core Web Vitals', 'Content strategy', 'CRO & A/B testing'], order: 5 },
    ]);

    // Blogs
    await Blog.deleteMany({});
    await Blog.insertMany([
      { title: 'Glassmorphism in 2025: The Design Language Redefining Digital Interfaces', slug: 'glassmorphism-2025', excerpt: 'Explore how Apple-inspired frosted glass aesthetics have evolved from a trend into a mature design paradigm powering next-generation SaaS products.', content: 'Full article content here...', author: 'Aisha Patel', tags: ['Design', 'UI/UX', 'Trends'], readTime: '6 min read', published: true, publishedAt: new Date('2025-01-15'), coverColor: 'blue' },
      { title: 'Building AI-Native Products: A Technical Blueprint for Founders', slug: 'ai-native-products-blueprint', excerpt: 'A practical guide to embedding LLMs, vector search, and autonomous agents directly into your product architecture from day one.', content: 'Full article content here...', author: 'Marcus Chen', tags: ['AI', 'Engineering', 'Startups'], readTime: '9 min read', published: true, publishedAt: new Date('2025-01-08'), coverColor: 'purple' },
      { title: 'Next.js 14 App Router: Lessons from 50 Production Deployments', slug: 'nextjs14-app-router-lessons', excerpt: 'Hard-won insights on server components, streaming, caching strategies, and performance patterns from shipping dozens of production Next.js apps.', content: 'Full article content here...', author: 'Nexora Engineering', tags: ['Next.js', 'Performance', 'Engineering'], readTime: '11 min read', published: true, publishedAt: new Date('2024-12-22'), coverColor: 'cyan' },
    ]);

    // Case Studies
    await CaseStudy.deleteMany({});
    await CaseStudy.insertMany([
      {
        title: 'E-commerce Platform Redesign',
        client: 'LuxeMarket',
        industry: 'E-commerce',
        description: 'Complete redesign and re-architecture of a high-traffic fashion e-commerce platform serving 2M+ monthly visitors.',
        challenge: 'Outdated stack causing slow load times, high bounce rates, and a checkout flow converting at just 1.2%.',
        solution: 'Rebuilt on Next.js with edge caching, redesigned checkout in 3 steps, implemented personalisation engine.',
        results: 'Launched in 10 weeks. Checkout conversion tripled. Page speed improved by 68%. Revenue up $2.4M in first quarter.',
        stats: [{ label: 'Conversion Increase', value: '+340%' }, { label: 'Page Speed', value: '98/100' }, { label: 'Revenue Impact', value: '$2.4M' }, { label: 'Delivery', value: '10 Weeks' }],
        tags: ['E-commerce', 'Next.js', 'UX', 'Performance'],
        featured: true,
        accentColor: 'blue',
        active: true,
      },
      {
        title: 'SaaS Analytics Dashboard',
        client: 'DataPulse',
        industry: 'B2B SaaS',
        description: 'End-to-end design and development of a real-time analytics platform now used by 2,100+ enterprise teams worldwide.',
        challenge: 'Complex data sets with no coherent visualisation layer, resulting in poor adoption and high churn.',
        solution: 'Designed a modular dashboard system with customisable widgets, real-time WebSocket feeds, and AI-powered anomaly alerts.',
        results: 'Reduced churn from 14% to 3.2% within 6 months. NPS jumped from 22 to 71. Secured Series A funding.',
        stats: [{ label: 'Churn Reduction', value: '-77%' }, { label: 'NPS Score', value: '71' }, { label: 'Active Teams', value: '2,100+' }, { label: 'Time to Value', value: '< 5 min' }],
        tags: ['SaaS', 'Data Viz', 'React', 'WebSockets'],
        featured: true,
        accentColor: 'purple',
        active: true,
      },
      {
        title: 'AI-Powered Recruitment Platform',
        client: 'TalentFlow',
        industry: 'HR Tech',
        description: 'Built an AI-native hiring platform that automates CV screening, interview scheduling, and candidate ranking.',
        challenge: 'Manual recruiting processes consuming 40+ hours per hire with high risk of unconscious bias.',
        solution: 'RAG-based CV analysis, LLM-powered structured interviews, bias-detection layer, and an automated workflow engine.',
        results: 'Time-to-hire dropped from 43 days to 11 days. Client saves $180K/year in recruiter costs. 95% hiring manager satisfaction.',
        stats: [{ label: 'Time-to-Hire', value: '-74%' }, { label: 'Cost Savings', value: '$180K/yr' }, { label: 'Satisfaction', value: '95%' }, { label: 'Candidates Processed', value: '500K+' }],
        tags: ['AI', 'LLM', 'Automation', 'HR Tech'],
        featured: false,
        accentColor: 'cyan',
        active: true,
      },
    ]);

    // CTA
    await CTA.deleteMany({});
    await CTA.create({
      headline: "Ready to Build Something\nRemarkable?",
      subheadline: "Let's turn your vision into reality",
      description: "Partner with Nexora Digital to create digital experiences that captivate users, outperform competitors, and drive measurable growth.",
      primaryCta: 'Start Your Project',
      primaryCtaLink: '#contact',
      secondaryCta: 'Book a Free Audit',
      secondaryCtaLink: '#',
      badge: '⚡ Limited availability — Q2 2025',
      active: true,
    });

    // Ads
    await Ad.deleteMany({});
    await Ad.insertMany([
      { title: 'Launch Your MVP in 6 Weeks', description: 'Our rapid-build programme takes your idea from validated concept to live product — at a price designed for founders.', ctaText: 'See MVP Packages', ctaLink: '#', badge: '🚀 Founder Special', accentColor: 'purple', active: true, order: 0 },
      { title: 'Free Digital Audit Worth £2,000', description: 'Get a comprehensive review of your website performance, SEO health, and conversion funnel — completely free, no strings attached.', ctaText: 'Claim Free Audit', ctaLink: '#', badge: '🎁 Limited Offer', accentColor: 'cyan', active: true, order: 1 },
    ]);

    // Stats
    await Stat.deleteMany({});
    await Stat.insertMany([
      { label: 'Projects Delivered', value: '500', suffix: '+', order: 0 },
      { label: 'Client Satisfaction', value: '98', suffix: '%', order: 1 },
      { label: 'Years of Expertise', value: '12', suffix: '+', order: 2 },
      { label: 'Revenue Generated', value: '150', prefix: '$', suffix: 'M+', order: 3 },
    ]);

    return NextResponse.json({ success: true, message: 'Database seeded successfully!' });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
