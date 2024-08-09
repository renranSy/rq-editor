import React, { useEffect, useRef, useState } from 'react'
import Quill, { Range } from 'quill'
import { IconMathFunction } from '@tabler/icons-react'
import FormulaInput from '~/components/FormulaInput'
import katex from 'katex'

window.katex = katex

type Props = {
  editor: Quill | null
}

const Formula: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [showInput, setShowInput] = useState(false)

  useEffect(() => {
    const handler = () => {
      setShowInput(false)
    }
    document.addEventListener('click', handler)

    return () => {
      document.removeEventListener('click', handler)
    }
  }, [])

  useEffect(() => {
    if (!editor || !btnRef.current) {
      return
    }

    const handler = (range: Range) => {
      if (!range || !btnRef.current) {
        return
      }
      const isFormat =
        editor.getFormat(range.index, range.length).hasOwnProperty('formula') ||
        editor.getFormat().hasOwnProperty('formula')
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

  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleFormula = () => {
    setShowInput((prevState) => !prevState)
  }

  return (
    <>
      <button
        className="rq-button"
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation()
          handleFormula()
        }}
      >
        <IconMathFunction className="rq-icon" />
      </button>
      <FormulaInput
        open={showInput}
        editor={editor}
        onHide={() => {
          if (!btnRef.current) {
            return
          }
          setShowInput(false)
          setActive(btnRef.current, false)
        }}
      />
    </>
  )
}

export default Formula
