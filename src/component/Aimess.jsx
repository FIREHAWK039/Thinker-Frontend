import React from 'react'
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

function Aimess({input,index}) {
  return (
  
<div key={index} className="mr-auto whitespace-pre-wrap break-words leading-7 px-4 mt-5 w-fit max-w-[70%] break-words rounded-lg p-3">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
        {input}
      </ReactMarkdown>
</div>

  )
}

export default Aimess
