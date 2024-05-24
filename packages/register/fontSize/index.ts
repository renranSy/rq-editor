import Inline from 'quill/blots/inline'

class FontSizeBlot extends Inline {
  static blotName = 'font-size'
  static tagName = 'span'

  static create(value: number) {
    const node = super.create()
    node.style.fontSize = `${value}px`
    return node
  }

  static formats(node: HTMLElement) {
    return node.style.fontSize
  }
}

export default FontSizeBlot
