import React, { useState } from 'react'
import RTEditor from '~/RQEditor'
import Quill from '~/register'

const App = () => {
  const [value, setValue] = useState('')
  const [editor, setEditor] = useState<Quill>()

  return (
    <>
      <div style={{ width: '100%', margin: '8rem auto' }}>
        <RTEditor
          icon={{ popName: { show: true, position: 'right', offset: '220px' }, size: '32px', color: 'red', hoverColor: 'black' }}
          onCreate={(editor) => {
            setEditor(editor)
          }}
          value={value}
          onChange={(content) => {
            setValue(content)
          }}
        />
      </div>
    </>
  )
}

export default App
