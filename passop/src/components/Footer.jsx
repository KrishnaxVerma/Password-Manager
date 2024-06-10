import React from 'react'

const Footer = () => {
    return (
        <div className='bg-slate-800 text-white flex flex-col justify-center items-center fixed bottom-0 w-full'>
            <div className="logo font-bold text-2xl">
                <span className='text-green-500'>&lt;</span>
                Pass
                <span className='text-green-500'>OP/&gt;</span>
            </div>
            <div className='flex justify-center items-center'>
                Created with <img src="icons/heart.png" className='w-7 mx-2' alt="" /> by Krishna Verma
            </div>
        </div>
    )
}

export default Footer
