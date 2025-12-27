import { ImageResponse } from 'next/og';

import { siteConfig } from '@/config/site';

export const runtime = 'edge';

export function GET() {
  return new ImageResponse(
    <div
      style={{
        height: '100%',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'white',
        backgroundImage: 'linear-gradient(120deg, #d4fc79 0%, #96e6a1 100%)',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          padding: '40px 80px',
          borderRadius: '20px',
          boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        }}
      >
        <div
          style={{
            fontSize: 60,
            fontWeight: 900,
            background: 'linear-gradient(to right, #0F2027, #203A43, #2C5364)',
            backgroundClip: 'text',
            color: 'transparent',
            marginBottom: 20,
          }}
        >
          {siteConfig.name}
        </div>
        <div
          style={{
            fontSize: 30,
            fontWeight: 400,
            color: '#374151',
            textAlign: 'center',
            maxWidth: 800,
          }}
        >
          {siteConfig.description.slice(0, 100)}...
        </div>
      </div>
    </div>,
    {
      width: 1200,
      height: 630,
    },
  );
}
