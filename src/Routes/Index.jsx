import React from 'react'
import { UserProvider } from '../auth/hooks/UseContext'
import LayoutRoutes from './LayoutRoutes'


//pero que dato ?
export default function Index() {
 
  return (
    <UserProvider>
      <LayoutRoutes/>
    </UserProvider>

  )
}
