// import React from 'react'

import PropTypes from 'prop-types'
import { formatCurrency } from '../../utils/helpers'

export default function OrderItem({ item, isLoadingIngredients, ingredients }) {
  const { quantity, name, totalPrice } = item

  return (
    <li className="space-y-1 py-3">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="flex gap-2">
          <span className="font-bold">{quantity}&times;</span>
          {name}
        </p>{' '}
        <p className="font-bold">{formatCurrency(totalPrice)}</p>
      </div>
      <p className="text-sm capitalize italic text-stone-500">
        {isLoadingIngredients ? 'Loading...' : ingredients.join(', ')}
      </p>
    </li>
  )
}

OrderItem.propTypes = {
  item: PropTypes.shape({
    quantity: PropTypes.number,
    name: PropTypes.string,
    totalPrice: PropTypes.number,
  }).isRequired,
  isLoadingIngredients: PropTypes.bool,
  ingredients: PropTypes.array,
}
