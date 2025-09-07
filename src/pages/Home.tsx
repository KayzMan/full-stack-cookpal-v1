// components...
import { HomeMealCategories } from '@/components/Home/HomeMealCategories'
import { HomeLatestMeals } from '@/components/Home/HomeLatestMeals.tsx'
import { HomeRandomMeals } from '@/components/Home/HomeRandomMeals'

export const Home = () => {
  return (
    <>
      <HomeLatestMeals />
      <HomeMealCategories />
      <HomeRandomMeals />
    </>
  )
}
