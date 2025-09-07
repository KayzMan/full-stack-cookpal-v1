import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { routes } from './lib/routes'

// components...
import { SidebarWithHeader } from './components/navigation/SideBar'

// pages...
import { Home } from './pages/Home'
import { MealCategories } from './pages/MealCategories'
import { FilterMealsByCategory } from './pages/FilterMealsByCategory'
import { SingleMeal } from './pages/SingleMeal'
import { SearchPage } from './pages/SearchPage'

export function App() {
  return (
    <BrowserRouter>
      <SidebarWithHeader>
        <Routes>
          <Route path={routes.home} id='home' element={<Home />} />
          <Route path={routes.search} id='search' element={<SearchPage />} />
          <Route
            path={routes.mealCategories}
            id='mealCategories'
            element={<MealCategories />}
          />
          <Route
            path={routes.filterMealByCategory}
            id='filterMealBtCategory'
            element={<FilterMealsByCategory />}
          />
          <Route
            path={routes.singleMeal}
            id='singleMeal'
            element={<SingleMeal />}
          />
        </Routes>
      </SidebarWithHeader>
    </BrowserRouter>
  )
}
