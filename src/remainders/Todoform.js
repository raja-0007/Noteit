import React, { useState } from 'react'
import './remainders.css'
function Todoform({addtodo}) {
    const [input,setInput] = useState('')
  let inputhandler=(e)=>{
    setInput(e.target.value)
  }
  function addingtodo(e){
    e.preventDefault()
    addtodo(input)
    setInput('')
  }
  return (
    <div className='col-lg-9 col-11 mt-5 mx-auto todoformlayout'>
        <h4 ><i class="fa-regular fa-bell"></i>&nbsp;Remainders</h4>
      <form className='todoform' onSubmit={addingtodo}>
        <input type='text' placeholder='add a todo..' value={input} onChange={inputhandler}></input>
        <button className='addtodobtn'><i class="fa-solid fa-plus"></i></button>
      </form>
    </div>
  )
}

export default Todoform
