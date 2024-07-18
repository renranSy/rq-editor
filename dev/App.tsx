import React, { useState } from 'react'
import RTEditor from '~/RQEditor'

const App = () => {
  const [value, setValue] = useState('')
  return (
    <div style={{ width: '100%', margin: '8rem auto' }}>
      <RTEditor
        value={value}
        onChange={(content) => {
          setValue(content)
        }}
        custom={[]}
      />
    </div>
  )
}

export default App
