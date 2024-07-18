import React, { useEffect, useRef, useState } from 'react'
import Quill, { Range } from 'quill'
import { IconTextColor } from '@tabler/icons-react'
import ColorPicker from '~/components/ColorPicker'

type Props = {
  editor: Quill | null
}

const TextColor: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState<string | null | undefined>('#000000')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const callback = () => {
      hideColorPicker()
    }
    document.addEventListener('click', callback)

    return () => {
      document.removeEventListener('click', callback)
    }
  })

  useEffect(() => {
    if (!editor || !btnRef.current) {
      return
    }

    const handler = (range: Range) => {
      if (!editor || !btnRef.current) {
        return
      }
      if (!range) {
        return
      }
      const format = editor.getFormat(range.index, range.length)

      if (typeof format['color'] === 'string' || format['color'] === null || format['color'] === undefined) {
        setValue(format['color'])
      } else if (typeof format['color'] === 'object' && Array.isArray(format['color'])) {
        setValue(format['color'][0])
      }
    }

    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor])

  const handleColor = (color: string) => {
    if (!editor) {
      return
    }

    editor.format('color', color)
  }

  const showColorPicker = () => {
    if (!colorPickerRef.current || !btnRef.current) {
      return
    }
    btnRef.current.style.backgroundColor = '#f2f5f9'
    colorPickerRef.current.style.display = 'flex'
    setTimeout(() => {
      colorPickerRef.current!.style.opacity = '1'
      colorPickerRef.current!.style.zIndex = '99'
    }, 0)
    setOpen(true)
  }

  const hideColorPicker = () => {
    if (!colorPickerRef.current || !btnRef.current) {
      return
    }
    btnRef.current.style.backgroundColor = '#ffffff'
    colorPickerRef.current.style.opacity = '0'
    colorPickerRef.current.style.zIndex = '-99'
    setTimeout(() => {
      colorPickerRef.current!.style.display = 'none'
    }, 200)
    setOpen(false)
  }

  const onClickBtn = () => {
    if (open) {
      hideColorPicker()
    } else {
      showColorPicker()
    }
  }

  const onSelectColor = (color: string) => {
    setValue(color)
    handleColor(color)

    setTimeout(() => {
      hideColorPicker()
    }, 100)
  }
  return (
    <div>
      <button
        className="rq-button"
        ref={btnRef}
        onClick={(e) => {
          e.stopPropagation()
          onClickBtn()
        }}
      >
        <IconTextColor className="rq-icon" />
      </button>
      <div
        ref={colorPickerRef}
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{ display: 'none', position: 'absolute', marginTop: '0.2rem', transition: 'all 200ms' }}
      >
        <ColorPicker value={value} onChange={onSelectColor} />
      </div>
    </div>
  )
}

export default TextColor
