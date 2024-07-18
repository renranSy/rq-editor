import React from 'react'
import './index.less'

type Props = {
  value?: string | null
  onChange?: (color: string) => void
}

const ColorPicker: React.FC<Props> = ({ value, onChange }) => {
  const colorList = [
    '#000000',
    '#434343',
    '#666666',
    '#999999',
    '#b7b7b7',
    '#cccccc',
    '#d9d9d9',
    '#efefef',
    '#f3f3f3',
    '#ffffff',
    '#900602',
    '#f21006',
    '#f59a00',
    '#fdff00',
    '#57fe00',
    '#5cfeff',
    '#5785e9',
    '#260aff',
    '#940fff',
    '#f417ff',
    '#e2b8af',
    '#f0cccc',
    '#f9e4cd',
    '#fdf2cb',
    '#dbead2',
    '#d2dfe3',
    '#cbdaf9',
    '#d1e1f3',
    '#d9d2e9',
    '#e8d1db',
    '#d47f6b',
    '#e39a99',
    '#f4cb9b',
    '#fce596',
    '#bad6a7',
    '#a5c4c9',
    '#a9c2f5',
    '#a4c5e9',
    '#b4a7d6',
    '#d1a6be',
    '#c34325',
    '#d76766',
    '#efb269',
    '#fad962',
    '#98c47b',
    '#7ca5ae',
    '#759eec',
    '#78a8dd',
    '#8c7cc4',
    '#bc7ca1',
    '#9e1e02',
    '#c20b04',
    '#dd9135',
    '#ecc228',
    '#71a74c',
    '#4f818e',
    '#4978d9',
    '#4c84c7',
    '#654fa7',
    '#a04e79',
    '#7e210e',
    '#910603',
    '#ad6000',
    '#ba9000',
    '#417617',
    '#204f5c',
    '#2856cd',
    '#215395',
    '#351d76',
    '#6f1d48',
    '#561000',
    '#610201',
    '#733f02',
    '#7b6000',
    '#2c4e0e',
    '#15343d',
    '#254488',
    '#153764',
    '#1f134e',
    '#481231'
  ]

  const getValue = () => {
    return value || '#000000'
  }

  return (
    <div className="rq-color-picker">
      <button className="color-btn">
        <div className="color-text">自定义</div>
        <input
          className="color-input"
          onChange={(e) => {
            onChange?.(e.target.value)
          }}
          type="color"
          value="#ffffff"
        />
      </button>
      <div className="selected-color">
        <div
          onClick={() => {
            onChange?.(getValue())
          }}
          className={['color-item', getValue() === '#ffffff' ? 'white-item' : '', 'selected'].join(' ')}
          style={{ borderColor: getValue() }}
        >
          <div style={{ backgroundColor: getValue(), width: '100%', height: '100%' }}></div>
        </div>
      </div>
      <div className="color-list">
        {colorList.map((color) => (
          <div
            key={color}
            onClick={() => {
              onChange?.(color)
            }}
            className={[
              'color-item',
              color === '#ffffff' ? 'white-item' : '',
              color === getValue() ? 'selected' : ''
            ].join(' ')}
            style={{ borderColor: color }}
          >
            <div style={{ backgroundColor: color, width: '100%', height: '100%' }}></div>
          </div>
        ))}
      </div>
      {!value || value === '#000000' ? null : (
        <button onClick={() => {
          onChange?.('#000000')
        }} className="color-btn" style={{ marginTop: '1rem' }}>
          重置
        </button>
      )}
    </div>
  )
}

export default ColorPicker
