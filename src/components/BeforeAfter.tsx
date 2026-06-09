import CodeBlock from './CodeBlock'

interface BeforeAfterProps {
  beforeCode: string
  afterCode: string
  beforeTitle?: string
  afterTitle?: string
  language?: string
  beforeLabel?: string
  afterLabel?: string
}

export default function BeforeAfter({
  beforeCode,
  afterCode,
  beforeTitle = 'before.tsx',
  afterTitle = 'after.tsx',
  language = 'tsx',
  beforeLabel = 'Before — Spaghetti',
  afterLabel = 'After — Pattern Applied',
}: BeforeAfterProps) {
  return (
    <div className="my-6 space-y-6">
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-500/20 text-red-400 border border-red-500/30">
            {beforeLabel}
          </span>
        </div>
        <CodeBlock code={beforeCode} language={language} title={beforeTitle} />
      </div>
      <div>
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
            {afterLabel}
          </span>
        </div>
        <CodeBlock code={afterCode} language={language} title={afterTitle} />
      </div>
    </div>
  )
}