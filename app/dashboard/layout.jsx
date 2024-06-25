import React from 'react'
import Header from '../../components/ui/Header'

function dashboardLayout({children}) {
  return (
    <div >
         <div className='mx-5 md:mx-20 lg:mx-36'>
      <Header/>
        {children}
         </div>
    </div>
  )
}

export default dashboardLayout