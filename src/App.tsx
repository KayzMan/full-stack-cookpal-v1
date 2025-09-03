import { Separator } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { routes } from './lib/routes';

// components...
import { NavBar } from './components/navigation/NavBar';

// pages...
import { Home } from './pages/Home';
import { MealCategories } from './pages/MealCategories';
import { FilterMealsByCategory } from './pages/FilterMealsByCategory';

export function App() {
  return (
    <BrowserRouter>
      <NavBar />

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
      </Routes>
    </BrowserRouter>
  );
}
