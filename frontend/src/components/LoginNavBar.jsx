import React from 'react'

const LoginNavBar = () => {
  return (
    <nav className="bg-black w-full fixed top-0 left-0 py-2">
      <div className="flex items-center justify-between h-16 px-2 ml-8 mr-8">
        <div className="flex items-center ">
          <a href="/" className="text-xl font-semibold text-white hover:text-gray-300 font-mono">
            Hotel-Booking App
          </a>
        </div>

      </div>
    </nav>
  )
}

export default LoginNavBar
