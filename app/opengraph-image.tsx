import { ImageResponse } from 'next/og'
import { portfolio } from '@/lib/portfolio-config'

export const alt = `${portfolio.name} — ${portfolio.role}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'
export const dynamic = 'force-static'

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: 58,
          color: '#e7f4f3',
          backgroundColor: '#0b171a',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div
            style={{
              width: 62,
              height: 62,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 12,
              border: '2px solid #36d7c1',
              color: '#36d7c1',
              fontSize: 28,
              fontWeight: 700,
            }}
          >
            DG
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 5 }}>
            <span style={{ color: '#81a7a8', fontSize: 17 }}>dweepan@portfolio: ~</span>
            <span style={{ color: '#9edc70', fontSize: 15 }}>● OPEN TO OPPORTUNITIES</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 15 }}>
          <div style={{ color: '#36d7c1', fontSize: 22 }}>AI ENGINEER · FULL-STACK DEVELOPER</div>
          <div style={{ fontSize: 72, fontWeight: 700, lineHeight: 1.05 }}>{portfolio.name}</div>
          <div style={{ color: '#b8ccce', fontSize: 25, maxWidth: 900 }}>{portfolio.tagline}</div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: '#81a7a8', fontSize: 18 }}>Python · AI/ML · React · FastAPI</span>
          <span style={{ color: '#36d7c1', fontFamily: 'monospace', fontSize: 18 }}>portfolio.sh</span>
        </div>
      </div>
    ),
    size,
  )
}
