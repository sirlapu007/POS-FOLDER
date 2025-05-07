import React, { useState } from 'react';
import { register } from '../../https';
import { enqueueSnackbar } from "notistack";
import { useMutation } from "@tanstack/react-query";

const Register = ({setIsRegister}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRoleSection = (selectedRole) => {
    setFormData({ ...formData, role: selectedRole });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    registerMutation.mutate(formData);
    console.log(formData);
  };


  
  const registerMutation = useMutation({
    mutationFn: (reqData) => register(reqData),
    onSuccess: (res) => {
      const { data } = res;
      enqueueSnackbar(data.message, { variant: "success" });
      setFormData({ 
        name: "",
        email: "",
        phone: "",
        password: "",
        role: ""
      })

      setTimeout(() => {
        setIsRegister(false);
      }, 1500)
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
        {/* Name */}
        <div>
          <label htmlFor="name" className='block text-[#ababab] mb-2 text-sm font-medium'>
            Employee Name
          </label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
            <input
              id="name"
              type="text"
              name='name'
              value={formData.name}
              onChange={handleChange}
              placeholder='Enter employee name'
              className='bg-transparent flex-1 text-white focus:outline-none'
              required
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
            Employee Email
          </label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
            <input
              id="email"
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

        {/* Phone */}
        <div>
          <label htmlFor="phone" className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
            Employee Phone
          </label>
          <div className='flex items-center rounded-lg p-5 px-4 bg-[#1f1f1f]'>
            <input
              id="phone"
              type="tel"
              name='phone'
              value={formData.phone}
              onChange={handleChange}
              placeholder='Enter employee phone'
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
              id="password"
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

        {/* Role Selection */}
        <div>
          <label className='block text-[#ababab] mb-2 mt-3 text-sm font-medium'>
            Choose your role
          </label>
          <div className='flex items-center gap-3 mt-4'>
            {["Waiter", "Cashier", "Admin"].map((role) => {
              return (
                <button
                  key={role}
                  type='button'
                  onClick={() => handleRoleSection(role)}
                  className={`bg-[#1f1f1f] px-4 py-3 w-full rounded-lg text-[#ababab]
                    ${formData.role === role ? "bg-indigo-700 text-white" : ""}`}
                >
                  {role}
                </button>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type='submit'
          className='w-full rounded-lg mt-6 py-3 text-lg bg-yellow-400 text-gray-900 font-bold'
        >
          Sign up
        </button>
      </form>
    </div>
  );
};

export default Register;
