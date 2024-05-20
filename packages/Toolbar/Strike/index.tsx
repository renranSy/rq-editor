import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconStrikethrough } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const Strike: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleStrike = () => {
    if (!editor || !btnRef.current) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      if (format.hasOwnProperty('strike')) {
        editor.formatText(selection.index, selection.length, 'strike', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('strike', true)
        setActive(btnRef.current, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('strike')) {
        editor.format('strike', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('strike', true)
        setActive(btnRef.current, true)
      }
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleStrike)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleStrike)
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
        editor.getFormat(range.index, range.length).hasOwnProperty('strike') ||
        editor.getFormat().hasOwnProperty('strike')
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
      <IconStrikethrough className="rq-icon" />
    </button>
  )
}

export default Strike
