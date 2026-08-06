declare global {
  interface Window {
    __APP_CONFIG__?: {
      apiUrl?: string
    }
  }
}

const clientApiUrl = () => window.__APP_CONFIG__?.apiUrl || process.env.NEXT_PUBLIC_API_BACKEND || ''

// URL publik: aman disisipkan ke HTML yang dikirim ke browser (SSR maupun render klien).
export const apiUrl: string = typeof window !== 'undefined'
  ? clientApiUrl()
  : (process.env.API_URL || '')

// Hanya untuk panggilan HTTP yang dilakukan server sendiri (getServerSideProps),
// tidak pernah dirender ke HTML. Bisa memakai DNS internal cluster.
export const internalApiUrl: string = typeof window !== 'undefined'
  ? clientApiUrl()
  : (process.env.API_BACKEND_INTERNAL || process.env.API_URL || '')
