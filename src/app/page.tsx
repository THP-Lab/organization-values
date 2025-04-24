"use client";

import dynamic from 'next/dynamic';

// Import the client component dynamically with ssr: false
const ClientPage = dynamic(() => import('./client-page'), { ssr: false });

export default function Home() {
  return <ClientPage />;
}
