import React from 'react'
import SlideBanner from '../components/SlideBanner'
import VolunteerBanner from '../components/VolunteerBanner'

function Main() {
  console.log(process.env.VITE_API_GATEWAY_HOST);
  return (
    <main>
      <SlideBanner />
      <VolunteerBanner />
    </main>
    
  )
}

export default Main