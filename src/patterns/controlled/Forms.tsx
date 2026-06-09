import { useState, useRef } from 'react'

export function ControlledForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  if (submitted) {
    return (
      <div className="text-center py-3">
        <div className="text-2xl mb-1">&#10003;</div>
        <p className="text-green-400 font-medium">Submitted!</p>
        <p className="text-xs text-surface-500 mt-1">{email} / {'*'.repeat(password.length)}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-surface-400 mb-1">Email (controlled)</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm text-surface-400 mb-1">Password (controlled)</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="Enter password"
        />
      </div>
      <p className="text-xs text-surface-500">
        Live values: <span className="text-accent-400">{email || '...'}</span> / <span className="text-accent-400">{password ? '•'.repeat(password.length) : '...'}</span>
      </p>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-accent-600 hover:bg-accent-500 text-white text-sm font-medium transition-colors"
      >
        Submit
      </button>
    </form>
  )
}

export function UncontrolledForm() {
  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const [submitted, setSubmitted] = useState(false)
  const [submittedData, setSubmittedData] = useState({ email: '', password: '' })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmittedData({
      email: emailRef.current?.value ?? '',
      password: passwordRef.current?.value ?? '',
    })
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2000)
  }

  if (submitted) {
    return (
      <div className="text-center py-3">
        <div className="text-2xl mb-1">&#10003;</div>
        <p className="text-yellow-400 font-medium">Submitted!</p>
        <p className="text-xs text-surface-500 mt-1">{submittedData.email} / {'*'.repeat(submittedData.password.length)}</p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-sm text-surface-400 mb-1">Email (uncontrolled)</label>
        <input
          ref={emailRef}
          defaultValue=""
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="you@example.com"
        />
      </div>
      <div>
        <label className="block text-sm text-surface-400 mb-1">Password (uncontrolled)</label>
        <input
          ref={passwordRef}
          type="password"
          defaultValue=""
          className="w-full px-3 py-2 rounded-lg bg-surface-800 border border-surface-600 text-white focus:border-accent-500 outline-none text-sm"
          placeholder="Enter password"
        />
      </div>
      <p className="text-xs text-surface-500">
        Values are only accessible via refs — parent doesn't track changes live.
      </p>
      <button
        type="submit"
        className="px-4 py-2 rounded-lg bg-surface-700 hover:bg-surface-600 text-white text-sm font-medium transition-colors"
      >
        Submit
      </button>
    </form>
  )
}