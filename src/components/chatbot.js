
import React, { useState} from "react";
import '@chatscope/chat-ui-kit-styles/dist/default/styles.min.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHandHoldingMedical } from '@fortawesome/free-solid-svg-icons';
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  TypingIndicator,
} from '@chatscope/chat-ui-kit-react';
require('dotenv').config();



const API_KEY = process.env.REACT_APP_API_KEY;


const ChatBot = () => {
     
    const userName = sessionStorage.getItem('name') ? sessionStorage.getItem('name') : 'Guest'
    const [messages, setMessages] = useState([
        {
          message: "Hello, I'm Zahara! Ask me anything!",
          sentTime: "just now",
          sender: "Zahara",
        },
      ]);
      const mySymptoms =  sessionStorage.getItem('symptoms') ? sessionStorage.getItem('symptoms').split(',') : []
   

     const contextObj = { 'client': `My name is ${userName} my symptoms are ${mySymptoms}, this information should help you suggest better responses to my personal need, no need for greetings you've already met me `,
                           'goal': 'Your main goal is to unravel my unconcious mind, we will do this through the lens of Psycho-Analytical theory by Sigmund Freud, you will also study Carl Jung Psycho-analysis findings,',
                            'does':'any message I send you with :: at the very start of a text means Im sending you propaganda and I want you to decipher it '  }


      
    const [isTyping, setIsTyping] = useState(false);
 
  
    const  handleSendRequest = async (message) => {
        const newMessage = {
            message,
            direction: 'outgoing',
            sender: "user",
          };

          setMessages((messages) => [...messages, newMessage]);
          setIsTyping(true);
    

     try {
        const response = await processMessageToChatGPT([...messages, newMessage]);
        const content = response.choices[0]?.message?.content;
        if (content) {
          const chatGPTResponse = {
            message: content,
            sender: "ChatGPT",
          };
          setMessages((prevMessages) => [...prevMessages, chatGPTResponse]);}

     } catch (error) {
        console.error("Error processing message:", error);

     } finally {
         setIsTyping(false);
     };   }

     async function processMessageToChatGPT(chatMessages) {
        const apiMessages = chatMessages.map((messageObject) => {
            const role = messageObject.sender === "Zahara" ? "assistant" : "user";
            return { role, content: messageObject.message };
          });

          const apiRequestBody = {
            "model": "gpt-3.5-turbo",
            "messages": [
              { role: "system", content: `Your name is Zahara, ${contextObj.client} I want you to respond as if your a personal therapist.` },
              {role:'system', content:`${contextObj.goal} ${contextObj.does}`},
              ...apiMessages,

            ],
          };
          
          
          const response = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
              "Authorization": "Bearer " + API_KEY,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(apiRequestBody),
          });
      
          return response.json();


     }

    return (
      <div className="chatpage" >
        <div className="ai-name-wrapper"> <p>Zahara <FontAwesomeIcon icon={faHandHoldingMedical} /></p>  </div>
       
        <div className="chatbot">
        
        <div className="text-box" >
        
          <MainContainer >
            <ChatContainer className="message-list">       
              <MessageList 
               
                typingIndicator={isTyping ? <TypingIndicator content="Zahara is typing" /> : null}
                
              >
                {messages.map((message, i) => {
                 
                  return <Message key={i} model={message} />
                })}
              </MessageList>
              <MessageInput placeholder="Send a Message" onSend={handleSendRequest} attachButton={false}/>        
            </ChatContainer >
          </MainContainer>
        </div>
      </div>
      <div className="client-btn-wrapper"> <button> <Link to='/client'> Client <FontAwesomeIcon icon='user'/></Link> </button> </div>
      </div>
    )
}

export default ChatBot;