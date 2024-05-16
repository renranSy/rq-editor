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
import React from 'react'

type Props = {
  className: string
}

const Icons: React.FC<Props> = (props) => {
  return (
    <div className={['rq-toolbar', props.className].join(' ')}>
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
  )
}

export default Icons
