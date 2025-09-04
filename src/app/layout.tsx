import './globals.css';
import type { Metadata } from 'next';
import { Inter, Fraunces } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});
const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Kalahari Database',
  description: 'Botswana Kalahari: papers, projects, people, places',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${fraunces.variable}`} suppressHydrationWarning>
      <head>
        {/* Set dark class before hydration to avoid flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
(function(){
  try {
    var saved = localStorage.getItem('kalahari-theme');
    var dark = saved ? saved === 'dark' : false;
    if (dark) document.documentElement.classList.add('dark');
    else document.documentElement.classList.remove('dark');
  } catch(_) {}
})();
`,
          }}
        />
      </head>
      <body className="font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
