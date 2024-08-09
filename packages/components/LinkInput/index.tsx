import React, { useEffect, useRef, useState } from 'react'
import './index.less'
import { IconAlignJustified, IconLink } from '@tabler/icons-react'
import Quill, { Range } from 'quill'

type Props = {
  open: boolean
  editor: Quill | null
  onHide: () => void
}

const LinkInput: React.FC<Props> = ({ open, editor, onHide }) => {
  const linkInputRef = useRef<HTMLDivElement>(null)
  const urlInputRef = useRef<HTMLInputElement>(null)

  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')
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
    if (!linkInputRef.current || !editor || !urlInputRef.current) {
      return
    }

    if (!open) {
      linkInputRef.current.style.opacity = '0'
      linkInputRef.current.style.opacity = '0'
      linkInputRef.current.style.zIndex = '-1'
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
    linkInputRef.current.style.left = `${left + editor.root.getBoundingClientRect().left}px`
    linkInputRef.current.style.top = `${top + editor.root.getBoundingClientRect().top + height}px`
    linkInputRef.current.style.opacity = '1'
    linkInputRef.current.style.zIndex = '100'

    urlInputRef.current.focus()
  }

  const onInsertLink = () => {
    if (!editor) {
      return
    }

    const text = title ? title : url
    editor.insertText(range?.index || 0, text, 'link', url || title)
    editor.setSelection((range?.index || 0) + text.length)
    onHide()
    setTitle('')
    setUrl('')
  }

  return (
    <div
      ref={linkInputRef}
      className="link-input"
      onClick={(e) => {
        e.stopPropagation()
      }}
    >
      <div className="rq-input-box">
        <IconLink className="input-icon" />
        <input
          ref={urlInputRef}
          value={url}
          placeholder="请输入链接"
          onChange={(e) => {
            setUrl(e.currentTarget.value)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onInsertLink()
            }
          }}
          className="rq-link-input"
        />
      </div>
      <div className="rq-link-box-divider" />
      <div className="rq-input-box">
        <IconAlignJustified className="input-icon" />
        <input
          value={title}
          placeholder="请输入标题"
          onChange={(e) => {
            setTitle(e.currentTarget.value)
          }}
          onKeyUp={(e) => {
            if (e.key === 'Enter') {
              onInsertLink()
            }
          }}
          className="rq-link-input"
        />
      </div>
    </div>
  )
}

export default LinkInput
