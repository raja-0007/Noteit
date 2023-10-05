import React, { useEffect, useState } from 'react'
import './login.css'
import { useNavigate } from 'react-router-dom'
function Login({ signingup, loggingin, islogin }) {
    const navigate = useNavigate()
    const [login, setLogin] = useState({
        username: '',
        password: ''
    })
    const [signup, setSignup] = useState({
        username: '',
        password: '',
        repassword: ''
    })
    let l_u_change = (e) => {
        
            setLogin({ ...login, username: e.target.value })
            console.log(login.username)
        
        

    }
    let l_p_change=(e)=>{
        setLogin({ ...login, password: e.target.value })
            console.log(login.password)
    }
    let r_u_change = (e) => {
        
        setSignup({ ...signup, username: e.target.value })
        console.log(login.username)
    
    

}
let r_p_change=(e)=>{
    setSignup({ ...signup, password: e.target.value })
        console.log(login.password)
}

let r_rp_change=(e)=>{
setSignup({ ...signup, repassword: e.target.value })
    console.log(login.password)
}

    const [authentication, setAuthentication] = useState('login')
    let auth_handler = (auth) => {
        setAuthentication(auth)
        console.log(authentication)
    }
    const signup_handler = (e) => {
        e.preventDefault()
        let username = document.getElementById('rusername').value
        let password = document.getElementById('rpassword').value
        let repassword = document.getElementById('rrepassword').value
        console.log(username, password, repassword)
        console.log(document.getElementById('rusername').value)
        signingup(username, password, repassword)
        auth_handler('login')
    }
    const login_handler = (e) => {
        e.preventDefault()
        let username = document.getElementById('username').value
        let password = document.getElementById('password').value
        
        console.log(username, password)
        
        loggingin(username, password)
        
        
        
    }
    useEffect(()=>{
        console.log(islogin)
        if(islogin === true){
            
            navigate('/noteslist')
        }
        else{
            navigate('/')
        }
    },[islogin])
    
    return (
        <>

            <div className='row loginlayout'>
                <span className='mb-3' style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className='loginbtns' onClick={() => auth_handler('login')}>login</button>
                    <button className='loginbtns' onClick={() => auth_handler('signup')}>signup</button>
                </span>
                {authentication == 'login' ? (
                    <div className='col-lg-3 col-sm-5 col-7 logindiv'>
                        <h3>Get started with noteit</h3>
                        <form className='loginform' onSubmit={login_handler}>
                            <span><label className='labels me-3' >Username</label><br></br><input id='username' type='text' value={login.username} onChange={l_u_change} name='username' placeholder='enter user name'></input></span>
                            <span><label className='labels me-3'>Password</label><br></br><input id='password' type='password' value={login.password} onChange={l_p_change} name='password' placeholder='enter password'></input></span>
                            <button type='submit' className='loginbtn'>login</button>
                        </form>
                    </div>
                ) : (
                    <div className='col-lg-3 col-sm-5 col-7 logindiv'>
                        <h3>Get started with noteit</h3>
                        <form className='signupform' onSubmit={signup_handler}>
                            <span><label className='labels me-3' >Username</label><br></br><input type='text' value={signup.username} onChange={r_u_change} id='rusername' name='username' placeholder='enter user name'></input></span>
                            <span><label className='labels me-3' >Password</label><br></br><input type='password' value={signup.password} onChange={r_p_change} id='rpassword' name='password' placeholder='enter password'></input></span>
                            <span><label className='labels me-3' >re-enter password</label><br></br><input id='rrepassword' value={signup.repassword} onChange={r_rp_change} type='password' name='repassword' placeholder='confirm password'></input></span>
                            <button type='submit' className='signupbtn'>signup</button>
                        </form>
                    </div>
                )}


            </div>
        </>
    )
}

export default Login
