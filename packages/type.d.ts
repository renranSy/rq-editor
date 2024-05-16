import React from 'react'

export namespace RQ {
  export type ToolbarItem = {
    key: string
    name: string
    element: React.ReactElement
    divider?: boolean
  }
}
