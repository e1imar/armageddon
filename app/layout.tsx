import Link from 'next/link'
import './globals.css'
import css from './layout.module.css'
import type { Metadata } from 'next'
import { Passion_One } from 'next/font/google'

const passion = Passion_One({
  subsets: ['latin'],
  weight: '400'
})

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
      <body>
        <header className={css.header}>
          <h1 className={`${passion.className} ${css.h1}`}><Link href='/'>armageddon 2023</Link></h1>
          <p>ООО “Команда им. Б. Уиллиса”.</p>
          <p>Взрываем астероиды с 1998 года.</p>
        </header>
        <main className={css.main}>
          {children}
        </main>
        <footer>© Все права и планета защищены</footer>
      </body>
    </html>
  )
}
