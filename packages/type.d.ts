import React from 'react'
import Quill from 'quill'

export namespace RQ {
  export type ToolbarItem = {
    key: string
    name: string
    element: (editor: Quill | null) => React.JSX.Element
    divider?: boolean
  }

  export type Value = number | string | boolean

  export type CustomToolbarItem = {
    key: string
    name?: string
    divider?: boolean
  }
}
