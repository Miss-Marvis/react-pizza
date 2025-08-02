// import React from 'react'
import PropTypes from 'prop-types'

import { formatCurrency } from '../../utils/helpers'
import Button from '../../ui/Button'
import DeleteItem from './DeleteItem'
import UpdateItemQuantity from './UpdateItemQuantity'
import { useSelector } from 'react-redux'
import { getCurrentQuantityById } from './cartSlice'

export default function CartItem({ item }) {
  const { pizzaId, name, quantity, totalPrice } = item

  const currentQuantity = useSelector(getCurrentQuantityById(pizzaId))

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between sm:gap-6">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-end gap-3">
        <UpdateItemQuantity
          pizzaId={pizzaId}
          currentQuantity={currentQuantity}
        />
        <DeleteItem pizzaId={pizzaId} />
      </div>
    </li>
  )
}

CartItem.propTypes = {
  item: PropTypes.shape({
    pizzaId: PropTypes.number,
    name: PropTypes.string,
    quantity: PropTypes.number,
    totalPrice: PropTypes.number,
  }).isRequired,
}
