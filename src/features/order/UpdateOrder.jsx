// import React from 'react'
import { useFetcher } from 'react-router-dom'
import Button from '../../ui/Button'
import { updateOrders } from '../../services/apiRestaurant'

export default function UpdateOrder({ order }) {
  const fetcher = useFetcher()

  return (
    <fetcher.Form method="PATCH" className="text-right">
      <Button type="primary">Make priority</Button>
    </fetcher.Form>
  )
}

export async function action({ request, params }) {
  const data = { priority: true }
  await updateOrders(params.orderId, data)
  return null
}
