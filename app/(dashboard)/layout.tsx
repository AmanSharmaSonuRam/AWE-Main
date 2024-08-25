'use client'
import DashboardHeader from "@/components/backend/DashboardHeader"
import DashboardSidebar from "@/components/backend/DashboardSidebar"
import { ApolloProvider } from "@apollo/client";
import client from "@/ApolloClient/apolloClient";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <ApolloProvider client={client}>
      <body >
        <DashboardHeader />
        <div className='mt-[50px] flex scrollbar'>
          <DashboardSidebar />
          {children}
        </div>
      </body>
      </ApolloProvider>
    </html>
  )
}
