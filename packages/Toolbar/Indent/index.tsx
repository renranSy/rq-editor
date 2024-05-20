import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import { IconIndentDecrease, IconIndentIncrease } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
  indent: '+1' | '-1'
}

const Indent: React.FC<Props> = ({ editor, indent }) => {
  const btnRef = useRef<HTMLButtonElement>(null)

  const handleIndent = () => {
    if (!editor || !btnRef.current) {
      return
    }

    editor.format('indent', indent)
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleIndent)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleIndent)
    }
  }, [editor])

  return (
    <button ref={btnRef}>
      {indent === '-1' ? <IconIndentDecrease className="rq-icon" /> : <IconIndentIncrease className="rq-icon" />}
    </button>
  )
}

export default Indent
