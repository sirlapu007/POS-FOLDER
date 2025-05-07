
import React, { useState } from 'react';
import { useMutation } from "@tanstack/react-query";
import { login } from "../../https/index";
import { enqueueSnackbar } from "notistack";
import { useDispatch } from "react-redux";
import { setUser } from '../../redux/slices/userSlice';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

 

  const handleChange = (e) => {
    // setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    loginMutation.mutate(formData);
  };


  const loginMutation = useMutation({
    mutationFn: (reqData) => login(reqData),
    onSuccess: (res) => {
      const { data } = res;
      const { _id, name, email, phone, role } = data.data;
      dispatch(setUser({ _id, name, email, phone, role }));
      navigate("/");
      // enqueueSnackbar("Login successful", { variant: "success" });
    },
    onError: (error) => {
      console.log(error);
      const {response} = error;
      enqueueSnackbar(response.data.message, { variant: "error" });
    }
  }); 

  return (
    <div>
      <form onSubmit={handleSubmit}>
        {/* Email */}
        <div>
          <label htmlFor="email" className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
            Employee Email
          </label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
            <input
              // id="email"
              type="email"
              name='email'
              value={formData.email}
              onChange={handleChange}
              placeholder='Enter employee email'
              className='bg-transparent flex-1 text-white focus:outline-none'
              required
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label htmlFor="password" className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
            Password
          </label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
            <input
              // id="password"
              type="password"
              name='password'
              value={formData.password}
              onChange={handleChange}
              placeholder='Enter password'
              className='bg-transparent flex-1 text-white focus:outline-none'
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'
          disabled={loginMutation.isLoading}
        >
          {loginMutation.isLoading ? "Signing in..." : "Sign in"}
        </button>
      </form>
    </div>
  );
};

export default Login;
