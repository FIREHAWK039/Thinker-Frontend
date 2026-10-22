import React from 'react'
import Sidebar from '../component/Sidebar'
import { useState } from 'react';
import Usermess from '../component/usermess';
import ChatBox from '../component/Chatbox';
import Aimess from '../component/Aimess';




function Home() {
    const [collapsed, setCollapsed] = useState(false);


    return (<>
        <div className="relative h-screen ">
            <div className='fixed'>

                  <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />

            </div>
          
            <div className=' absolute  top-0 left-85  w-[80%]'>

              <Usermess/>
              <Aimess/>
              
              <Usermess/>
              <Aimess/>

              
              <Usermess/>
              <Aimess/>

              
              <Usermess/>
              <Aimess/>

                
        

            </div>

            <div className='fixed bottom-40 left-190 w-4xl max-w-4xl'>
                <ChatBox />
            </div>
            <main >




            </main>
        </div>


    </>
    )
}

export default Home