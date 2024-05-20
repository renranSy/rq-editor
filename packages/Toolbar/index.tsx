import React, { Fragment } from 'react'
import Quill from 'quill'
import { RQ } from '~/type'

type Props = {
  className?: string
  items?: RQ.ToolbarItem[]
  editor: Quill | null
}

const Toolbar: React.FC<Props> = ({ className, items, editor }) => {
  return (
    <div className={['rq-toolbar', className].join(' ')}>
      {(items || []).map((item) => (
        <Fragment key={item.key}>
          {item.element(editor)}
          {item.divider ? <div className="rq-divider"></div> : <></>}
        </Fragment>
      ))}
    </div>
  )
}

export default Toolbar
