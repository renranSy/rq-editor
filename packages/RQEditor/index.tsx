import React, { CSSProperties, useEffect, useRef } from 'react'
import Quill from 'quill'
import './index.less'
import {
  IconAlignLeft,
  IconBold,
  IconChevronDown,
  IconClearFormatting,
  IconCode,
  IconHeading,
  IconHighlight,
  IconIndentDecrease,
  IconIndentIncrease,
  IconItalic,
  IconLineHeight,
  IconLink,
  IconList,
  IconListCheck,
  IconListNumbers,
  IconMoodSmile,
  IconPhoto,
  IconPlus,
  IconQuote,
  IconStrikethrough,
  IconSubscript,
  IconSuperscript,
  IconTable,
  IconTextColor,
  IconTextSize,
  IconUnderline
} from '@tabler/icons-react'

type Props = {
  value: string
  onChange?: (content: string) => void
  divClassName?: string
  toolbarClassName?: string
  editorClassName?: string
  containerStyle?: CSSProperties
  toolbarStyle?: CSSProperties
  editorStyle?: CSSProperties
}

const RTEditor: React.FC<Props> = (props) => {
  const toolbarRef = useRef<HTMLDivElement>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  let editor: Quill | null = null

  useEffect(() => {
    if (editorRef.current) {
      editorRef.current.innerHTML = props.value
    }
  }, [])

  useEffect(() => {
    if (editorRef.current) {
      editor = new Quill(editorRef.current, {
        theme: 'snow',
        modules: {
          toolbar: null
        }
      })

      if (editor != null) {
        editor.on('text-change', () => {
          props.onChange?.(editor?.getSemanticHTML() || '')
        })
      }
    }
  }, [])

  return (
    <div className={['rq-container', props.divClassName].join(' ')} style={props.containerStyle}>
      <div ref={toolbarRef} className={['rq-toolbar', props.toolbarClassName].join(' ')}>
        <button>
          <IconPlus className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <div className="rq-divider"></div>
        <button>
          <IconHeading className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <button>
          <IconTextSize className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <div className="rq-divider"></div>
        <button>
          <IconBold className="rq-icon" />
        </button>
        <button>
          <IconItalic className="rq-icon" />
        </button>
        <button>
          <IconUnderline className="rq-icon" />
        </button>
        <button>
          <IconStrikethrough className="rq-icon" />
        </button>
        <button>
          <IconTextColor className="rq-icon" />
        </button>
        <button>
          <IconHighlight className="rq-icon" />
        </button>
        <button>
          <IconSubscript className="rq-icon" />
        </button>
        <button>
          <IconSuperscript className="rq-icon" />
        </button>
        <button>
          <IconCode className="rq-icon" />
        </button>
        <button>
          <IconQuote className="rq-icon" />
        </button>
        <div className="rq-divider"></div>
        <button>
          <IconAlignLeft className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <button>
          <IconLineHeight className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <button>
          <IconList className="rq-icon" />
        </button>
        <button>
          <IconListNumbers className="rq-icon" />
        </button>
        <button>
          <IconListCheck className="rq-icon" />
        </button>
        <button>
          <IconIndentDecrease className="rq-icon" />
        </button>
        <button>
          <IconIndentIncrease className="rq-icon" />
        </button>
        <button>
          <IconLink className="rq-icon" />
        </button>
        <div className="rq-divider"></div>
        <button>
          <IconPhoto className="rq-icon" />
        </button>
        <button>
          <IconTable className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <button>
          <IconMoodSmile className="rq-icon" />
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <div className="rq-divider"></div>
        <button>
          <IconClearFormatting className="rq-icon" />
        </button>
      </div>
      <div ref={editorRef} className={['rq-editor', props.editorClassName].join(' ')} contentEditable={true}></div>
    </div>
  )
}

export default RTEditor
