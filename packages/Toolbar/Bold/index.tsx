import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconBold } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const Bold: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleBold = () => {
    if (!editor || !btnRef.current) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      if (format.hasOwnProperty('bold')) {
        editor.formatText(selection.index, selection.length, 'bold', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('bold', true)
        setActive(btnRef.current, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('bold')) {
        editor.format('bold', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('bold', true)
        setActive(btnRef.current, true)
      }
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleBold)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleBold)
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
        editor.getFormat(range.index, range.length).hasOwnProperty('bold') || editor.getFormat().hasOwnProperty('bold')
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
      <IconBold className="rq-icon" />
    </button>
  )
}

export default Bold
