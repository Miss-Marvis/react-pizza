import { useLoaderData } from 'react-router-dom'
import { getMenu } from '../../services/apiRestaurant'
import MenuItem from './MenuItem'
import Loader from '../../ui/Loader'

function Menu() {
  const menu = useLoaderData()

  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => {
        return <MenuItem pizza={pizza} key={pizza.id} />
      })}
    </ul>
  )
}

export async function loader() {
  try {
    const menu = await getMenu()

    // Validate menu data
    if (!menu || !Array.isArray(menu)) {
      throw new Error('Invalid menu data received from API')
    }

    return menu
  } catch (error) {
    console.error('Error loading menu:', error)

    throw new Response(`Error loading menu: ${error.message}`, {
      status: 500,
      statusText: error.message,
    })
  }
}

export default Menu
