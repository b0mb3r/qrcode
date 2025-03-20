import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  title: 'Gerador de QR Code',
  description:
    'Totalmente gratuito, sem truques, sem período de teste, sem necessidade de login. Apenas um gerador de QR Code livre para você usar quando quiser!',
}

const montserrat = Montserrat({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
