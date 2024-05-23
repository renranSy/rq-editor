import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import { IconQuote } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const Blockquote: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleBlockquote = () => {
    if (!editor || !btnRef.current) {
      return
    }

    const format = editor.getFormat()
    if (format.hasOwnProperty('blockquote')) {
      editor.format('blockquote', false)
      setActive(btnRef.current, false)
    } else {
      editor.format('blockquote', true)
      setActive(btnRef.current, true)
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleBlockquote)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleBlockquote)
    }
  }, [editor])

  useEffect(() => {
    if (!editor || !btnRef.current) {
      return
    }

    const handler = (range: Range) => {
      if (!range || !btnRef.current) {
        return
      }
      const isFormat = editor.getFormat().hasOwnProperty('blockquote')
      if (isFormat) {
        setActive(btnRef.current, true)
      } else {
        setActive(btnRef.current, false)
      }
    }
    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor])
  return (
    <button ref={btnRef}>
      <IconQuote className="rq-icon" />
    </button>
  )
}

export default Blockquote
