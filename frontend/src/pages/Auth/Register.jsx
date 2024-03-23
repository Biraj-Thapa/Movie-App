import React from 'react';
import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../component/Loader";
import { setCredentials } from "../../redux/features/auth/authSlice";
import { toast } from "react-toastify";
import { useRegisterMutation } from "../../redux/api/users";

const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [register, { isLoading }] = useRegisterMutation();
  const { userInfo } = useSelector((state) => state.auth);
  const { search } = useLocation();
  const sp = new URLSearchParams(search);
  const redirect = sp.get("redirect") || "/";
  
  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);
  
  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      try {
        const res = await register({ username, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate(redirect);
        toast.success("User successfully registered.");
      } catch (err) {
        console.log(err);
        toast.error(err.data.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center">Register</h1>
        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <input type="text" id="name" className="mt-1 p-2 border rounded w-full" placeholder="Enter Name" value={username} onChange={(e) => setUsername(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
            <input type="email" id="email" className="mt-1 p-2 border rounded w-full" placeholder="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input type="password" id="password" className="mt-1 p-2 border rounded w-full" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </div>
          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
            <input type="password" id="confirmPassword" className="mt-1 p-2 border rounded w-full" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)}/>
          </div>
          <button disabled={isLoading} type="submit" className="bg-teal-500 text-white px-4 py-2 rounded cursor-pointer w-full">
            {isLoading ? "Registering..." : "Register"}
          </button>
          {isLoading && <Loader />}
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-600">Already have an account? <Link to={redirect ? `/login?redirect=${redirect}` : "/login"} className="text-teal-500 hover:underline">Login</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;
