import React, { useEffect, useRef, useState } from 'react'
import Quill, { Range } from 'quill'
import { IconLink } from '@tabler/icons-react'
import LinkInput from '~/components/LinkInput'

type Props = {
  editor: Quill | null
}

const Link: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const setActive = (element: HTMLButtonElement, status: boolean) => {
    if (status) {
      element.style.backgroundColor = '#f2f5f9'
    } else {
      element.style.backgroundColor = '#ffffff'
    }
  }

  const handleLink = () => {
    setShowInput((prevState) => !prevState)
  }

  useEffect(() => {
    if (!editor || !btnRef.current) {
      return
    }

    const handler = (range: Range) => {
      if (!range || !btnRef.current) {
        return
      }
      const isFormat =
        editor.getFormat(range.index, range.length).hasOwnProperty('link') || editor.getFormat().hasOwnProperty('link')
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

  useEffect(() => {
    const handler = () => {
      setShowInput(false)
    }
    document.body.addEventListener('click', handler)

    return () => {
      document.body.removeEventListener('click', handler)
    }
  }, [])

  const [showInput, setShowInput] = useState(false)

  return (
    <>
      <button
        className="rq-button"
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation()
          handleLink()
        }}
      >
        <IconLink className="rq-icon" />
      </button>
      <LinkInput
        editor={editor}
        isShow={showInput}
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

export default Link
