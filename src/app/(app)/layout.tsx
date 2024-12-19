import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "../globals.css"

import Header from "@/components/Layout/Header"
import Footer from "@/components/Layout/Footer"
import SessionWrapper from "@/components/session/session-wrapper"
import Modal from "@/components/Modals/LogoInfoModal"
import TanstackProvider from "@/components/providers/tanstack-provider"
import { Notification } from "@/components/notification"
import { siteConfig } from "@/config/site"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionWrapper>
      <TanstackProvider>
        <html lang="en" data-theme="light">
          <body className={`${inter.className}`}>
            <div className="grid min-h-dvh grid-rows-[auto_1fr_auto]">
              <Header />
              <main>
                {children}
              </main>
              <Footer />
            </div>
            <Notification />
            <Modal />
          </body>
        </html>
      </TanstackProvider>
    </SessionWrapper>
  )
}
