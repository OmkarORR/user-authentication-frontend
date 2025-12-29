import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react';
import { useNavigate } from "react-router-dom";



function Login(){

     const [logincheck, setlogincheck] = useState({
         username: "",
         password: "",
     });
     const [message, setmessage] = useState("");
     const [showpopup, setshowpopup] = useState(false);
     const navigate = useNavigate();

     function handlechange(event){
         setlogincheck((prevstate)=>{
             return{
                 ...prevstate,[event.target.name]:event.target.value,
             };
         });
            setmessage(" ");
            setshowpopup(false);
     };
       async function handlesubmit(e){
             e.preventDefault();
            
             const response = await fetch("https://omkar-user-auth.alwaysdata.net/LoginServlet", {
                method: "POST",
                headers: {
                    "Content-type":"application/json"
                },
                body: JSON.stringify(logincheck)
             });
             const result = await response.text();
                
            if(response.ok){
                    setmessage(result);
                    setlogincheck({
                        username: "",
                        password: "",
                    });
                    
                        navigate('/Home');
                
                } else{
                    setmessage(result);
                }  
                setshowpopup(true); 
         }
           setTimeout(() => {
                setshowpopup(false);
            }, 3000);

    return(
        <section className="main">
            <div className="leftside">
                <img src="12486656.jpg" alt="img" className="image"/>
            </div>


            <div className="rightside">
                <form className="form" onSubmit={handlesubmit}>
                        <div className="formhead">
                            <h1 className="h1">Login</h1>
                        </div>
                        <div className="form-box-login">
                            { showpopup && (<div className="form-message">{message}</div>
                            )}
                            
                
                            <label className="label">Username</label><br/>
                            <input type="type" placeholder="Username" className="inputbox" name="username" onChange={handlechange} value={logincheck.username}/><br/>
                            <label className="label">Password</label><br/>
                            <input type="password" placeholder="**********" className="inputbox" name="password" onChange={handlechange} value={logincheck.password} /><br/>

                            <button className="btn" >Submit</button>
                            <p className="para">Dont Have a Account? <Link to="/Register" className="link">Register now....</Link> </p>
                        </div> 
                </form>
            </div>
        </section>
    )
}
export default Login;