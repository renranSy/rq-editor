import React, { useEffect, useState } from 'react'
import Quill, { Range } from 'quill'
import Select from '~/components/Select'
import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight } from '@tabler/icons-react'
import { RQ } from '~/type'

type Props = {
  editor: Quill | null
}

const TextAlignment: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<RQ.Value>(false)
  const options = [
    {
      value: false,
      element: <IconAlignLeft className="rq-icon" />
    },
    {
      value: 'center',
      element: <IconAlignCenter className="rq-icon" />
    },
    {
      value: 'right',
      element: <IconAlignRight className="rq-icon" />
    },
    {
      value: 'justify',
      element: <IconAlignJustified className="rq-icon" />
    }
  ]

  const handleTextAlignment = (value: RQ.Value) => {
    if (!editor) {
      return
    }
    editor.format('align', value)
  }

  useEffect(() => {
    handleTextAlignment(value)
  }, [value])

  useEffect(() => {
    if (!editor) {
      return
    }

    const selectionChangeHandler = (range: Range) => {
      if (!range) {
        return
      }
      setValue(editor.getFormat()['align'] as RQ.Value)
    }

    const textChangeHandler = () => {
      setValue(editor.getFormat()['align'] as RQ.Value)
    }
    editor.on('selection-change', selectionChangeHandler)
    editor.on('text-change', textChangeHandler)

    return () => {
      editor.off('selection-change', selectionChangeHandler)
      editor.off('text-change', textChangeHandler)
    }
  }, [editor, value])

  return (
    <Select
      value={value}
      name="align"
      onChange={setValue}
      item={(value) => (options.find((item) => item.value === value) || options[0]).element}
      options={options}
    />
  )
}

export default TextAlignment
