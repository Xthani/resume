'use client'

import { motion, MotionProps } from 'framer-motion'
import { ReactNode, useEffect, useState } from 'react'

interface MotionWrapperProps extends MotionProps {
  children: ReactNode
  fallback?: ReactNode
}

export const MotionWrapper = ({ children, fallback, ...props }: MotionWrapperProps) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return fallback ? <>{fallback}</> : <>{children}</>
  }

  return <motion.div {...props}>{children}</motion.div>
}

export default MotionWrapper 