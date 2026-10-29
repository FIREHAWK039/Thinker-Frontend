import { useState,useEffect } from "react";
import axios from "axios";

import Sidebar from "../component/Sidebar";
import Usermess from "../component/Usermess";
import ChatBox from "../component/Chatbox";
import Aimess from "../component/Aimess";
import DSAPlayer from "../component/DSAPlayer";

function Home() {
const [collapsed, setCollapsed] = useState(false);
    const [messagelist,setmessagelist] = useState([ ]);
    const [show, setShow] = useState(false);

useEffect(() => {
  console.log("Updated message list:", messagelist);
}, [messagelist]);


    async function clearchat() {
    
    const response = await axios.post(
      "http://localhost:8001/api/v1/users/clear-chat"
      
    );
    
    console.log(response)
  
  setmessagelist([]); // Clear frontend messages
}
  
  const handleSend = async (input) => {
  try {
  console.log("in axios");
    const response = await axios.post(
      "http://localhost:8001/api/v1/users/chats",
      {
        message: input
      }
    );

    console.log("Backend response:", response.data.data.message);

    return response.data.data.message;
  } catch (error) {
    console.error("Error sending message:", error);
  }
};
    
    
const onmessagesend = async (input) => {
  // Add user message
  setmessagelist((prevMessages) => [
    ...prevMessages,
    { role: "user", content: input }
  ]);

  try {
    // Get AI response from backend
    const aimessage = await handleSend(input);

    // Add AI response
    setmessagelist((prevMessages) => [
      ...prevMessages,
      { role: "ai", content: aimessage }
    ]);
    
    console.log("list of messages:",messagelist);
  } catch (error) {
    console.error("Error getting AI response:", error);
  }
};

    
    

    return (
        <div className="flex h-dvh w-full overflow-hidden bg-zinc-50">

            {/* Sidebar */}
            <Sidebar
                collapsed={collapsed}
                setCollapsed={setCollapsed}
                clearchat={clearchat}
            />

            {/* Main Chat Section */}
            <main className="flex min-w-0 flex-1 flex-col">

                {/* Messages Area */}
                <section className="min-h-0 flex-1 overflow-y-auto">
                    <div className="mx-auto flex w-full max-w-3xl flex-col gap-6 px-4 py-6">
                    
                    {messagelist.map((message, index) => {
  if (message.role === "user") {
    return (
      <Usermess
        
        input={message.content}
        index={index}
      />
    )};
    
  if (message.role === "ai") {
    return (
      <Aimess
       
        input={message.content}
        index={index}
      />
    );
  }

  
})}

                        

                    </div>
                </section>
                

<div className="flex w-full flex-col items-center gap-4 p-6">
      <button
        onClick={() => setShow((prev) => !prev)}
        className="rounded-lg bg-blue-600 px-5 py-2 font-semibold text-white hover:bg-blue-500"
      >
        {show ? "Hide Visualization" : "Show Visualization"}
      </button>

      {show && (
        <div className="w-full max-w-3xl">
          <DSAPlayer
            data={{ array: [4, 6, 7, 8, 9, 10, 15, 17, 19, 20, 25], target: 20 }}
          />
        </div>
      )}
    </div>
                

                {/* Chat Input Area */}
                <footer className="w-full shrink-0 bg-zinc-50 px-4 pb-4 pt-2">
                    <div className="mx-auto w-full max-w-3xl">
                        <ChatBox onSend={onmessagesend} />
                    </div>
                </footer>

            </main>

        </div>
    );
}

export default Home;
