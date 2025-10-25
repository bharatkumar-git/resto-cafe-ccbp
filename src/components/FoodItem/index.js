import './index.css'

const FoodItem = ({objDetails, incrementQuantity, derementQuantity}) => {
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
    quantity: objDetails.quantity ?? 0,
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
          <p>{foodDetails.dishCurrency}</p>
          <p>{foodDetails.dishPrice}</p>
        </div>
        <p>{foodDetails.dishDescription}</p>
        {foodDetails.dishAvailability ? (
          <div className="dish-details-counter-container">
            <button
              onClick={() => derementQuantity(foodDetails.dishId)}
              type="button"
            >
              -
            </button>
            <span>{foodDetails.quantity}</span>
            <button
              onClick={() => incrementQuantity(foodDetails.dishId)}
              type="button"
            >
              +
            </button>
          </div>
        ) : (
          <p className="dish-not-available-span">Not Available</p>
        )}
        {foodDetails.addonCat.length > 0 && (
          <span className="foodItem-customizations-text">
            Customizations available
          </span>
        )}
      </div>
      <span className="dish-calories-span">
        {foodDetails.dishCalories} calories
      </span>
      <div className="dish-image-container">
        <img src={foodDetails.dishImage} alt="dish" />
      </div>
    </li>
  )
}
export default FoodItem
