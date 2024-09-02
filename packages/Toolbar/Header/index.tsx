import React, { useEffect, useState } from 'react'
import Quill from 'quill'
import Select from '~/components/Select'
import { IconH1, IconH2, IconH3, IconH4, IconH5, IconH6, IconHeading } from '@tabler/icons-react'
import { RQ } from '~/type'

type Props = {
  editor: Quill | null
}

const Header: React.FC<Props> = ({ editor }) => {
  const [value, setValue] = useState<RQ.Value>(false)
  const options = [
    {
      value: 1,
      element: <IconH1 className="rq-icon" />
    },
    {
      value: 2,
      element: <IconH2 className="rq-icon" />
    },
    {
      value: 3,
      element: <IconH3 className="rq-icon" />
    },
    {
      value: 4,
      element: <IconH4 className="rq-icon" />
    },
    {
      value: 5,
      element: <IconH5 className="rq-icon" />
    },
    {
      value: 6,
      element: <IconH6 className="rq-icon" />
    }
  ]

  const handleHeader = (value: RQ.Value) => {
    if (!editor) {
      return
    }
    editor.format('header', value)
  }

  useEffect(() => {
    handleHeader(value)
  }, [value])

  useEffect(() => {
    if (!editor) {
      return
    }

    const selectionChangeHandler = (range: Range) => {
      if (!range) {
        return
      }
      setValue(editor.getFormat()['header'] as RQ.Value)
    }

    const textChangeHandler = () => {
      setValue(editor.getFormat()['header'] as RQ.Value)
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
      name="header"
      value={value}
      onChange={setValue}
      item={(value) =>
        (
          options.find((item) => item.value === value) || {
            value: false,
            element: <IconHeading className="rq-icon" />
          }
        ).element
      }
      options={options}
    />
  )
}

export default Header
