import React from 'react'
import { unmountComponentAtNode, render } from "react-dom";
import ScrollToBottom from 'react-scroll-to-bottom'

export  default function Messages({messages}){
   

        return(
        <div>
           {messages.map((elem) => {
                return(
                   <div >
                      <p>{elem.user}:</p>
                      <p >{elem.text}</p>
                   </div>
                ) 
           })}
        </div>

      )

}
