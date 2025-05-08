import React from 'react'

const Signin = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#1a1a1a] text-white">
      <h1 className="text-2xl font-bold mb-4">Sign In</h1>
      <form className="flex flex-col gap-4 w-80">
        <input
          type="email"
          placeholder="Email"
          className="p-2 rounded bg-[#2a2a2a] border border-gray-600"
        />
        <input
          type="password"
          placeholder="Password"
          className="p-2 rounded bg-[#2a2a2a] border border-gray-600"
        />
        <button className="p-2 bg-blue-500 rounded hover:bg-blue-600">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Signin