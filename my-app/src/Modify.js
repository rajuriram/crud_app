import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router";


export default function Modify() {
    let params=useParams()
    console.log(params.userName)
    console.log(params.userId)
    var id=params.userId
    const [state,setState]=useState({
        
        userName:"",
        password:""
    })
    const [mod,setMod]=useState("")
    const [erro,setErro]=useState("")
    const handleChange=(e)=>{
        const{name,value}=e.target
        setState({
          ...state,[name]:value
        })
    }
    const getData=()=>{
        axios.get(`http://localhost:4000/login/${id}`).then((res)=>{
            setState(res.data)
            console.log(res.data)
        }).catch((err)=>{
            console.log(err.response.data)
            console.log("something went wrong in fetchin the modifyin data")
            
        })
    }

useEffect(getData,[])
    const handleSubmit=(event)=>{
        event.preventDefault()
        axios.put(`http://localhost:4000/login/${id}`,state).then((res)=>{
          console.log(res.data)
          console.log(state)
          setMod(`${state.userName} has been modified successfully`)
          setState({
            userName:"",
            password:""
          })
        }).catch((err)=>{
          console.log(err.response.data);
          console.log(state)
          setErro(`${state.userName} has not been modified successfully`)
        })
    
      }

    return( <div>
         <h2 style={{textAlign:"center"}}>Login from</h2>
        <form className='loginForm' onSubmit={(e)=>handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='userName'>User Name:</label>
            <input
            className='form-control'
            type="text"
            name='userName'
            id='userName'
            value={state.userName}
            disabled
            ></input>
          </div>
          <div className='form-group'>
            <label htmlFor='password'>Password:</label>
            <input
            className='form-control'
            type="password"
            name='password'
            id='password'
            value={state.password}
            onChange={(e)=>handleChange(e)}
            ></input>
          </div>
          <button disabled={ state.userName==="" || state.password==="" } className='btn btn-primary'  id="submitBtn">Login</button>
          </form>
          {mod?<span className="alert-success">{mod}</span>:null}
          {erro?<span className="alert-success">{erro}</span>:null}

    </div>

    );
}