import React, { useEffect, useState } from 'react'
import './noteform.css'
import { Link } from 'react-router-dom'
import $ from 'jquery'

function Noteform() {
  
  useEffect(() => {
    $(document).ready(() => {
      $('#sidebarlayout').hide()

      $('.menu').click(() => {
        $('#sidebarlayout').fadeIn(400)

        document.getElementById('sidebar').className = 'col-lg-4 col-8 sidebar2'
        


      })
      $('.menulink').click(() => {
        
        $('#sidebarlayout').fadeOut(400)
        document.getElementById('sidebar').className = 'sidebar'
        


      })
      $('.sidebarempty').click(() => {
        
        $('#sidebarlayout').fadeOut(400)
        document.getElementById('sidebar').className = 'sidebar'
        

      })
    })
  }, [])

  return (
    <div className='noteform mx-auto'>
      <div className='col-lg-3 col-4  noteformhead'>
        <h3 className='text-center'><span style={{ color: 'brown' }}>N</span>ote<span style={{ color: 'brown' }}>I</span>t</h3>
      </div>
      <span className='noteformbody'>
        <div className='col-1 my-auto text-center noteformbodydiv'>
          <i class="fa-solid fa-bars menu my-auto"></i>
        </div>

        
      </span>



      <div className='sidebarlayout' id='sidebarlayout'>
      <div className='col-lg-8 col-4 sidebarempty' id='sidebarempty'></div>
        <div className='col-lg-4 col-8 sidebar2' id='sidebar'>
          <div className='sidebarhead'><h3>NoteIt</h3> <small>- where ideas begin</small></div>
          <div className='sidebar_menu'>
            <Link to={'/'} className='menulink'><span className='link'><i class="fa-solid fa-pencil"></i>&nbsp;&nbsp;My notes</span></Link>
            <Link to={'/remainders'} className='menulink'><span className='link'><i class="fa-regular fa-bell"></i>&nbsp;&nbsp;Remainders</span></Link>
            <Link to={'/archived'} className='menulink'><span className='link'><span class="material-symbols-outlined">archive</span>&nbsp;&nbsp;Archive</span></Link>
            <Link to={'/trash'} className='menulink'><span className='link'> <span class="material-symbols-outlined">delete</span>&nbsp;&nbsp;Trash</span></Link>
          </div>
        </div>
        
      </div>
    </div>
  )
}

export default Noteform
