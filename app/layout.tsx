import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Basket from './Basket'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Armageddon 2023',
  description: 'Взрываем астероиды с 1998 года',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          <h1>armageddon 2023</h1>
          <p>ООО "Команда им. Б. Уиллиса".</p>
          <p>Взрываем астериоды с 1998 года.</p>
        </header>
        <main>
          {children}
          <Basket/>
        </main>
        <footer>© Все права и планета защищены</footer>
      </body>
    </html>
  )
}
