import './globals.css'
import { AuthProvider } from '@/lib/auth-context'
import { ToastProvider } from '@/lib/toast-context'
import { ThemeProvider } from '@/lib/theme-context'
import AppShell from '@/components/AppShell'

export const metadata = {
  title: 'CoeurSolidaire - Gestion de Banque Alimentaire',
  description: 'Application de gestion pour associations de banque alimentaire et aide sociale',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <AuthProvider>
            <ToastProvider>
              <AppShell>
                {children}
              </AppShell>
            </ToastProvider>
          </AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
