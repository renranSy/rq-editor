import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import Quill, { Range } from 'quill'
import { IconLink } from '@tabler/icons-react'

type Props = {
  open: boolean
  editor: Quill | null
  onHide: () => void
}

const FormulaInput: React.FC<Props> = ({ open, editor, onHide }) => {
  const formulaInputRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [value, setValue] = useState('')
  const [range, setRange] = useState<Range>()

  useEffect(() => {
    if (!editor) {
      return
    }
    const handler = (range: Range) => {
      if (!range) {
        return
      }
      setRange(range)
    }

    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor])

  useEffect(() => {
    init()
  }, [open])

  const init = () => {
    if (!formulaInputRef.current || !editor || !inputRef.current) {
      return
    }

    if (!open) {
      formulaInputRef.current.style.opacity = '0'
      formulaInputRef.current.style.opacity = '0'
      formulaInputRef.current.style.zIndex = '-1'
      return
    }

    editor.focus()

    const selection = editor.getSelection()
    if (!selection) {
      return
    }

    const bounds = editor.getBounds(selection.index)
    if (!bounds) {
      return
    }
    const { left, top, height } = bounds
    formulaInputRef.current.style.left = `${left + editor.root.getBoundingClientRect().left}px`
    formulaInputRef.current.style.top = `${top + editor.root.getBoundingClientRect().top + height}px`
    formulaInputRef.current.style.opacity = '1'
    formulaInputRef.current.style.zIndex = '100'

    inputRef.current.focus()
  }

  const onInsertFormula = () => {
    if (!editor) {
      return
    }

    editor.insertEmbed(range?.index || 0, 'formula', value)
    // editor.setSelection((range?.index || 0) + value.length)
    onHide()
    setValue('')
  }

  return (
    <div
      ref={formulaInputRef}
      className="formula-input"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <IconLink className="input-icon" />
      <input
        ref={inputRef}
        value={value}
        placeholder="请输入公式"
        onChange={(e) => {
          setValue(e.currentTarget.value)
        }}
        onKeyUp={(e) => {
          if (e.key === 'Enter') {
            onInsertFormula()
          }
        }}
        className="rq-formula-input"
      />
    </div>
  )
}

export default FormulaInput
