// import React from 'react'

// import { Link } from 'react-router-dom'
import LinkButton from '../../ui/LinkButton'

export default function EmptyCart() {
  return (
    <div className="px-3 py-3">
      <LinkButton to="/menu">&larr; Back to menu</LinkButton>

      <p className="mt-7 font-semibold">
        Your cart is still empty, start adding some pizzas :)
      </p>
    </div>
  )
}
