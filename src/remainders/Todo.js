import React from 'react'
import './remainders.css'
function Todo({ task, id, index, delete_todo, edit_todo }) {

    return (
        <>
            
            <div key={id} className='todo mx-auto rounded'><label id='todo'>{task}</label>
                <span><i onClick={() => edit_todo(id)} id='editbtn' class="fa-regular fa-pen-to-square editbtn"></i>&nbsp;&nbsp;&nbsp;<i onClick={() => delete_todo(id)} class="fa-regular fa-trash-can deltodo"></i></span></div>
        </>
    )
}

export default Todo
