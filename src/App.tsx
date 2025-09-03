import { Separator } from '@chakra-ui/react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { NavBar } from './components/NavBar';

import { routes } from './lib/routes';

// components...

// pages...
import { Home } from './pages/Home';
import { MealCategories } from './pages/MealCategories';

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
      </Routes>
    </BrowserRouter>
  );
}
