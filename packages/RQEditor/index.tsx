import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import './index.less'
import Toolbar from '~/Toolbar'
import { defaultItems } from '~/RQEditor/config'
import 'quill/dist/quill.snow.css'
import Quill from '~/register'
import { RQ } from '~/type'

type Props = {
  value: string
  onCreate?: (editor: Quill) => void
  onSelectionChange?: (
    range: { index: number; length: number },
    oldRange: { index: number; length: number },
    source: string
  ) => void
  onChange?: (content: string) => void
  divClassName?: string
  toolbarClassName?: string
  editorClassName?: string
  containerStyle?: CSSProperties
  toolbarStyle?: CSSProperties
  editorStyle?: CSSProperties
  type?: 'preview' | 'edit'
  mode?: 'light' | 'normal'
  toolbar?: string[]
  custom?: RQ.CustomToolbarItem[]
  namePosition?: 'top' | 'right' | 'bottom' | 'left'
}

const RTEditor: React.FC<Props> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null)
  const [editor, setEditor] = useState<Quill | null>(null)

  const [toolbarItems, setToolbarItems] = useState<RQ.ToolbarItem[]>([])

  useEffect(() => {
    if (!editor) {
      return
    }
    props.onCreate?.(editor)
  }, [editor])

  useEffect(() => {
    if (!props.toolbar) {
      setToolbarItems(defaultItems)
      return
    }

    try {
      const items = props.toolbar.map((key) => {
        const item = defaultItems.find((item) => item.key === key)
        if (!item) {
          throw new Error('toolbar keys error: ' + key)
        }
        return item
      })
      if (props.custom) {
        items.forEach((toolbar) => {
          if (props.custom!.map((custom) => custom.key).includes(toolbar.key)) {
            const temp = props.custom!.find((item) => item.key === toolbar.key)
            if (!temp) {
              throw new Error('custom keys error: ' + toolbar.key)
            }
            toolbar.divider = temp.divider ?? false
            toolbar.name = temp.name ?? ''
          }
        })
        console.log(props.custom)
        console.log(items)
      }
      setToolbarItems(items)
    } catch (e) {
      setToolbarItems([])
      console.error(e)
    }
  }, [props])

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = props.value || ''
    }
  }, [editorRef])

  useEffect(() => {
    if (!editorRef.current) {
      return
    }

    setEditor(
      new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: null
        }
      })
    )
  }, [editorRef])

  useEffect(() => {
    if (!editor) {
      return
    }
    const handler = () => {
      props.onChange?.(editor?.getSemanticHTML() || '')
    }
    editor.on('text-change', handler)

    return () => {
      editor.off('text-change', handler)
    }
  }, [editor])

  useEffect(() => {
    if (!editor) {
      return
    }
    const handler = (
      range: { index: number; length: number },
      oldRange: { index: number; length: number },
      source: string
    ) => {
      props.onSelectionChange?.(range, oldRange, source)
    }
    editor.on('selection-change', handler)

    return () => {
      editor.off('selection-change', handler)
    }
  })

  return (
    <div className={['rq-container', props.divClassName].join(' ')} style={props.containerStyle}>
      <Toolbar className="ql-toolbar" items={toolbarItems} editor={editor} namePosition={props.namePosition} />
      <div ref={editorRef} className={['rq-editor', props.editorClassName].join(' ')}></div>
    </div>
  )
}

export default RTEditor
