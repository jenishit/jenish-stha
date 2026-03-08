import type { Metadata } from 'next';
import '../styles/globals.css';

export const metadata: Metadata = {
  title: 'Jenish | Developer Portfolio',
  description: 'Jenish - developer portfolio, projects, AI experiments, and interactive web creations.',
  authors: [{ name: 'Jenish', url: 'https://sjenish.com.np' }],
  openGraph: {
    title: 'Jenish | Developer Portfolio',
    description: 'Jenish - developer portfolio, projects, AI experiments, and interactive web creations.',
    url: 'https://sjenish.com.np',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#0B0F1A] text-[#E5E7EB]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Jenish",
              url: "https://sjenish.com.np",
              jobTitle: "Developer",
              sameAs: [
                "https://github.com/jenishit",
                "https://linkedin.com/in/heyjenish",
                "https://instagram.com/shades_of_shrestha"
              ],
              knowsAbout: [
                "Web Development",
                "Artificial Intelligence",
                "Interactive Websites"
              ]
            })
          }}
        />
        {children}
      </body>
    </html>
  );
}
