import { isEmailInWelfare } from '@/lib/isUserFromBIT'
import React from 'react'

export default function page() {
  return (
    <div className='mt-20'>
      {
       isEmailInWelfare("bitmesra@bitmesra.ac.in") ? "yes" : "no"
      }
    </div>
  )
}
