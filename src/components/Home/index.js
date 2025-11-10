import {useEffect, useState} from 'react'

import Header from '../Header'
import TabItem from '../TabItem'
import FoodItem from '../FoodItem'
import './index.css'

// write your code here
const Home = () => {
  const [hotelData, setHotelData] = useState({})
  const tableMenuList = hotelData.table_menu_list ?? []
  const [activeTabId, setActiveTabId] = useState(0)
  const selectedTabItem = tableMenuList.find(
    item => item.menu_category_id === activeTabId,
  )
  const selectedTabDishesList =
    (selectedTabItem && selectedTabItem.category_dishes) ?? []

  // const incrementQuantity = itemId => {
  //   const updatedDishesList = selectedTabDishesList.map(item => {
  //     if (item.dish_id === itemId) {
  //       const newQuantity = item.quantity == null ? 1 : item.quantity + 1
  //       return {...item, quantity: newQuantity}
  //     }
  //     return item
  //   })
  //   setHotelData(prev => ({
  //     ...prev,
  //     table_menu_list: prev.table_menu_list.map(tabItem => {
  //       if (tabItem.menu_category_id === activeTabId) {
  //         return {...tabItem, category_dishes: updatedDishesList}
  //       }
  //       return tabItem
  //     }),
  //   }))
  // console.log(updatedDishesList)
  // }
  // const derementQuantity = itemId => {
  //   // const newQuantity =
  //   setHotelData(prev => ({
  //     ...prev,
  //     table_menu_list: prev.table_menu_list.map(tabItem => {
  //       if (tabItem.menu_category_id === activeTabId) {
  //         return {
  //           ...tabItem,
  //           category_dishes: tabItem.category_dishes.map(dishItem => {
  //             if (dishItem.dish_id === itemId) {
  //               let newQuantity = 0
  //               if (dishItem.quantity == null) {
  //                 newQuantity = 0
  //               } else if (dishItem.quantity > 0) {
  //                 newQuantity = dishItem.quantity - 1
  //               } else {
  //                 newQuantity = 0
  //               }
  //               return {...dishItem, quantity: newQuantity}
  //             }
  //             return dishItem
  //           }),
  //         }
  //       }
  //       return tabItem
  //     }),
  //   }))
  // }
  // let ordersCount = 0
  // if (hotelData.table_menu_list != null) {
  //   hotelData.table_menu_list.forEach(tabItem => {
  //     tabItem.category_dishes.forEach(dishItem => {
  //       const ordered = dishItem.quantity && dishItem.quantity > 0
  //       if (ordered) {
  //         ordersCount += 1
  //       }
  //     })
  //   })
  // }
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
        console.log(data.error_msg)
      }
    }
    fetchData()
  }, [])
  // console.log(hotelData)
  return (
    <div className="app-container">
      <Header />
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
            <FoodItem key={item.dish_id} objDetails={item} />
          ))}
        </ul>
      </div>
    </div>
  )
}

export default Home
