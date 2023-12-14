import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import '../globals.css'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Confirmação conta',
  description: 'Pagina para confirmar conta.',
}

export default function RegisterLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <ToastContainer theme='colored' />
      <body className={inter.className}>{children}</body>
    </html>
  )
}
