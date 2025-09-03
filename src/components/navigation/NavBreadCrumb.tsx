import { Breadcrumb, Flex, For } from '@chakra-ui/react'
import { Fragment, useEffect, useState } from 'react'
import { LuHouse } from 'react-icons/lu'
import { Link, useLocation } from 'react-router-dom'

export const NavBreadCrumb = () => {
  const location = useLocation()
  const [routesData, setRoutesData] = useState(['/'])

  useEffect(() => {
    const routes = location.pathname.replace('/', '').split('/')
    if (!routes.includes('')) {
      const newRoutesData = [...routes]
      setRoutesData(newRoutesData)
    } else {
      setRoutesData([])
    }
  }, [location])

  return (
    <Breadcrumb.Root marginLeft={'2'}>
      <Breadcrumb.List>
        <Breadcrumb.Item>
          <Breadcrumb.Link asChild>
            <Link to={'/'}>
              <Flex align={'center'} gap={'2'}>
                <LuHouse />
                Home
              </Flex>
            </Link>
          </Breadcrumb.Link>
        </Breadcrumb.Item>

        {routesData.length >= 1 && <Breadcrumb.Separator />}

        <For each={routesData}>
          {(item: string, index: number) => (
            <Fragment key={`${index}-${item}`}>
              <Breadcrumb.Item>
                <Breadcrumb.Link asChild>
                  <Link to={`/${item}`}>{item}</Link>
                </Breadcrumb.Link>
              </Breadcrumb.Item>
              <Breadcrumb.Separator />
            </Fragment>
          )}
        </For>
      </Breadcrumb.List>
    </Breadcrumb.Root>
  )
}
