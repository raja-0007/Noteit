import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import './note.css'
import $ from 'jquery'
function Editarchive({ edit_archive }) {
  const location = useLocation()
  const [title, setTitle] = useState(location.state.item.title)
  const [content, setContent] = useState(location.state.item.content)
  const [archived, setArchived] = useState(location.state.item.archive)
  console.log(archived)
  const [clr, setClr] = useState(location.state.item.bgcolor)
  let colors = [
    {
      color: 'white',
      selected: false
    },
    {
      color: 'rgb(254, 233, 205)',
      selected: false
    },
    {
      color: 'rgb(128, 128, 0,.6)',
      selected: false
    },
    {
      color: 'hsl(182, 25%, 50%,.6)',
      selected: false
    },
    {
      color: 'hsl(0, 0%, 66%,.6)',
      selected: false
    },
    {
      color: 'hsl(43, 89%, 38%,.6)',
      selected: false
    },
    {
      color: 'hsl(120, 25%, 65%,.6)',
      selected: false
    },
    {
      color: 'rgb(243, 137, 62,.6)',
      selected: false
    }

  ]
  const clrselection = (indexval) => {
    colors = colors.map((item, index) => index == indexval ? { ...item, selected: !item.selected } : { ...item, selected: false })


    let bgclr = selectedclr()
    setClr(bgclr)
  }
  var selectedclr = () => {
    let clrr = ''
    colors.forEach((item) => {

      if (item.selected == true) {
        document.getElementById('noteinputs').style.backgroundColor = item.color
        console.log(item.color)
        clrr = item.color


      }

    })

    return clrr

  }
  function bgcolor() {
    colors.forEach((item, index) => {
      document.getElementById('color' + index).style.backgroundColor = item.color
    })
  }
  function changehandler(e) {
    setTitle(e.target.value)

  }
  function contenthandler(e) {
    setContent(e.target.value)

  }
  function editnotes() {
    console.log(content)
    edit_archive(location.state.item._id, title, content, clr)
  }
  useEffect(() => {
    document.getElementById('noteinputs').style.backgroundColor = clr
  }, [clr])
  useEffect(() => {
    $(document).ready(() => {
      $('.colors').hide()
      document.getElementById('noteinputs').style.backgroundColor = clr
      $('#colorsicon').hover(() => {
        $('.colors').slideDown(600)
        bgcolor()
        colors.forEach((color, index) => {
          $('#color' + index).mouseenter(() => {
            document.getElementById('color' + index).style.border = '1px solid hsl(4, 4%, 4%,.6)'
          })
          $('#color' + index).mouseleave(() => {
            document.getElementById('color' + index).style.border = '1px solid hsl(4, 4%, 4%,.2)'
          })
        })
        $('.colorscontent').mouseleave(() => {
          $('.colors').slideUp(600)
        })

      })


    })
  }, [])
  return (
    <div className='notelayout'>

      <div className='back'>
        <Link to={'/archived'} ><i class="fa-solid fa-arrow-left-long back"></i></Link>

      </div>

      <div className='noteinputs' id='noteinputs'>
        <span className='inputspan'>
          <input type='text' id='title' placeholder='Note Title' value={title} onChange={changehandler}></input>
          <Link to={'/archived'}><button className='donebtn' onClick={editnotes}><label><i class="fa-solid fa-check"></i></label></button></Link>
        </span>

        <textarea className='my-auto' cols={5} rows={5} placeholder="what's on your mind?" value={content} onChange={contenthandler}></textarea>

      </div>
      <div className='colorswrapper'>
        <div className='colorscontent'>
          <i id='colorsicon' class="fa-solid fa-palette"></i>
          <div className='colors'>
            {colors.map((val, index) =>
              <div key={index} onClick={() => clrselection(index)} id={'color' + index} className='color'></div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Editarchive
