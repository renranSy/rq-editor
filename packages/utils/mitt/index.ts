import mitt from '~/utils/mitt/core'

type Events = {
  'show-option': string
}

const EventEmitter = mitt<Events>()

export default EventEmitter
