import React from 'react'
// import { StoreContext } from '../App'
import sadFrog from '../images/sadFrog.png'
import banner from '../images/banner.jpeg'

export default function Home() {
  // const { userData } = useContext(StoreContext)

  return (
    <>
      <div className="">
        <div className='flex justify-center text-2xl text-red-700'>Destiny Item Viewer</div>
        <div className='flex justify-center text-sm text-red-700'>
          (item viewing coming soon™)
        </div>
        <div>
          <img src={banner} alt='banner' />
        </div>
        {/* <div className='flex'>
          <div>
            <img src={sadFrog} alt='sadfrog' />
          </div>
          <div className=''>
            This was going to be an error page he just needs somewhere to stay
          </div>
        </div> */}
      </div>
    </>
  )
}
