
import '../node_modules/bootstrap/dist/css/bootstrap.css'
import '../node_modules/bootstrap/dist/js/bootstrap'
import './app.css'
import $ from "jquery"
import { useEffect, useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Noteslist from './components/Noteslist'
import Noteform from './components/Noteform'
import Note from './components/Note';

import Editnote from './components/Editnote'


import Remainders from './remainders/Remainders'

import Todoform from './remainders/Todoform'
import Archived from './components/Archived'
import Trash from './components/Trash'
import Editarchive from './components/Editarchive'
import axios from 'axios'




function App() {


  const [notes, setNotes] = useState([])
  const [archived, setArchived] = useState([])
  const [trash, setTrash] = useState([])
  const [todos, setTodos] = useState([])
  useEffect(() => {

    let getdata = async () => {
      await axios.get('http://localhost:777/api/notes')
        .then(response => setNotes(response.data))
        .catch(err => console.log('error in rendering notes'))

      await axios.get('http://localhost:777/api/archives')
        .then(response => setArchived(response.data))
        .catch(err => console.log('error in rendering archives'))

      await axios.get('http://localhost:777/api/trash')
        .then(response => setTrash(response.data))
        .catch(err => console.log('error in rendering trash'))

      await axios.get('http://localhost:777/api/remainders')
        .then(response => setTodos(response.data))
        .catch(err => console.log('error in rendering remainders'))
    }
    getdata()

  }, [])
  function addnote(title, data, date, clr) {
    axios.post('http://localhost:777/api/notes', { action: 'addnote', title: title, content: data, date: date, bgcolor: clr, archive: false, trash: false })
      .then(res => setNotes([...notes, res.data]))
      .catch(err => console.log('errror in setting new note'))
   

  }

  async function delete_note(noteid) {
    
    await axios.post('http://localhost:777/api/trash', { id: noteid, action: 'delete' })
      .then(res => setTrash([...trash, res.data]))
      .catch(err => console.log('error in deletion'))
    await axios.get('http://localhost:777/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log('error in updating notes after deletion'))

  }
  async function delete_archive(noteid) {
    
    await axios.post('http://localhost:777/api/trash', { id: noteid, action: 'delete_archive' })
      .then(res => setTrash([...trash, res.data]))
      .catch(err => console.log('error in arhchive deletion'))
    await axios.get('http://localhost:777/api/archives')
      .then(res => setArchived(res.data))
      .catch(err => console.log('error in updating archives after deletion'))

  }
  async function restore_note(noteid) {
    
    let newnote = {}
    await axios.post('http://localhost:777/api/trash', { id: noteid, action: 'restore' })
      .then(res => newnote = res.data)
      .catch(err => console.log('error in restoring'))
    console.log(newnote)
    if (newnote.archive) {
      setArchived([...archived, newnote])
    }
    else {
      setNotes([...notes, newnote])
    }
    await axios.get('http://localhost:777/api/trash')
      .then(res => setTrash(res.data))
      .catch(err => console.log('error in updating trash after restoring'))


  }
  async function edit_note(noteid, edittitle, editcontent, editcolor) {
    
    await axios.post('http://localhost:777/api/notes', { action: 'editnote', id: noteid, title: edittitle, content: editcontent, bgcolor: editcolor })
      .then(res => setNotes(notes.map(note => note._id === noteid ? (res.data) : (note))))
      .catch(err => console.log('errror in setting updating note'))
  }
  async function edit_archive(noteid, edittitle, editcontent, editcolor) {
    
    await axios.post('http://localhost:777/api/archives', { id: noteid, action: 'editarchive', title: edittitle, content: editcontent, bgcolor: editcolor })
      .then(res => setArchived(archived.map(note => note._id === noteid ? (res.data) : (note))))
      .catch(err => console.log('error in edit archive'))
  }


  async function archive(noteid) {

    
    await axios.post('http://localhost:777/api/archives', { id: noteid, action: 'archive' })
      .then(res => setArchived([...archived, res.data]))
      .catch(err => console.log('error in archive'))
    await axios.get('http://localhost:777/api/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log('error in updating notes after archive'))

  }
  async function unarchive(noteid) {
    
    await axios.post('http://localhost:777/api/archives', { id: noteid, action: 'unarchive' })
      .then(res => setNotes([...notes, res.data]))
      .catch(err => console.log('error in unarchive'))
    await axios.get('http://localhost:777/api/archives')
      .then(res => setArchived(res.data))
      .catch(err => console.log('error in updating archived after unarchive'))
  }


  async function addtodo(todo) {

    
    axios.post('http://localhost:777/api/remainders', { action: 'addtodo', todo: todo, editing: false })
      .then(res => setTodos([...todos, res.data]))
      .catch(err => console.log('error in adding todo'))


  }
  function delete_todo(todoid) {
    axios.post('http://localhost:777/api/remainders', { action: 'deletetodo', id: todoid })
      .then(res => setTodos(res.data))
      .catch(err => console.log('error in adding todo'))
    
  }
  function edit_todo(todoid) {
   
    axios.post('http://localhost:777/api/remainders', { action: 'edittodo', id: todoid })
      .then(res => setTodos(res.data))
      .catch(err => console.log('error in altering editing value'))
  }
  function edittask(task, todoid) {
    axios.post('http://localhost:777/api/remainders', { action: 'saveedit', id: todoid, todo: task })
      .then(res => setTodos(res.data))
      .catch(err => console.log('error in altering editing value'))
    
  }


  return (
    <>

      <BrowserRouter >
        <div className='container-fluid'>
          <div className='row sticky-top'>
            <Noteform />

          </div>
          <Routes>
            <Route path='/' element={

              <div className='row'>

                {<Noteslist list={notes} delete_note={delete_note} archive={archive} />}
              </div>
            }></Route>
            <Route path='/archived' element={<Archived list={archived} delete_archive={delete_archive} unarchive={unarchive} />}></Route>
            <Route path='/trash' element={<Trash list={trash} restore_note={restore_note} />} ></Route>
            <Route path='/note' element={<Note addnote={addnote} />}></Route>
            
            <Route path='/remainders' element={
              <div className='row'>
                <Todoform addtodo={addtodo} />
                {<Remainders list={todos} delete_todo={delete_todo} edit_todo={edit_todo} edittask={edittask} />}

              </div>

            }></Route>
            <Route path='/editnote' element={<Editnote edit_note={edit_note} />}></Route>
            <Route path='/editarchive' element={<Editarchive edit_archive={edit_archive} />} ></Route>
          </Routes>
        </div>
      </BrowserRouter>

    </>
  );
}

export default App;
