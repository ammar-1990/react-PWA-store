import React from 'react'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <div className='h-screen flex items-center justify-center flex-col '>
   <h1 className="text-6xl capitalize cursor-pointer text-slate-900 font-sans font-semibold">
              Alpha{" "}
              <span className="p-1 bg-orange-400 inline-flex justify-center items-center rounded-md">
                store
              </span>
            </h1>

            <form className=' w-[300px] md:w-[500px] flex flex-col gap-4 mt-12'
            >

<input className='input' type="text" placeholder='Enter your email'/>
<input className='input' type="text" placeholder='Enter your password'/>

<button className='py-2 bg-slate-900 text-orange-400'>Login</button>


<p className='text-slate-900 mt-3'>Don't have an account? <span className='hover:underline decoration-slate-900 cursor-pointer decoration-1'><Link to={'/register'}>register.</Link></span> </p>


            </form>


    </div>
  )
}

export default Login