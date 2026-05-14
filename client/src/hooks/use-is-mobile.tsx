import * as React from "react"

const MOBILE_BREAKPOINT = 481
const TABLET_BREAKPOINT = 768
const DESKTOP_BREAKPOINT = 1024

export function useIsMobile() {
  const [isMobile, setIsMobile] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsMobile(window.innerWidth < MOBILE_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isMobile
}

export function useDeviceSize() {
  const [deviceSize, setDeviceSize] = React.useState<'mobile' | 'tablet' | 'desktop' | undefined>(undefined)

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < MOBILE_BREAKPOINT) {
        setDeviceSize('mobile')
      } else if (window.innerWidth < TABLET_BREAKPOINT) {
        setDeviceSize('tablet')
      } else if (window.innerWidth < DESKTOP_BREAKPOINT) {
        setDeviceSize('tablet')
      } else {
        setDeviceSize('desktop')
      }
    }

    handleResize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return deviceSize
}

export function useIsSmallScreen() {
  const [isSmallScreen, setIsSmallScreen] = React.useState<boolean | undefined>(undefined)

  React.useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${TABLET_BREAKPOINT - 1}px)`)
    const onChange = () => {
      setIsSmallScreen(window.innerWidth < TABLET_BREAKPOINT)
    }
    mql.addEventListener("change", onChange)
    setIsSmallScreen(window.innerWidth < TABLET_BREAKPOINT)
    return () => mql.removeEventListener("change", onChange)
  }, [])

  return !!isSmallScreen
}
