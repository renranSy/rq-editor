import React, { useEffect, useRef, useState } from 'react'
import Quill, { Range } from 'quill'
import { IconBackground } from '@tabler/icons-react'
import ColorPicker from '~/components/ColorPicker'

type Props = {
  editor: Quill | null
}

const BackgroundColor: React.FC<Props> = ({ editor }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const colorPickerRef = useRef<HTMLDivElement>(null)

  const [value, setValue] = useState<string | null | undefined>('#ffffff')
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

      if (
        typeof format['background'] === 'string' ||
        format['background'] === null ||
        format['background'] === undefined
      ) {
        setValue(format['background'])
      } else if (typeof format['background'] === 'object' && Array.isArray(format['background'])) {
        setValue(format['background'][0])
      }
    }

    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor])

  const handleColor = (background: string) => {
    if (!editor) {
      return
    }

    editor.format('background', background)
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

  const onSelectColor = (background: string) => {
    setValue(background)
    handleColor(background)

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
        <IconBackground className="rq-icon" />
      </button>
      <div
        ref={colorPickerRef}
        onClick={(e) => {
          e.stopPropagation()
        }}
        style={{ display: 'none', position: 'absolute', marginTop: '0.2rem', transition: 'all 200ms' }}
      >
        <ColorPicker value={value} defaultValue="#ffffff" onChange={onSelectColor} />
      </div>
    </div>
  )
}

export default BackgroundColor
