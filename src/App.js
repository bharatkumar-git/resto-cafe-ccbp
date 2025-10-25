import {useEffect, useState} from 'react'
import {FaShoppingCart} from 'react-icons/fa'

import TabItem from './components/TabItem'
import FoodItem from './components/FoodItem'
import './App.css'

// write your code here
const App = () => {
  const [hotelData, setHotelData] = useState({})
  const tableMenuList = hotelData.table_menu_list ?? []
  const [activeTabId, setActiveTabId] = useState(0)
  const selectedTabItem = tableMenuList.find(
    item => item.menu_category_id === activeTabId,
  )
  const selectedTabDishesList =
    (selectedTabItem && selectedTabItem.category_dishes) ?? []

  const incrementQuantity = itemId => {
    const updatedDishesList = selectedTabDishesList.map(item => {
      if (item.dish_id === itemId) {
        const newQuantity = item.quantity == null ? 1 : item.quantity + 1
        return {...item, quantity: newQuantity}
      }
      return item
    })
    setHotelData(prev => ({
      ...prev,
      table_menu_list: prev.table_menu_list.map(tabItem => {
        if (tabItem.menu_category_id === activeTabId) {
          return {...tabItem, category_dishes: updatedDishesList}
        }
        return tabItem
      }),
    }))
    // console.log(updatedDishesList)
  }
  const derementQuantity = itemId => {
    // const newQuantity =
    setHotelData(prev => ({
      ...prev,
      table_menu_list: prev.table_menu_list.map(tabItem => {
        if (tabItem.menu_category_id === activeTabId) {
          return {
            ...tabItem,
            category_dishes: tabItem.category_dishes.map(dishItem => {
              if (dishItem.dish_id === itemId) {
                let newQuantity = 0
                if (dishItem.quantity == null) {
                  newQuantity = 0
                } else if (dishItem.quantity > 0) {
                  newQuantity = dishItem.quantity - 1
                } else {
                  newQuantity = 0
                }
                return {...dishItem, quantity: newQuantity}
              }
              return dishItem
            }),
          }
        }
        return tabItem
      }),
    }))
  }
  let ordersCount = 0
  if (hotelData.table_menu_list != null) {
    hotelData.table_menu_list.forEach(tabItem => {
      tabItem.category_dishes.forEach(dishItem => {
        const ordered = dishItem.quantity && dishItem.quantity > 0
        if (ordered) {
          ordersCount += 1
        }
      })
    })
  }
  // eslint-disable-next-line
  useEffect(() => {
    const fetchData = async () => {
      const apiUrl =
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details'
      const response = await fetch(apiUrl)
      const data = await response.json()
      if (response.ok) {
        const restaurantData = data[0]
        setHotelData(restaurantData)
        setActiveTabId(restaurantData.table_menu_list[0].menu_category_id)
      } else {
        console.log(data.err_msg)
      }
    }
    fetchData()
  }, [])
  console.log(hotelData)
  return (
    <div className="app-container">
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
      <div className="content-container">
        <ul className="content-tabs-ul">
          {tableMenuList.map(item => (
            <TabItem
              key={item.menu_category_id}
              objDetails={item}
              activeTabId={activeTabId}
              setActiveTabId={setActiveTabId}
            />
          ))}
        </ul>
        <ul className="content-foods-ul">
          {selectedTabDishesList.map(item => (
            <FoodItem
              key={item.dish_id}
              objDetails={item}
              derementQuantity={derementQuantity}
              incrementQuantity={incrementQuantity}
            />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App
