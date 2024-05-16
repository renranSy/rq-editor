import { RQ } from '~/type'
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

export const defaultProps = {
  type: 'edit',
  mode: 'light',
  toolbar: ['all'],
  custom: []
}

export const defaultItems: RQ.ToolbarItem[] = [
  {
    key: 'head',
    name: '标题',
    element: (
      <button>
        <IconHeading className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'textSize',
    name: '字体大小',
    element: (
      <button>
        <IconTextSize className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'bold',
    name: '加粗',
    element: (
      <button>
        <IconBold className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'italic',
    name: '斜体',
    element: (
      <button>
        <IconItalic className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'underline',
    name: '下划线',
    element: (
      <button>
        <IconUnderline className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'deleteLine',
    name: '删除线',
    element: (
      <button>
        <IconStrikethrough className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'textColor',
    name: '文字颜色',
    element: (
      <button>
        <IconTextColor className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'backgroundColor',
    name: '背景颜色',
    element: (
      <button>
        <IconHighlight className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'subscript',
    name: '下标',
    element: (
      <button>
        <IconSubscript className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'superscript',
    name: '上标',
    element: (
      <button>
        <IconSuperscript className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'codeBlock',
    name: '代码块',
    element: (
      <button>
        <IconCode className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'quote',
    name: '引用',
    element: (
      <button>
        <IconQuote className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'align',
    name: '排列',
    element: (
      <button>
        <IconAlignLeft className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'lineHeight',
    name: '行高',
    element: (
      <button>
        <IconLineHeight className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'unorderedList',
    name: '无序列表',
    element: (
      <button>
        <IconList className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'orderedList',
    name: '有序列表',
    element: (
      <button>
        <IconListNumbers className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'todoList',
    name: '待办列表',
    element: (
      <button>
        <IconListCheck className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'indentDecrease',
    name: '向左缩进',
    element: (
      <button>
        <IconIndentDecrease className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'indentIncrease',
    name: '向右缩进',
    element: (
      <button>
        <IconIndentIncrease className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'link',
    name: '链接',
    element: (
      <button>
        <IconLink className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'image',
    name: '图片',
    element: (
      <button>
        <IconPhoto className="rq-icon" />
      </button>
    ),
    divider: false
  },
  {
    key: 'table',
    name: '表格',
    element: (
      <button>
        <IconTable className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'emoji',
    name: 'emoji表情',
    element: (
      <button>
        <IconMoodSmile className="rq-icon" />
        <IconChevronDown className="rq-icon rq-icon-down" />
      </button>
    ),
    divider: false
  },
  {
    key: 'clear',
    name: '清除格式',
    element: (
      <button>
        <IconClearFormatting className="rq-icon" />
      </button>
    ),
    divider: false
  }
]
