import React from 'react'
import { unmountComponentAtNode, render } from "react-dom";
import ScrollToBottom from 'react-scroll-to-bottom'

export  default function Messages({messages}){
   

        return(
        <div>
           {messages.map((elem) => {
                return(
                   <div className=''>
                        
                        <div class="chat chat-start">
                        
                           <div class="chat-header">
                              {elem.user}
                           </div>
                           <div class="chat-bubble text-black">{elem.text}</div>                        
                        
                        </div>

                   </div>
                ) 
           })}
        </div>

      )

}
