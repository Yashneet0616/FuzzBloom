import { ORDER_STATUS } from '../constants/orderStatus'

export function normalizeStatus(status) {
  switch (status) {
    case 'Confirmed':
      return ORDER_STATUS.ACCEPTED

    case 'In Progress':
      return ORDER_STATUS.PREPARING

    case 'Completed':
      return ORDER_STATUS.DELIVERED

    default:
      return status
  }
}

export function getStatusColor(status) {
  switch (normalizeStatus(status)) {
    case ORDER_STATUS.DELIVERED:
      return 'bg-green-100 text-green-700'

    case ORDER_STATUS.ACCEPTED:
      return 'bg-blue-100 text-blue-700'

    case ORDER_STATUS.PREPARING:
      return 'bg-purple-100 text-purple-700'

    case ORDER_STATUS.SHIPPED:
      return 'bg-cyan-100 text-cyan-700'

    case ORDER_STATUS.CANCELLED:
      return 'bg-red-100 text-red-700'

    default:
      return 'bg-yellow-100 text-yellow-700'
  }
}