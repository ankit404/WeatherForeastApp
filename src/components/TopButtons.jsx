import React from 'react'

function Topbuttons({setQuery}) {
    const cities=[
        {
            id:1,
            title:'london'
        },
        {
            id:2,
            title:'Sydney'
        },
        {
            id:3,
            title:'Tokyo'
        },
        {
            id:4,
            title:'Toronto'
        },
        {
            id:5,
            title:'Paris'
        },
    ]

  return (
  <div className="flex items-center justify-around my-3">
    {cities.map((city)=> (
            <button 
            key={city.id} 
            className="text-white text-lg font-medium"
            onClick={()=>setQuery({q:city.title})}>
                {city.title}</button>
    ))}
  </div>
  );
}
export default Topbuttons