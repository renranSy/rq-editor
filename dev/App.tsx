import React, { useState } from 'react'
import RTEditor from '~/RQEditor'

const App = () => {
  const [value, setValue] = useState('123456789')
  return (
    <>
      <RTEditor
        value={value}
        onChange={(content) => {
          console.log(content)
          setValue(content)
        }}
        custom={[]}
      />
    </>
  )
}

export default App
