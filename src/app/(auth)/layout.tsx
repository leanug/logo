import type { Metadata } from "next"
import "../globals.css"
import { Inter } from "next/font/google"

import SessionWrapper from "@/components/Session/session-wrapper"
import GoBackBtn from "@/components/UI/Buttons/GoBack"
import { Notification } from "@/components/Notification"

export const metadata: Metadata = {
  title: "Login - FeedbackRealm",
  description: `
    Gather and prioritize user feedback to enhance your 
    web app with features that matter most to your audience.
  `,
}

const inter = Inter({ subsets: ["latin"] });

interface LayoutProps {
  children: React.ReactNode
}

export default async function Layout({ children }: LayoutProps) {
  return (
    <SessionWrapper>
      <html lang="en" data-theme="light">
        <body className={`${inter.className} bg-base-300 relative`}>
          <div className="absolute sm:top-4 top-2.5 left-2.5 sm:left-4"><GoBackBtn /></div>
          <div className="h-full">
            <div className="flex flex-col min-h-screen">
              <main className="flex-1">
                {children}
              </main>
              <Notification />
            </div>
          </div>
        </body>
      </html>
    </SessionWrapper>
  )
}
