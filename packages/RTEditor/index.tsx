import React, { useEffect, useRef } from 'react'
import Quill from 'quill'
import 'quill/dist/quill.snow.css'
import './index.less'

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  ['link', 'image', 'video', 'formula'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'] // remove formatting button
]

type Props = {
  value: string
  onChange?: (content: string) => void
}

const RTEditor: React.FC<Props> = ({ value, onChange }) => {
  const editorRef = useRef<HTMLDivElement>(null)

  let editor: Quill | null = null

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = value
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editor = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: toolbarOptions
        }
      })

      if (editor != null) {
        editor.on('text-change', () => {
          onChange?.(editor?.getSemanticHTML() || '')
        })
      }
    }
  }, [])

  return (
    <>
      <div ref={editorRef}></div>
    </>
  )
}

export default RTEditor
