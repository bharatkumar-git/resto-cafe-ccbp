/* eslint-disable */
import {useContext} from 'react'

import CartContext from '../Context'

import './index.css'

const FoodItem = props => {
  const {
    decrementCartItemQuantity,
    incrementCartItemQuantity,
    cartList,
  } = useContext(CartContext)

  const {objDetails} = props
  const foodDetails = {
    dishId: objDetails.dish_id,
    addonCat: objDetails.addonCat,
    dishAvailability: objDetails.dish_Availability,
    dishType: objDetails.dish_Type,
    dishCalories: objDetails.dish_calories,
    dishCurrency: objDetails.dish_currency,
    dishDescription: objDetails.dish_description,
    dishImage: objDetails.dish_image,
    dishName: objDetails.dish_name,
    dishPrice: objDetails.dish_price,
    nextUrl: objDetails.nexturl,
  }

  let itemQuantity
  const itemQuantityObj = cartList.find(item => {
    if (item.dishId === foodDetails.dishId) {
      return item.quantity
    }
    return 0
  })
  if (itemQuantityObj == null) {
    itemQuantity = 0
  } else {
    itemQuantity = itemQuantityObj.quantity
  }

  return (
    <li className="foodItem-li">
      <div className="foodType-span-container">
        {foodDetails.dishType === 1 && (
          <span className="foodType-nonVeg-span">Non-Veg</span>
        )}
        {foodDetails.dishType === 2 && (
          <span className="foodType-veg-span">Veg</span>
        )}
      </div>
      <div className="dish-details-container">
        <h2>{foodDetails.dishName}</h2>
        <div style={{display: 'flex', gap: '8px'}}>
          <p>
            {foodDetails.dishCurrency} {foodDetails.dishPrice}
          </p>
        </div>
        <p>{foodDetails.dishDescription}</p>
        {foodDetails.dishAvailability ? (
          <div className="dish-details-counter-container">
            <button
              type="button"
              onClick={() => {
                decrementCartItemQuantity(foodDetails)
              }}
            >
              -
            </button>
            <p>{itemQuantity}</p>
            <button
              onClick={() => {
                incrementCartItemQuantity(foodDetails)
              }}
              type="button"
            >
              +
            </button>
          </div>
        ) : (
          <p className="dish-not-available-span">Not Available</p>
        )}
        {foodDetails.addonCat.length > 0 && (
          <p className="foodItem-customizations-text">
            Customizations available
          </p>
        )}
      </div>
      <p className="dish-calories-span">{foodDetails.dishCalories} calories</p>
      <div className="dish-image-container">
        <img src={foodDetails.dishImage} alt="dish" />
      </div>
    </li>
  )
}
export default FoodItem
