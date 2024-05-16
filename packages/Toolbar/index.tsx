import React, { useEffect } from 'react'
import Quill, { Range } from 'quill'

export type ToolbarItem = {
  key: string
  name: string
  element: React.ReactElement
}

type Props = {
  className?: string
  items?: ToolbarItem[]
  editor?: Quill | null
  editorRef?: HTMLDivElement | null
}

const Toolbar: React.FC<Props> = ({ className, items, editor, editorRef }) => {
  const getElement = (id: string) => {
    const element = document.getElementById(id)
    if (!element) {
      return null
    }
    const button = element.childNodes[0] as HTMLButtonElement
    return button as HTMLElement
  }

  const setActive = (element: HTMLElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleBold = () => {
    const element = getElement('rq-bold')
    if (!editor || !element) {
      return
    }
    const selection = editor.getSelection()
    if (selection && selection.length != 0) {
      const format = editor.getFormat(selection.index, selection.length)
      console.log(format)
      if (format.hasOwnProperty('bold')) {
        editor.formatText(selection.index, selection.length, 'bold', false)
        setActive(element, false)
      } else {
        editor.format('bold', true)
        setActive(element, true)
      }
    } else {
      const format = editor.getFormat()
      if (format.hasOwnProperty('bold')) {
        editor.format('bold', false)
        setActive(element, false)
      } else {
        editor.format('bold', true)
        setActive(element, true)
      }
    }
  }

  useEffect(() => {
    const element = getElement('rq-bold')
    if (!element) {
      return
    }
    if (element) {
      element.addEventListener('click', handleBold)
    }
    return () => {
      element?.removeEventListener('click', handleBold)
    }
  }, [editor])

  useEffect(() => {
    const element = getElement('rq-bold')

    if (!editor || !element) {
      return
    }

    const handler = (range: Range) => {
      if (!range) {
        return
      }
      const isFormat =
        editor.getFormat(range.index, range.length).hasOwnProperty('bold') || editor.getFormat().hasOwnProperty('bold')
      if (isFormat) {
        setActive(element, true)
      } else {
        setActive(element, false)
      }
    }
    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor])

  return (
    <div className={['rq-toolbar', className].join(' ')}>
      {(items || []).map((item) => (
        <span key={item.key} id={['rq', item.key].join('-')}>
          {item.element}
        </span>
      ))}
    </div>
  )
}

export default Toolbar
