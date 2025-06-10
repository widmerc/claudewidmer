'use client';

import dynamic from 'next/dynamic';
import { useState } from 'react';
import PageWrapper from "@/app/_components/PageWrapper";

const CVMap = dynamic(() => import('./CVMap'), { ssr: false });

export default function CV() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  return (
    <PageWrapper>
      <CVMap hoveredId={hoveredId} setHoveredId={setHoveredId} />
    </PageWrapper>
  );
}
