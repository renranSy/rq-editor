import Quill from 'quill'
import LineHeightBlot from '~/register/lineHeight'
import FontSizeBlot from '~/register/fontSize'
import Formula from '~/register/formula'

Quill.register(LineHeightBlot)
Quill.register(FontSizeBlot)
Quill.register(Formula)

export default Quill
