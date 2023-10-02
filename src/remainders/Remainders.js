import React from 'react'
import Todo from './Todo'
import Edittodo from './Edittodo'

function Remainders({ list, delete_todo, edit_todo, edittask }) {

  return (
    <div className='col-lg-8 col-10 mx-auto todolist'>
      {list.length !== 0 ?
        (list.map((item, index) =>
          item.editing ? (<Edittodo edittask={edittask} todo={item} />) : (<Todo task={item.todo} id={item._id} index={index} delete_todo={delete_todo} edit_todo={edit_todo} />)


        )) : (
          <div className='col-6 mx-auto my-auto text-center '>
            <i class="fa-regular fa-bell emptytodos"></i><br></br><br></br>
            <label className='addnotetxt'>Add your first remainder</label>
          </div>
        )}

    </div>


  )
}

export default Remainders
