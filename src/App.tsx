import { Box, Separator } from '@chakra-ui/react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { routes } from './lib/routes'

// components...
import { NavBar } from './components/navigation/NavBar'

// pages...
import { Home } from './pages/Home'
import { MealCategories } from './pages/MealCategories'
import { FilterMealsByCategory } from './pages/FilterMealsByCategory'
import { SingleMeal } from './pages/SingleMeal'

export function App() {
  return (
    <BrowserRouter>
      <NavBar />

      <Box px={'8'}>
        <Separator mb={'4'} />
        <Routes>
          <Route path={routes.home} id='home' element={<Home />} />
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
      </Box>
    </BrowserRouter>
  )
}
