import Block from 'quill/blots/block'

class LineHeightBlot extends Block {
  static blotName = 'line-height'
  static tagName = 'div'

  static create(value: string) {
    const node = super.create()
    node.style.lineHeight = value
    return node
  }

  static formats(node: HTMLElement) {
    return node.style.lineHeight
  }
}

export default LineHeightBlot
