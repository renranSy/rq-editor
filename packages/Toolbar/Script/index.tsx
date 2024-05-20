import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconSubscript, IconSuperscript } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
  script: 'sub' | 'super'
}

const Script: React.FC<Props> = ({ editor, script }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleScript = () => {
    if (!editor || !btnRef.current) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      if (format.hasOwnProperty('script') && format['script'] === script) {
        editor.formatText(selection.index, selection.length, 'script', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('script', script)
        setActive(btnRef.current, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('script') && format['script'] === script) {
        editor.format('script', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('script', script)
        setActive(btnRef.current, true)
      }
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleScript)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleScript)
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
        (editor.getFormat(range.index, range.length).hasOwnProperty('script') &&
          editor.getFormat(range.index, range.length)['script'] === script) ||
        (editor.getFormat().hasOwnProperty('script') &&
          editor.getFormat(range.index, range.length)['script'] === script)
      if (isFormat) {
        setActive(btnRef.current, true)
      } else {
        setActive(btnRef.current, false)
      }
    }
    editor.on('selection-change', handler)
    editor.on('text-change', handler)

    return () => {
      editor.off('selection-change', handler)
      editor.on('text-change', handler)
    }
  }, [editor])
  return (
    <button ref={btnRef}>
      {script === 'sub' ? <IconSubscript className="rq-icon" /> : <IconSuperscript className="rq-icon" />}
    </button>
  )
}

export default Script
