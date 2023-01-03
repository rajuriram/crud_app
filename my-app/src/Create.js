import { useEffect, useState } from "react"; 
import axios from "axios"

export default function Create() {
    const [state,setState]=useState({
        userName:"",
        password:"",
    
      })
    const [success,setSuccess]=useState("")
    const [error,setError]=useState("")
      const handleChange=(e)=>{
        const{name,value}=e.target
        setState({
          ...state,[name]:value
        })
    
      }
      const handleSubmit=(event)=>{
        event.preventDefault()
        axios.post("http://localhost:4000/login",state).then((res)=>{
          console.log(res)
          console.log(state)
          setSuccess(`${res.data.userName} has been successfully inserted`)
          setState({
            userName:"",
            password:""
          })
        }).catch((err)=>{
          console.log(err.response.data);
          console.log(state)
          setError("something went wrong")
        })
    
      }
      

    return(<div>
        <h2 style={{textAlign:"center"}}>Login Data Generator</h2>
        <form className='loginForm' onSubmit={(e)=>handleSubmit(e)}>
          <div className='form-group'>
            <label htmlFor='userName'>User Name:</label>
            <input
            className='form-control'
            type="text"
            name='userName'
            id='userName'
            value={state.userName}
            onChange={(e)=>handleChange(e)}
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
          {success?<span className="alert-success">{success}</span>:null}
          {error?<span className="alert-danger">{error}</span>:null}

    </div>

    );

}
