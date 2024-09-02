import React, { Fragment } from 'react'
import Quill from 'quill'
import { RQ } from '~/type'
import Popover from '~/components/Popover'

type Props = {
  className?: string
  items?: RQ.ToolbarItem[]
  editor: Quill | null
  namePosition?: 'top' | 'right' | 'bottom' | 'left'
  nameOffset?: string
}

const Toolbar: React.FC<Props> = ({ className, items, editor, namePosition = 'top', nameOffset = '4px' }) => {
  return (
    <div className={['rq-toolbar', className].join(' ')}>
      {(items || []).map((item) => (
        <Fragment key={item.key}>
          <Popover content={item.name} position={namePosition} offset={nameOffset}>
            {item.element(editor)}
          </Popover>
          {item.divider ? <div className="rq-divider"></div> : <></>}
        </Fragment>
      ))}
    </div>
  )
}

export default Toolbar
