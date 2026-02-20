import type { Metadata } from 'next';
import { DM_Sans, Playfair_Display } from 'next/font/google';
import '@/index.css';
import { Providers } from '@/components/Providers';

const dmSans = DM_Sans({
    subsets: ['latin'],
    variable: '--font-body',
});

const playfair = Playfair_Display({
    subsets: ['latin'],
    variable: '--font-display',
});

export const metadata: Metadata = {
    title: 'Airy Aim',
    description: 'Airy Aim application',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body className={`${dmSans.variable} ${playfair.variable} font-body antialiased`}>
                <Providers>{children}</Providers>
            </body>
        </html>
    );
}
