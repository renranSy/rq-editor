import React, { useEffect, useRef, useState } from 'react'
import { IconChevronDown } from '@tabler/icons-react'
import { RQ } from '~/type'

type Props = {
  value: RQ.Value
  onChange: (value: RQ.Value) => void
  item: (value: RQ.Value) => React.ReactNode
  options: SelectOption[]
}

type SelectOption = {
  value: RQ.Value
  element: React.ReactNode
}

const Select: React.FC<Props> = ({ value, options, item, onChange }) => {
  const btnRef = useRef<HTMLButtonElement>(null)
  const [optionsActive, setOptionsActive] = useState(false)
  const optionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const callback = () => {
      hideOptions()
    }
    document.addEventListener('click', callback)

    return () => {
      document.removeEventListener('click', callback)
    }
  })

  const showOptions = () => {
    if (!optionsRef.current || !btnRef.current) {
      return
    }
    btnRef.current.style.backgroundColor = '#f2f5f9'
    optionsRef.current.style.display = 'flex'
    setTimeout(() => {
      optionsRef.current!.style.opacity = '1'
      optionsRef.current!.style.zIndex = '99'
    }, 0)
    setOptionsActive(true)
  }

  const hideOptions = () => {
    if (!optionsRef.current || !btnRef.current) {
      return
    }
    btnRef.current.style.backgroundColor = '#ffffff'
    optionsRef.current.style.opacity = '0'
    optionsRef.current.style.zIndex = '-99'
    setTimeout(() => {
      optionsRef.current!.style.display = 'none'
    }, 200)
    setOptionsActive(false)
  }

  const onClickBtn = () => {
    if (optionsActive) {
      hideOptions()
    } else {
      showOptions()
    }
  }

  const onClickOption = (item: SelectOption) => {
    if (item.value === value) {
      onChange(options[0].value)
    } else {
      onChange(item.value)
    }
    setTimeout(() => {
      hideOptions()
    }, 100)
  }

  return (
    <>
      <div
        className="rq-select"
        onMouseLeave={(e) => {
          e.stopPropagation()
          hideOptions()
        }}
      >
        <button
          className="rq-button"
          ref={btnRef}
          onMouseEnter={(e) => {
            e.stopPropagation()
            showOptions()
          }}
        >
          {item(value)}
          <IconChevronDown className="rq-icon rq-icon-down" />
        </button>
        <div ref={optionsRef} className="rq-options">
          {options.map((item, index) => (
            <div
              key={index}
              className={['rq-option-item', value === item.value ? 'rq-option-active' : ''].join(' ')}
              onClick={(e) => {
                e.stopPropagation()
                onClickOption(item)
              }}
            >
              {item.element}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default Select
