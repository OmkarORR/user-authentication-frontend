import React from "react";
import { Link } from "react-router-dom";
import { useState } from 'react'


function Register() {

    const [userdetails, setUserdetails] = useState({
        name: "",
        email: "",
        username: "",
        password: "",
        retypepassword: ""
    });

    const [showpopup, setshowpopup] = useState(false);
    const [message, setmessage] = useState("");

    function handlechange(event){
        setUserdetails((prevstate)=>{
            return{ ...prevstate,[event.target.name]:event.target.value}
            
        })
        setmessage(" ");
        setshowpopup(false);
    }

     const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://user-authentication-system-production-4fb9.up.railway.app/RegistrationServlet", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json"
      },
      body: JSON.stringify(userdetails)
    });

    const result = await response.text();

    if (response.ok) {
      setmessage("✅ Registration successful!");
      setshowpopup(true);

      setUserdetails({
        name: "",
        email: "",
        username: "",
        password: "",
        retypepassword: "" 
      });
        } else {
          setmessage("Please try again....");
        }
        
        setTimeout(() => {
            setshowpopup(false);
        }, 3000);
  }

    return(
        <section className="main">
            <div className="leftside">
                <img src="12486656.jpg" alt="img" className="image"/>
            </div>


            <div className="rightside">
                <form className="form" onSubmit={handleSubmit}>
                        <div className="formhead">
                            <h1 className="h1">Sign-up</h1>
                        </div>
                        
                        <div className="form-box">
                          {(showpopup && 
                              <div className="form-message">{message}</div>
                          )}
                            <label className="label">Full name</label><br/>
                            <input type="text" placeholder="FullName" className="inputbox" name="name" onChange={handlechange} value={userdetails.name}/><br/>
                            <label className="label">Email</label><br/>
                            <input type="email" placeholder="Email" className="inputbox" name="email" onChange={handlechange} value={userdetails.email}/><br/>
                            <label className="label">Username</label><br/>
                            <input type="text" placeholder="Username" className="inputbox" name="username" onChange={handlechange} value={userdetails.username}/><br/>
                            <label className="label">Password</label><br/>
                            <input type="password" placeholder="**********" className="inputbox" name="password" onChange={handlechange} value={userdetails.password} /><br/>
                            <label className="label">Retype-password</label><br/>
                            <input type="password" placeholder="**********" className="inputbox" name="retypepassword" onChange={handlechange} value={userdetails.retypepassword} /><br/>
                            
                            <button className="btn">Submit</button>
                            <p className="para">Already Registered? <Link to="/Login" className="link">Login...</Link></p>
                            
                        </div> 
                </form>
            </div>
        </section>
    )
}
export default Register;    