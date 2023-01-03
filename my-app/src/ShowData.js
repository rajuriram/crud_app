import { useEffect, useState } from "react";
import axios from "axios"
import { useNavigate } from "react-router-dom";





export default function ShowData() {
  let navigate = useNavigate();
  
  const [data,setData]=useState([])
  const [message,setMessage]=useState("")
 
  const fetch=()=>{
    axios.get("http://localhost:4000/login").then((res)=>{
      setData(res.data)
      console.log(res.data)
    }).catch((err)=>{
      console.log(err.response.data)
    })
  }
  useEffect(fetch,[message])
  const deleteUser=(user)=>{
    axios.delete(`http://localhost:4000/login/${user.id}`).then((res)=>{
      console.log(`${user.userName} has been deleted`)
      setMessage(`${user.userName} has been successfully deleted`)
    }).catch((err)=>{
      console.log("something went wrong during deletion")
      setMessage(`${user.userName} has not been deleted`)
      console.log(err.response.data)
      console.log(user.id)
    })
  }
  
  const ModifyPassword=(user)=>{
    navigate(`/modify/${user.userName}/${user.id}`)
    
  }
 


  return (
    <div className="App">
      <header className="App-header">
        <h1 style={{textAlign:"center"}}>Data</h1>
           
          <table  className="table table-dark  table-hover">
          <thead>
            <tr>
              <th scope="col">User Id</th>
              <th scope="col">User Name</th>
              <th scope="col">User Password</th>
              <th scope="col">Modify</th>
              <th  scope="col">Delete</th>

            </tr>
          </thead>
          <tbody>
          {data.map((user, index)=>{
           return <tr  key={index}>
                    <th scope="row">{user.id}</th>
                    <td>{user.userName}</td>
                    <td>{user.password}</td>
                    <td><button  onClick={()=>ModifyPassword(user)} className="btn btn-primary">Modify Password</button></td>
                    <td><button onClick={()=>deleteUser(user)} className="btn btn-danger">Delete user</button></td>


                 </tr>})}
            </tbody>
          </table>
        
  
        
      </header>
    </div>
  );
}