import './globals.css';
import type { Metadata } from 'next';
// Fix: Import React to resolve 'Cannot find namespace React' for React.ReactNode
import React from 'react';

export const metadata: Metadata = {
  title: "Blanket's Hotstudio | 프리미엄 로블록스 개발",
  description: '최고 수준의 로블록스 시스템 및 UI/UX 개발 커미션',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="stylesheet" as="style" crossOrigin="anonymous" href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css" />
      </head>
      <body className="bg-black text-white selection:bg-brand/30">
        {children}
      </body>
    </html>
  );
}