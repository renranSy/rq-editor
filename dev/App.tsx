import React, { useState } from 'react'
import RTEditor from '~/RTEditor'

const App = () => {
  const [value, setValue] = useState('<p>111</p>')
  return (
    <>
      <RTEditor
        value={value}
        onChange={(content) => {
          console.log(content)
          setValue(content)
        }}
      />
    </>
  )
}

export default App
