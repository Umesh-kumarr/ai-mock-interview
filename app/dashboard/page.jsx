import { UserButton } from '@clerk/nextjs'
import React from 'react'

const Dashboard = ({children}) => {
  return (
    <div>
      <UserButton/>
    </div>
  )
}

export default Dashboard
