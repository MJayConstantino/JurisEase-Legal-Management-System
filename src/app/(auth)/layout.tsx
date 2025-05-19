import { sessionExists } from '@/utils/supabase/server'

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  await sessionExists()
  return (
    <>
      <main>{children}</main>
    </>
  )
}
