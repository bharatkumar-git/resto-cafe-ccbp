// import {useState} from 'react'

import './index.css'

const TabItem = ({objDetails, activeTabId, setActiveTabId}) => {
  const menuCategoryId = objDetails.menu_category_id
  const menuCategory = objDetails.menu_category
  const selectedTabClass = activeTabId === menuCategoryId ? 'selected-tab' : ''
  return (
    <li>
      <button
        type="button"
        onClick={() => {
          setActiveTabId(menuCategoryId)
        }}
        className={selectedTabClass}
      >
        {menuCategory}
      </button>
    </li>
  )
}

export default TabItem
