import HomeClient from '@/components/Home';
import { Suspense } from 'react';

export default function Home() {
  return (
    <Suspense fallback={null}>
      <HomeClient />
    </Suspense>
  );
}
