import React, { useState } from "react";

import "./loginpage.css";
import { Link } from "react-router-dom";
import Login from "../../assets/login.jpg";
import Navbar from "../navbar/Navbar";
import { useSnapshot } from "valtio";
import state from "../../store/Index";
import { useSnapshot } from "valtio";
import { logIN } from "../../api/auth";
import store from "../../store/Index";
import { toast } from "react-toastify";

const Loginpage = () => {
  // const [email, setEmail] = useState('');
  // const [password, setPassword] = useState('');
  // const [error, setError] = useState('');

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post('https://medisync-instance.onrender.com/api/v1/user/login', {
  //       email,
  //       password
  //     });

  //     // Handle the successful login response
  //     console.log(response.data);
  //   } catch (error) {
  //     // Handle the error
  //     setError('Invalid email or password');
  //   }

  // };

  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: "",
  });

  const [profile, setProfile] = useState();

  const snap = useSnapshot(state);

  const handleChange = (ev) => {
    setLoginDetails({
      ...loginDetails,
      [ev.target.name]: ev.target.value,
    });
  };
  // console.log({ loginDetails });
  // console.log(profile);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await logIN(loginDetails);
      console.log("loginres", res);
      store.userLoginData = res.data.data.user;
      console.log("details", res.data);
    } catch (error) {
      toast.error(error);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // I cmmented this off because it was affecting the Dashboard page
  //  const userid = localStorage.setItem("id",loginDetails.data)
  // // console.log(userid)

  return (
    <>
      <Navbar />
      <div className="medisync__loginpage">
        {/* <div className="medisync__loginpage-logo">
        <Link to ="/"><img src={Logo} alt="Logo"/></Link>
      </div> */}
        <div className="medisync__loginpage-body">
          <div className="medisync__loginpage-body_form">
            <h1>Login</h1>

            <form className="login-form" onSubmit={handleSubmit}>
              <label htmlFor="email">Email</label>
              <input
                value={loginDetails.email}
                onChange={handleChange}
                type="email"
                id="email"
                name="email"
                required
              />

              <label htmlFor="password">Password</label>
              <div className="password">
                <input
                  value={loginDetails.password}
                  onChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  id="password"
                  name="password"
                  required
                  className="button"
                />
                <button onClick={togglePasswordVisibility}>
                  {showPassword ? (
                    <RiEyeOffFill size={20} />
                  ) : (
                    <RiEyeFill size={20} />
                  )}
                </button>
              </div>
              <button type="submit">Login</button>

              {
                // (signupDetails.status==="fail") ?
                // (<span className="successful">{signupDetails.message}</span>) :
                // (<span className="successful">{signupDetails.status}</span>)
                loginDetails.status === "success" ? (
                  <Link to="/dashboard/connectwallet">
                    <button type="submit">Connect Wallet</button>
                  </Link>
                ) : (
                  <span className="successful">{loginDetails.message}</span>
                )
              }
            </form>
            <Link to="/register">
              <div className="medisync__loginpage-login">
                <p>Don’t have an account?</p>
                <p className="medisync__loginpage-login-signup">Sign up</p>
              </div>
            </Link>
          </div>
          <div className="medisync__loginpage-body_image">
            <img src={Welcome} alt="Welcome" />
          </div>
        </div>
      </div>
    </>
  );
};

// const Loginpage = (props) => {
//   const [email, setEmail] = useState('');
//   const [pass, setPass] = useState('');

//   const handleSubmit = (e) => {
//       e.preventDefault();
//       console.log(email);
//   }

//   return (
//     <div className="medisync__loginpage">
//       <div className="medisync__loginpage-logo">
//         <img src={Logo} alt="Logo"/>
//       </div>
//       <div className="medisync__loginpage-body">
//         <div className="medisync__loginpage-body_form">
//           <h1>Login</h1>

//           <form className='login-form' onSubmit={handleSubmit}>

//             <label htmlFor="email">Email</label>
//               <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" id="email" name="email" />

//             <label htmlFor="password">Password</label>
//               <input value={pass} onChange={(e) => setPass(e.target.value)} type="password" id="password" name="password" />
//             <button type="submit">Login</button>
//           </form>
//           <Link to="/register">
//             <button className='medisync__loginpage-login'>Don’t have an account? Sign up</button>
//           </Link>
//         </div>
//         <div className="medisync__loginpage-body_image">
//           <img src={Welcome} alt='Welcome'/>
//         </div>
//       </div>
//     </div>
//   )
// }

export default Loginpage;
