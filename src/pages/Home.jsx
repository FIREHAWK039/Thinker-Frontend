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

useEffect(() => {
  console.log("Updated message list:", messagelist);
}, [messagelist]);


    async function clearchat() {
    
    const response = await axios.post(
      "http://localhost:8000/api/v1/chat/clear-chat"
      
    );
    
    console.log(response)
  
  setmessagelist([]); // Clear frontend messages
}
  
  const handleSend = async (input) => {
  try {
  console.log("in axios");
    const response = await axios.post(
      "http://localhost:8000/api/v1/chat/chats",
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
