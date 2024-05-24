import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import Select from '~/components/Select'
import { IconTextSize } from '@tabler/icons-react'
import { RQ } from '~/type'

type Props = {
  editor: Quill | null
}

const FontSize: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<RQ.Value>(false)
  const options = [
    {
      value: 10,
      element: <span style={{ fontSize: '10px', width: '120px' }}>10</span>
    },
    {
      value: 12,
      element: <span style={{ fontSize: '12px', width: '120px' }}>12</span>
    },
    {
      value: 14,
      element: <span style={{ fontSize: '14px', width: '120px' }}>14</span>
    },
    {
      value: 16,
      element: <span style={{ fontSize: '16px', width: '120px' }}>16</span>
    },
    {
      value: 18,
      element: <span style={{ fontSize: '18px', width: '120px' }}>18</span>
    },
    {
      value: 20,
      element: <span style={{ fontSize: '20px', width: '120px' }}>20</span>
    },
    {
      value: 22,
      element: <span style={{ fontSize: '22px', width: '120px' }}>22</span>
    },
    {
      value: 24,
      element: <span style={{ fontSize: '24px', width: '120px' }}>24</span>
    }
  ]

  const handleFontSize = (value: RQ.Value) => {
    if (!editor) {
      return
    }
    editor.format('font-size', value)
  }

  useEffect(() => {
    handleFontSize(value)
  }, [value])

  useEffect(() => {
    if (!editor) {
      return
    }

    const selectionChangeHandler = (range: Range) => {
      if (!range) {
        return
      }
      setValue(editor.getFormat()['font-size'] as RQ.Value)
    }

    const textChangeHandler = () => {
      setValue(editor.getFormat()['font-size'] as RQ.Value)
    }

    editor.on('selection-change', selectionChangeHandler)
    editor.on('text-change', textChangeHandler)

    return () => {
      editor.off('selection-change', selectionChangeHandler)
      editor.off('text-change', textChangeHandler)
    }
  }, [editor, value])

  return (
    <Select value={value} onChange={setValue} item={() => <IconTextSize className="rq-icon" />} options={options} />
  )
}

export default FontSize
