import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    dirs: ['src/app', 'src/components'],
  },
  images: {
    domains: ['lh3.googleusercontent.com', 'ysvesegmxbtcjgivpwkl.supabase.co', 'touzjmfqvuprgzzahbvc.supabase.co'],
  },
}

export default nextConfig

