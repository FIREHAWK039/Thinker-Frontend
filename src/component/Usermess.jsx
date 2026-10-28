import React from 'react'

function Usermess({input,index}) {
  return (
 
<div key={index} className="ml-auto mt-5 w-fit max-w-[70%] break-words rounded-lg bg-black p-3 text-white">
{input}
</div>
)
}

export default Usermess
