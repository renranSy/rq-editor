import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import Select from '~/components/Select'
import { IconAlignCenter, IconAlignJustified, IconAlignLeft, IconAlignRight } from '@tabler/icons-react'

type Props = {
  editor: Quill | null
}

const TextAlignment: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<string | boolean>(false)
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

  const handleTextAlignment = (value: string | boolean) => {
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

    const handler = () => {
      setValue(editor.getFormat()['align'] as string | boolean)
    }
    editor.on('selection-change', handler)
    editor.on('editor-change', handler)

    return () => {
      editor.off('selection-change', handler)
      editor.off('editor-change', handler)
    }
  }, [editor, value])

  return (
    <Select
      value={value}
      onChange={setValue}
      item={(value) => (options.find((item) => item.value === value) || options[0]).element}
      options={options}
    />
  )
}

export default TextAlignment
