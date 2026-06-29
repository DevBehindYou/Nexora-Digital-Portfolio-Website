import './globals.css';

export const metadata = {
  title: 'Nexora Digital — Engineering Digital Excellence',
  description: 'Award-winning digital agency specialising in web development, UI/UX design, AI integration and digital strategy.',
  keywords: 'digital agency, web development, UI/UX design, AI integration, SEO, Next.js',
  openGraph: {
    title: 'Nexora Digital',
    description: 'Engineering Digital Excellence',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="antialiased">{children}</body>
    </html>
  );
}
