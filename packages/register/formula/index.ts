import Embed from 'quill/blots/embed'
import katex from 'katex'

class Formula extends Embed {
  static blotName = 'Formula'
  static className = 'ql-formula'
  static tagName = 'SPAN'

  static create(value: string) {
    const node = super.create(value) as HTMLElement
    katex.render(value, node, {
      throwOnError: false,
      errorColor: '#f00',
      output: 'mathml'
    })
    node.setAttribute('data-value', value)
    return node
  }

  static value(domNode: Element) {
    return domNode.getAttribute('data-value')
  }

  html() {
    const { formula } = this.value()
    return `<span>${formula}</span>`
  }
}

export default Formula
