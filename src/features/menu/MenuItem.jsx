// MenuItem.jsx
import { useDispatch, useSelector } from 'react-redux'
import Button from '../../ui/Button'
import { formatCurrency } from '../../utils/helpers'
import PropTypes from 'prop-types'
import { addItem, getCurrentQuantityById } from '../cart/cartSlice'
import DeleteItem from '../cart/DeleteItem'
import UpdateItemQuantity from '../cart/UpdateItemQuantity'

export default function MenuItem({ pizza }) {
  const dispatch = useDispatch()
  if (!pizza) {
    return null
  }

  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza

  const currentQuantity = useSelector(getCurrentQuantityById(id))

  const isInCart = currentQuantity > 0

  function handleAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    }
    dispatch(addItem(newItem))
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        className={`h-24 ${soldOut ? 'opacity-70 grayscale' : ''}`}
        src={imageUrl || ''}
        alt={name || ''}
      />
      <div className="flex grow flex-col pt-0.5">
        <p className="font-medium">{name || ''}</p>
        <p className="italic, text-sm capitalize text-stone-500">
          {Array.isArray(ingredients) ? ingredients.join(', ') : ''}
        </p>
        <div className="mt-auto flex items-center justify-between">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice || 0)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {isInCart && (
            <div className="flex items-center gap-3 sm:gap-8">
              <UpdateItemQuantity
                pizzaId={id}
                currentQuantity={currentQuantity}
              />
              <DeleteItem pizzaId={id} />
            </div>
          )}
          {!soldOut && !isInCart && (
            <Button type="small" onClick={handleAddToCart}>
              Add to cart
            </Button>
          )}
        </div>
      </div>
    </li>
  )
}

MenuItem.propTypes = {
  pizza: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    unitPrice: PropTypes.number,
    ingredients: PropTypes.array,
    soldOut: PropTypes.bool,
    imageUrl: PropTypes.string,
  }).isRequired,
}
