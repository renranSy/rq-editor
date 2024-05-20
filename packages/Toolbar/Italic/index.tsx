import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconItalic } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const Italic: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleItalic = () => {
    if (!editor || !btnRef.current) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      if (format.hasOwnProperty('italic')) {
        editor.formatText(selection.index, selection.length, 'italic', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('italic', true)
        setActive(btnRef.current, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('italic')) {
        editor.format('italic', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('italic', true)
        setActive(btnRef.current, true)
      }
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleItalic)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleItalic)
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
      const isFormat =
        editor.getFormat(range.index, range.length).hasOwnProperty('italic') ||
        editor.getFormat().hasOwnProperty('italic')
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
      <IconItalic className="rq-icon" />
    </button>
  )
}

export default Italic
