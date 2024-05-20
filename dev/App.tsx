import React, { useState } from 'react'
import RTEditor from '~/RQEditor'

const App = () => {
  const [value, setValue] = useState('')
  return (
    <>
      <RTEditor
        value={value}
        onChange={(content) => {
          setValue(content)
        }}
        custom={[]}
      />
    </>
  )
}

export default App
