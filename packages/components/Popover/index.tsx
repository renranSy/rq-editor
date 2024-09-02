import React, { CSSProperties, ReactNode, useRef } from 'react'
import './index.less'

type Props = {
  children: ReactNode
  content: string
  position?: 'top' | 'bottom' | 'left' | 'right'
  offset?: number
}

const Popover: React.FC<Props> = ({ content, children, position = 'top', offset = 4 }) => {
  const popBoxRef = useRef<HTMLDivElement>(null)

  const show = () => {
    if (!popBoxRef.current || !content) {
      return
    }
    popBoxRef.current.style.opacity = '1'
  }

  const hide = () => {
    if (!popBoxRef.current) {
      return
    }
    popBoxRef.current.style.opacity = '0'
  }

  const getStyle = (value: string): React.CSSProperties => {
    const styles: CSSProperties = {}

    switch (value) {
      case 'top':
        styles.left = '50%'
        styles.top = `-${offset}px`
        styles.transform = 'translate(-50%, -100%) scale(1)'
        break
      case 'bottom':
        styles.left = '50%'
        styles.bottom = `-${offset}px`
        styles.transform = 'translate(-50%, 100%) scale(1)'
        break
      case 'left':
        styles.left = `-${offset}px`
        styles.top = '50%'
        styles.transform = 'translate(-100%, -50%) scale(1)'
        break
      case 'right':
        styles.right = `-${offset}px`
        styles.top = '50%'
        styles.transform = 'translate(100%, -50%) scale(1)'
        break
    }

    return styles
  }

  return (
    <div className="popover-container">
      <div onMouseOver={show} onMouseLeave={hide}>
        {children}
      </div>
      <div ref={popBoxRef} className="pop-box" style={getStyle(position)}>
        {content}
      </div>
    </div>
  )
}

export default Popover
