import React, { useEffect, useState } from 'react'
import Background from '../component/Background'
import Hero from '../component/Hero'
import Product from './Product'
import OurPolicy from '../component/OurPolicy'
import NewLetterBox from '../component/NewLetterBox'
import Footer from '../component/Footer'


const Home = () => {
  let heroData = [
    {text1:'This is Text1',text2:'This is text 2'},
    {text1:'This is Text1',text2:'This is text 2'},
    {text1:'This is Text1',text2:'This is text 2'},
    {text1:'This is Text1',text2:'This is text 2'},
  ]

  let [heroCount,setHeroCount] = useState(0)

  useEffect(()=>{
    let interval = setInterval(()=>{
      setHeroCount(prevCount=>(prevCount===3 ? 0 : prevCount+1))
    },3000)

      return ()=> clearInterval(interval)

  },[])

  return (
    <>
    <div className='w[100-vw] h-[100vh] bg-gradient-to-l from-[#141414] to-[#0c2025]'>
       
       <Background heroCount={heroCount}/>
       <Hero  heroCount={heroCount}
       setHeroCount={setHeroCount}
       heroData={heroData[heroCount]}/>

    </div>

      <div>
          <Product/>
          <OurPolicy/>
          <NewLetterBox/>
          <Footer/>
      </div>
       </>

  )
}

export default Home