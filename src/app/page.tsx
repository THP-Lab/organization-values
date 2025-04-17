"use client";

import dynamic from 'next/dynamic';

// Importez le composant client de manière dynamique avec ssr: false
const ClientPage = dynamic(() => import('./client-page'), { ssr: false });

export default function Home() {
  return <ClientPage />;
}
