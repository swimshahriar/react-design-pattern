import { type ComponentType, useEffect, type ReactNode } from 'react'

function track(eventName: string, data?: Record<string, unknown>) {
  console.log(`[Analytics] ${eventName}`, data)
}

export function withAnalytics<P extends object>(
  Wrapped: ComponentType<P>,
  eventName: string,
) {
  function WithAnalytics(props: P) {
    useEffect(() => {
      track(eventName, { path: window.location.pathname })
    }, [])

    return <Wrapped {...props} />
  }

  WithAnalytics.displayName = `withAnalytics(${Wrapped.displayName ?? Wrapped.name ?? 'Component'})`
  return WithAnalytics
}

export function withFeatureFlag<P extends object>(
  flagKey: string,
  Treatment: ComponentType<P>,
  Control: ComponentType<P>,
) {
  return function WithFeatureFlag(props: P) {
    const enabled = flagKey === 'pricing_redesign_2025'
    return enabled ? <Treatment {...props} /> : <Control {...props} />
  }
}

export { track }