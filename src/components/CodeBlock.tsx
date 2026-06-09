import { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'
import 'prismjs/themes/prism-tomorrow.css'

interface CodeBlockProps {
  code: string
  language?: string
  title?: string
  showLineNumbers?: boolean
}

export default function CodeBlock({
  code,
  language = 'tsx',
  title,
  showLineNumbers = true,
}: CodeBlockProps) {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      Prism.highlightAll()
    }
  }, [code, language])

  const handleClickCopy = async () => {
    await navigator.clipboard.writeText(code)
  }

  return (
    <div className="rounded-xl overflow-hidden border border-surface-700 my-4">
      {title && (
        <div className="flex items-center justify-between bg-surface-800 px-4 py-2 border-b border-surface-700">
          <span className="text-sm font-mono text-surface-400">{title}</span>
          <button
            onClick={handleClickCopy}
            className="text-xs text-surface-400 hover:text-accent-400 transition-colors cursor-pointer"
          >
            Copy
          </button>
        </div>
      )}
      <pre className={`!m-0 !rounded-none !bg-surface-900 !p-4 overflow-x-auto ${showLineNumbers ? 'line-numbers' : ''}`}>
        <code className={`language-${language}`}>{code.trim()}</code>
      </pre>
    </div>
  )
}