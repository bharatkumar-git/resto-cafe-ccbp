import {useContext} from 'react'
import {FaShoppingCart} from 'react-icons/fa'

import CartContext from '../Context'

import './index.css'

const Header = () => {
  const {cartList} = useContext(CartContext)
  const filteredCartList = cartList.filter(item => item.quantity > 0)
  const ordersCount = filteredCartList.length
  return (
    <nav className="navbar">
      <h1 className="logo-text">UNI Resto Cafe</h1>
      <div className="navbar-cart-container">
        <span>My Orders</span>
        <button type="button">
          <FaShoppingCart size={20} />
          <div>
            <span>{ordersCount}</span>
          </div>
        </button>
      </div>
    </nav>
  )
}

export default Header
