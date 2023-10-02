
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import $ from 'jquery'
import './notelist.css'

function Archived({ list, delete_archive, unarchive }) {
     
    const [newlist, setNewlist] = useState(list)
    const [search, setSearch] = useState('')

    let searchhandler = (e) => {
        setSearch(e.target.value)
    }
    useEffect(() => {
        setSearch(search)

    }, [search])
    let submithandler = (e) => {
        e.preventDefault()
    }
     
    useEffect(()=>{
        document.getElementById('searchinp').addEventListener('focus',()=>{
          document.getElementById('searchbtn').style.backgroundColor = 'hsl(0, 0%, 0%,.8)'
        })
        document.getElementById('searchinp').addEventListener('blur',()=>{
          document.getElementById('searchbtn').style.backgroundColor = 'hsl(0, 0%, 0%,.2)'
        })
      },[])

    useEffect(() => {
        $(document).ready(() => {
            $('.notebtm').hide()
            list.forEach(element => {
                $('#note' + element._id).mouseenter(() => {

                    $('#notebtm' + element._id).slideDown(400)
                })
                $('#note' + element._id).mouseleave(() => {

                    $('#notebtm' + element._id).slideUp(400)
                })
            });


        })

    }, [newlist])
    useEffect(() => {
        const filtered = list.filter(item => item.title.toLowerCase().includes(search.toLowerCase()))
        setNewlist(filtered)
    }, [search, list])
    console.log(newlist)
    return (
        <>
            <div className='col-lg-9 col-sm-10 col-12 mx-auto noteswrapper'>

                <div className='notesheading mb-3'>
                    <h4><span class="material-symbols-outlined">archive</span>&nbsp;Archives</h4>
                    <div className='col-9 formform'>
                        <form onSubmit={submithandler}>
                            <input id='searchinp' className='searchinp' type='text' placeholder='Search archives' value={search} onChange={searchhandler}></input>
                            <button id='searchbtn' type='submit' className='searchbtn'><i class="fa-solid fa-magnifying-glass"></i></button>

                        </form>
                    </div> 
                        
                    
                </div>
                <div className='row mx-auto noteslist ps-3 pe-3'>
                    {
                        (newlist.length !==0) ?
                            (newlist.map((item, index) =>
                            <div key={item._id} className='col-lg-4 col-6 ps-2 pe-2 noteoutlet' >
                                <div className='note mb-2 mt-2' id={'note' + item._id} style={{ backgroundColor: item.bgcolor }}>
                                    <div className='notelabel' >
                                        <span className='notelabelhead'><Link to={'/editarvhive'} state={{ item }}>{item.title}</Link><span class="material-symbols-outlined archiveicon" onClick={() => unarchive(item._id)}>unarchive</span></span>
                                        <Link to={'/editarchive'} state={{ item }} className='notelabelbody'>{item.content}...</Link>
                                    </div>
                                    <span className='notebtm' id={'notebtm' + item._id}>
                                        <label><small>{item.date}</small></label>
                                        <button className='delbtn' onClick={() => delete_archive(item._id)}><i class="fa-solid fa-trash"></i></button>
                                    </span>

                                </div>
                            </div>)) : (
                            <div className='col-6 mx-auto my-auto text-center'>
                                <span class="material-symbols-outlined emptyarch">archive</span><br></br>
                                <label>No Archives</label>
                            </div>
                            )

                    }
                </div>
            </div>
        </>
    )
}

export default Archived
