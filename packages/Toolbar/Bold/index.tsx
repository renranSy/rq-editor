import React from 'react'
import Quill from 'quill'
import { IconBold } from '@tabler/icons-react'

type Props = {
  name: string
  key: string
  editorRef: HTMLDivElement
  editor: Quill
}

export const Bold: React.FC<Props> = (props) => {
  return (
    <button>
      <IconBold className="rq-icon" />
    </button>
  )
}

export default Bold
