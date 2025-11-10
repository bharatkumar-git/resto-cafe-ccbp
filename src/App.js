import {useState} from 'react'

import CartContext from './components/Context'
import Home from './components/Home'

import './App.css'

// write your code here
const App = () => {
  const [cartList, setCartList] = useState([])

  const incrementCartItemQuantity = foodDetails => {
    const itemInCart = cartList.find(item => item.dishId === foodDetails.dishId)
    if (itemInCart != null) {
      setCartList(prev =>
        prev.map(item => {
          if (item.dishId === foodDetails.dishId) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        }),
      )
    } else {
      setCartList(prev => [...prev, {...foodDetails, quantity: 1}])
    }
  }
  const decrementCartItemQuantity = foodDetails => {
    const itemInCart = cartList.find(item => item.dishId === foodDetails.dishId)
    if (itemInCart != null) {
      setCartList(prev =>
        prev.map(item => {
          if (item.dishId === foodDetails.dishId) {
            let newQuanity
            if (item.quantity >= 1) {
              newQuanity = item.quantity - 1
            } else {
              newQuanity = 0
            }
            return {...item, quantity: newQuanity}
          }
          return item
        }),
      )
    }
  }
  return (
    <CartContext.Provider
      value={{cartList, incrementCartItemQuantity, decrementCartItemQuantity}}
    >
      <Home />
    </CartContext.Provider>
  )
}

export default App
