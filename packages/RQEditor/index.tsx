import React, { CSSProperties, useEffect, useRef, useState } from 'react'
import Quill from 'quill'
import './index.less'
import Toolbar from '~/Toolbar'
import { RQ } from '~/type'
import { defaultItems } from '~/RQEditor/config'

type Props = {
  value: string
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
  custom?: RQ.ToolbarItem[]
}

const RTEditor: React.FC<Props> = (props) => {
  const editorRef = useRef<HTMLDivElement>(null)

  const [editor, setEditor] = useState<Quill>()
  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = props.value
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      setEditor(
        new Quill(editorRef.current, {
          theme: 'snow',
          modules: {
            toolbar: null
          }
        })
      )

      if (editor != null) {
        editor.on('text-change', () => {
          props.onChange?.(editor?.getSemanticHTML() || '')
        })
      }
    }
  }, [])

  return (
    <div className={['rq-container', props.divClassName].join(' ')} style={props.containerStyle}>
      <Toolbar className="ql-toolbar" items={defaultItems} editor={editor} editorRef={editorRef.current} />
      <div ref={editorRef} className={['rq-editor', props.editorClassName].join(' ')} contentEditable={true}></div>
    </div>
  )
}

export default RTEditor
