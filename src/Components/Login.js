import React,{useState,useEffect} from 'react';
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { TextInput } from 'evergreen-ui'

export default function Login() {
  const history=useHistory();
  const[email,setEmail]=useState('');
  const[password,setPassword]=useState('');

  const login=async ()=>{
    try{
      const resp=axios.post("https://api-telly-tell.herokuapp.com/api/client/signin",
        {email:email,password:password}
      );
      const user=JSON.parse(localStorage.getItem("user") || "[]");
      if(user.length===0)
      {
        user[0]=resp.data;
        localStorage.setItem("user",JSON.stringify(user));
      }
      history.push('/page');
    }
    catch(error)
    {
      console.log("Error :- ",error);
    }

  }

  return (
    <div className="sign-card">
        <Card sx={{ width:570,height:600,borderRadius:1 }}>
              <div className="pic-div">
                  <img src="signin.jpg" alt="Sign up" style={{height:"100px", width:"100px"}}/>
              </div>
              <div className="sign-div">
                <Typography variant="h6" sx={{my:"10px",color:"#5c5470"}}>
                  <Typography variant="h5">Sign In</Typography>
                  <Typography variant="body1" sx={{my:"10px",color:"#5c5470"}}>Sign In through following method</Typography>
                </Typography>
              </div>
              <div className="email-div">
                  Email
              </div>
              <div className="sign1-div">
                  <TextInput name="text-input-name" placeholder="Enter your Email" style={{height:"40px"}} value={email} onChange={(e)=>setEmail(e.target.value)}/>
              </div>

              <div className="pass-div">
                  Password
              </div>
              <div className="sign1-div">
                  <TextInput name="text-input-name"  placeholder="Password" style={{height:"40px"}} value={password} onChange={(e)=>setPassword(e.target.value)}/>
              </div>
              <div className="btn-div" style={{marginTop:"20px"}}>
                  <button type="button" class="btn btn-outline-primary" style={{width:"110px"}} onClick={login}>Submit</button>
              </div>
              <div className="sign1-div" style={{marginTop:"20px"}}>
                <p>Need an Account?</p>&nbsp;
                <a href="#">Sign Up</a>
              </div>
        </Card>
    </div>
  )
}
