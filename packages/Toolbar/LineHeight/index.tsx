import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import Select from '~/components/Select'
import { IconCheck, IconLineHeight } from '@tabler/icons-react'
import { RQ } from '~/type'

type Props = {
  editor: Quill | null
}

const LineHeight: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<RQ.Value>('1.5')
  const options = [
    {
      value: '1',
      element: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
          <div style={{ color: 'inherit' }}>1</div>
          {value === '1' ? <IconCheck className="rq-icon" /> : <></>}
        </div>
      )
    },
    {
      value: '1.2',
      element: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
          <div style={{ color: 'inherit' }}>1.2</div>
          {value === '1.2' ? <IconCheck className="rq-icon" /> : <></>}
        </div>
      )
    },
    {
      value: '1.5',
      element: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
          <div style={{ color: 'inherit' }}>1.5</div>
          {value === '1.5' ? <IconCheck className="rq-icon" /> : <></>}
        </div>
      )
    },
    {
      value: '2',
      element: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
          <div style={{ color: 'inherit' }}>2</div>
          {value === '2' ? <IconCheck className="rq-icon" /> : <></>}
        </div>
      )
    },
    {
      value: '3',
      element: (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '140px' }}>
          <div style={{ color: 'inherit' }}>3</div>
          {value === '3' ? <IconCheck className="rq-icon" /> : <></>}
        </div>
      )
    }
  ]

  const handleLineHeight = (value: RQ.Value) => {
    if (!editor) {
      return
    }
    editor.format('line-height', value)
  }

  useEffect(() => {
    handleLineHeight(value)
  }, [value])

  useEffect(() => {
    if (!editor) {
      return
    }

    const handler = (range: Range) => {
      if (!range) {
        return
      }
      setValue(editor.getFormat()['line-height'] as RQ.Value)
    }
    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  }, [editor, value])

  return (
    <Select
      value={value}
      name="line-height"
      onChange={setValue}
      item={() => <IconLineHeight className="rq-icon" />}
      options={options}
    />
  )
}

export default LineHeight
