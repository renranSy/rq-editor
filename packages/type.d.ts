import React from 'react'
import Quill from 'quill'

export namespace RQ {
  export type ToolbarItem = {
    key: string
    name: string
    element: (editor: Quill | null) => React.JSX.Element
    divider?: boolean
  }
}
