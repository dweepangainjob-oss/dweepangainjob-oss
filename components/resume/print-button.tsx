'use client'

import { Download } from 'lucide-react'
import { withBasePath } from '@/lib/site-path'

export function PrintButton() {
  return (
    <a
      href={withBasePath('/Dweepan_Gain_Resume.pdf')}
      download="Dweepan_Gain_Resume.pdf"
      className="inline-flex items-center gap-2 rounded-md bg-neutral-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-neutral-700"
    >
      <Download className="size-4" aria-hidden />
      Download PDF
    </a>
  )
}
