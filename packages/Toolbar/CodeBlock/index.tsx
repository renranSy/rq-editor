import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconFileCode } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const CodeBlock: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleCodeBlock = () => {
    if (!editor || !btnRef.current) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      if (format.hasOwnProperty('code-block')) {
        editor.formatText(selection.index, selection.length, 'code-block', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('code-block', true)
        setActive(btnRef.current, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('code-block')) {
        editor.format('code-block', false)
        setActive(btnRef.current, false)
      } else {
        editor.format('code-block', true)
        setActive(btnRef.current, true)
      }
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleCodeBlock)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleCodeBlock)
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
      const isFormat = editor.getFormat().hasOwnProperty('code-block')
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
      <IconFileCode className="rq-icon" />
    </button>
  )
}

export default CodeBlock
