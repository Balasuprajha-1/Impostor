import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Word Impostor Game',
  description: 'Play the Word Impostor game with your colleagues',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-950 text-gray-50">
        {children}
      </body>
    </html>
  )
}
