import React, { useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import { IconTextDirectionLtr, IconTextDirectionRtl } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const TextDirection: React.FC<Props> = ({ editor }) => {
  const [direction, setDirection] = useState(false)
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleTextDirection = () => {
    if (!editor || !btnRef.current) {
      return
    }

    const format = editor.getFormat()
    if (format.hasOwnProperty('direction')) {
      editor.format('direction', false)
      editor.format('align', false)
      setDirection(false)
    } else {
      editor.format('direction', 'rtl')
      editor.format('align', 'right')
      setDirection(true)
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleTextDirection)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleTextDirection)
    }
  }, [editor])

  return (
    <button className="rq-button" ref={btnRef}>
      {direction ? <IconTextDirectionRtl className="rq-icon" /> : <IconTextDirectionLtr className="rq-icon" />}
    </button>
  )
}

export default TextDirection
