import React from 'react'
import Back1 from '../assets/images/back1.webp'
import Back2 from '../assets/images/back2.webp'
import Back3 from '../assets/images/back3.jpeg'
import Back4 from '../assets/images/back4.jpeg'
const Background = ({heroCount}) => {
    
    if(heroCount===0){
        return <img src={Back2} alt="Back2" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    }
    else if(heroCount===1){
         return <img src={Back1} alt="Back1" className='w-[100%] h-[100%] float-left overflow-auto object-cover' />
    }
      else if(heroCount===2){
         return <img src={Back3} alt="Back3" className='w-[100%] h-[100%] float-left overflow-auto object-center' />
    }

      else if(heroCount===3){
         return <img src={Back4} alt="Back4" className='w-[100%] h-[100%] float-left overflow-auto object-center' />
    }

   
}

export default Background