import React from 'react'
import Herobanner from '@/Components/Banner/Herobanner'
import Welcome from '@/Components/Welcome/Welcome'
import Courses from '@/Components/Courses/Courses'
import Whychooseus from '@/Components/Whychooseus/Whychooseus'
import Contactus from '@/Components/Contactus/Contactus'
import Feedback from '@/Components/Feedback/Feedback'
import Card1 from '@/Components/Card/Card1'
import New from '@/Components/New/New'
import Card2 from '@/Components/Card/Card2'
export default function page() {
  return (
    <>
      <Herobanner />
      <Welcome/>
      <Courses />
      <Whychooseus />
      <New/>
      <Card1/>
      <Card2/>
      <Contactus/>
      {/* <Feedback/> */}
    </>
  )
}
