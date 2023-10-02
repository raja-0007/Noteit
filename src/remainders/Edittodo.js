import React from 'react'
import { useState } from 'react'
function Edittodo({edittask, todo}) {
    const [task, setTask] = useState(todo.todo)
    function changehandler(e) {
        setTask(e.target.value)

    }
    function submithandler(e){
        e.preventDefault()
        edittask(task,todo._id)
        setTask('')
    }
  return (
    
      <div className='todo mx-auto rounded'>
        <form className='edittodoform mx-auto my-auto' onSubmit={submithandler}>
            <input className='updatetodo' type='text' placeholder='update task...' value={task} onChange={changehandler}></input>
            <i class="fa-solid fa-check" id='editdone' onClick={() => edittask(task,todo._id)}></i>
        </form>
        
                <span></span></div>
    
  )
}

export default Edittodo
