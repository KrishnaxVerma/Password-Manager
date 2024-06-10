import React from 'react'

const Navbar = () => {
  return (
    <div>
      <nav className='bg-slate-800 text-white'>
        <div className='flex justify-between items-center px-4 py-5 h-14 mycontainer'>
          <div className="logo font-bold text-2xl">
            <span className='text-green-500'>&lt;</span>
            Pass
            <span className='text-green-500'>OP/&gt;</span>

          </div>
          {/* <ul>
            <li className='flex gap-4'>
              <a className='hover:font-bold' href="/">Home</a>
              <a className='hover:font-bold' href="/">About</a>
              <a className='hover:font-bold' href="/">Contact</a>
            </li>
          </ul> */}
          <button className='bg-green-600 text-white my-5 rounded-full flex justify-between items-center ring-white ring-1'>
            <img src="icons/github.svg" className='w-10 p-1' alt="" />
            <span className='font-bold px-2'>GitHub</span>
          </button>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
