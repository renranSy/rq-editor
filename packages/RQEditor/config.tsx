import { RQ } from '~/type'
import React from 'react'
import Bold from '~/Toolbar/Bold'
import Italic from '~/Toolbar/Italic'
import Underline from '~/Toolbar/Underline'
import Strike from '~/Toolbar/Strike'
import Subscript from '~/Toolbar/Script'
import Blockquote from '~/Toolbar/Blockquote'
import List from '~/Toolbar/List'
import CodeBlock from '~/Toolbar/CodeBlock'
import Indent from '~/Toolbar/Indent'
import InlineCode from '~/Toolbar/InlineCode'
import TextAlignment from '~/Toolbar/TextAlignment'
import TextDirection from '~/Toolbar/TextDirection'
import LineHeight from '~/Toolbar/LineHeight'
import Link from '~/Toolbar/Link'
import Header from '~/Toolbar/Header'
import Size from '~/Toolbar/FontSize'

export const defaultProps = {
  type: 'edit',
  mode: 'light',
  toolbar: ['all'],
  custom: []
}

export const defaultItems: RQ.ToolbarItem[] = [
  {
    key: 'header',
    name: '标题',
    element: (editor) => <Header editor={editor} />,
    divider: false
  },
  {
    key: 'textSize',
    name: '字体大小',
    element: (editor) => <Size editor={editor} />,
    divider: true
  },
  {
    key: 'bold',
    name: '加粗',
    element: (editor) => <Bold editor={editor} />,
    divider: false
  },
  {
    key: 'italic',
    name: '斜体',
    element: (editor) => <Italic editor={editor} />,
    divider: false
  },
  {
    key: 'underline',
    name: '下划线',
    element: (editor) => <Underline editor={editor} />,
    divider: false
  },
  {
    key: 'strike',
    name: '删除线',
    element: (editor) => <Strike editor={editor} />,
    divider: false
  },
  // {
  //   key: 'textColor',
  //   name: '文字颜色',
  //   element: (
  //     <button>
  //       <IconTextColor className="rq-icon" />
  //     </button>
  //   ),
  //   divider: false
  // },
  // {
  //   key: 'backgroundColor',
  //   name: '背景颜色',
  //   element: (
  //     <button>
  //       <IconHighlight className="rq-icon" />
  //     </button>
  //   ),
  //   divider: false
  // },
  {
    key: 'subscript',
    name: '下标',
    element: (editor) => <Subscript editor={editor} script="sub" />,
    divider: false
  },
  {
    key: 'superscript',
    name: '上标',
    element: (editor) => <Subscript editor={editor} script="super" />,
    divider: false
  },
  {
    key: 'InlineCode',
    name: '行内代码',
    element: (editor) => <InlineCode editor={editor} />,
    divider: false
  },
  {
    key: 'codeBlock',
    name: '代码块',
    element: (editor) => <CodeBlock editor={editor} />,
    divider: false
  },
  {
    key: 'blockquote',
    name: '引用',
    element: (editor) => <Blockquote editor={editor} />,
    divider: true
  },
  {
    key: 'TextDirection',
    name: '文本方向',
    element: (editor) => <TextDirection editor={editor} />,
    divider: false
  },
  {
    key: 'TextAlignment',
    name: '文本对齐',
    element: (editor) => <TextAlignment editor={editor} />,
    divider: false
  },
  {
    key: 'LineHeight',
    name: '行高',
    element: (editor) => <LineHeight editor={editor} />,
    divider: false
  },
  {
    key: 'orderedList',
    name: '有序列表',
    element: (editor) => <List editor={editor} list="ordered" />,
    divider: false
  },
  {
    key: 'unorderedList',
    name: '无序列表',
    element: (editor) => <List editor={editor} list="bullet" />,
    divider: false
  },
  // {
  //   key: 'todoList',
  //   name: '待办列表',
  //   element: (
  //     <button>
  //       <IconListCheck className="rq-icon" />
  //     </button>
  //   ),
  //   divider: false
  // },
  {
    key: 'indentDecrease',
    name: '向左缩进',
    element: (editor) => <Indent editor={editor} indent="-1" />,
    divider: false
  },
  {
    key: 'indentIncrease',
    name: '向右缩进',
    element: (editor) => <Indent editor={editor} indent="+1" />,
    divider: true
  },
  {
    key: 'link',
    name: '链接',
    element: (editor) => <Link editor={editor} />,
    divider: false
  }
  // {
  //   key: 'image',
  //   name: '图片',
  //   element: (
  //     <button>
  //       <IconPhoto className="rq-icon" />
  //     </button>
  //   ),
  //   divider: false
  // },
  // {
  //   key: 'table',
  //   name: '表格',
  //   element: (
  //     <button>
  //       <IconTable className="rq-icon" />
  //       <IconChevronDown className="rq-icon rq-icon-down" />
  //     </button>
  //   ),
  //   divider: false
  // },
  // {
  //   key: 'emoji',
  //   name: 'emoji表情',
  //   element: (
  //     <button>
  //       <IconMoodSmile className="rq-icon" />
  //       <IconChevronDown className="rq-icon rq-icon-down" />
  //     </button>
  //   ),
  //   divider: true
  // },
  // {
  //   key: 'clear',
  //   name: '清除格式',
  //   element: (
  //     <button>
  //       <IconClearFormatting className="rq-icon" />
  //     </button>
  //   ),
  //   divider: false
  // }
]
