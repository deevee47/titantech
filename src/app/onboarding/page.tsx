"use client"
import { OnboardCustomer } from '@/components/onboarding'
import Image from 'next/image'
import React from 'react'

const Home = () => {
  return (
    <div className='relative'>
      <Image 
        className='absolute z-10 top-10 left-10' 
        src="/secondarylogo.svg" 
        alt="Logo" 
        width={100} 
        height={100} 
      />
      <OnboardCustomer />
    </div>
  )
}

export default Home;