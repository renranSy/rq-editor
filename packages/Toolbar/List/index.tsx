import React, { useEffect, useRef } from 'react'
import Quill, { Range } from 'quill'
import { IconList, IconListNumbers } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
  list: 'ordered' | 'bullet'
}

const List: React.FC<Props> = ({ editor, list }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleUnorderedList = () => {
    if (!editor || !btnRef.current) {
      return
    }

    const format = editor.getFormat()
    if (format.hasOwnProperty('list') && format['list'] === list) {
      editor.format('list', false)
      setActive(btnRef.current, false)
    } else {
      editor.format('list', list)
      setActive(btnRef.current, true)
    }
  }

  useEffect(() => {
    if (!btnRef.current) {
      return
    }
    if (btnRef.current) {
      btnRef.current.addEventListener('click', handleUnorderedList)
    }
    return () => {
      btnRef.current?.removeEventListener('click', handleUnorderedList)
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
      const isFormat = editor.getFormat().hasOwnProperty('list') && editor.getFormat()['list'] === list
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
    <button className="rq-button" ref={btnRef}>
      {list === 'ordered' ? <IconListNumbers className="rq-icon" /> : <IconList className="rq-icon" />}
    </button>
  )
}

export default List
