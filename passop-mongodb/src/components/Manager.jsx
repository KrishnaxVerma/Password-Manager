import { useRef, useState, useEffect } from 'react';
import React from 'react';
import { ToastContainer, toast } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {

  const ref = useRef();
  const passwordRef = useRef();
  const [form, setform] = useState({ site: "", username: "", password: "" })
  const [passwordArray, setpasswordArray] = useState([])

  const getPassword = async () => {
    let req = await fetch("http://localhost:3000/")
    let passwords = await req.json()
    setpasswordArray(passwords)
  }

  useEffect(() => {
    getPassword()
  }, [])

  const CopyText = (text) => {
    toast.success('Copied to clipboard!', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
    navigator.clipboard.writeText(text);
  }

  const showPassword = () => {
    passwordRef.current.type = "text"
    console.log(ref.current.src)
    if (ref.current.src.includes("icons/eyecross.png")) {
      ref.current.src = "icons/eye.png"
      passwordRef.current.type = "password"
    }
    else {
      passwordRef.current.type = "text"
      ref.current.src = "icons/eyecross.png"
    }

  }


  const SavePassword = async () => {
    if (form.site.length > 3 && form.password.length > 3 && form.username.length > 3) {

      await fetch("http://localhost:3000/", { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })

      const newPassword = { ...form, id: uuidv4() };
      setpasswordArray([...passwordArray, newPassword]);
      // try {
        await fetch("http://localhost:3000/", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(newPassword) });
        setform({ site: "", username: "", password: "" });
        toast.success('Password saved!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      // } 
    }
    else{
      toast.error('Password not saved!');
    }
  }

  const deletePassword = async (id) => {
    console.log("Deleting password with id: ", id);
    let c = confirm("Do you really want to delete the password?")
    if (c) {
      setpasswordArray(passwordArray.filter(item => item.id !== id))
      // localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))

      let res = await fetch("http://localhost:3000/", {method: "DELETE", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({id}) })

      toast.success('Password Deleted!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }

  const editPassword = (id) => {
    console.log("Editing password with id: ", id);
    setform({...passwordArray.filter(i => i.id === id)[0], id: id})
    setpasswordArray(passwordArray.filter(item => item.id !== id))
  }

  const handleChange = (e) => {
    setform({ ...form, [e.target.name]: e.target.value })
  }

  return (
    <div>

      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition="Bounce"
      />
      {/* Same as */}
      <ToastContainer />

      <div className="p-2 pt-7 md:mycontainer">
        <h1 className='text-4xl text font-bold text-center'>
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </h1>
        <p className='text-green-900 text-lg text-center'>Your own password manager</p>

        <div className='flex flex-col p-4 text-black gap-8 items-center'>
          <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="site" id="site" />
          <div className="flex flex-col md:flex-row w-full justify-between gap-8">
            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full p-4 py-1' type="text" name="username" id="username" />

            <div className="relative">
              <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full p-4 py-1' type="password" name="password" id="password" />
              <span className='absolute right-[3px] top-[4px] cursor-pointer' onClick={showPassword}>
                <img ref={ref} className='p-1' width={26} src="/icons/eye.png" alt="eye" />
              </span>
            </div>
          </div>

          <button onClick={SavePassword} className='flex justify-center items-center bg-green-400 rounded-full gap-2 px-8 py-2 w-fit hover:bg-green-300 border-2 border-green-900'>
            <lord-icon
              src="https://cdn.lordicon.com/jgnvfzqg.json"
              trigger="hover">
            </lord-icon>
            Save</button>
        </div>

        <div className="passwords">
          <h2 className='font-bold text-2xl py-4'>Your Passwords</h2>

          {passwordArray.length === 0 && <div>No password to show</div>}
          {passwordArray.length != 0 &&

            <table className="table-auto w-full rounded-md overflow-hidden mb-14">
              <thead className='bg-green-800 text-white'>
                <tr>
                  <th className='py-2'>Site</th>
                  <th className='py-2'>Username</th>
                  <th className='py-2'>Password</th>
                  <th className='py-2'>Actions</th>
                </tr>
              </thead>
              <tbody className='bg-green-200'>
                {passwordArray.map((item, index) => {
                  return <tr key={index}>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <a href={item.site} target='blank'>{item.site}</a>
                        <div className='lordiconcopy cursor-pointer size-7' onClick={() => { CopyText(item.site) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{item.username}</span>
                        <div className='lordiconcopy cursor-pointer size-7' onClick={() => { CopyText(item.username) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <div className='flex items-center justify-center'>
                        <span>{"*".repeat(item.password.length)}</span>
                        <div className='lordiconcopy cursor-pointer size-7' onClick={() => { CopyText(item.password) }}>
                          <lord-icon
                            style={{ "width": "25px", "height": "25px", "paddingTop": "3px", "paddingLeft": "3px" }}
                            src="https://cdn.lordicon.com/iykgtsbt.json"
                            trigger="hover" >
                          </lord-icon>
                        </div>
                      </div>
                    </td>
                    <td className='py-2 border border-white text-center'>
                      <span className='cursor-pointer mx-1' onClick={() => { editPassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/gwlusjdu.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                      <span className='cursor-pointer mx-1' onClick={() => { deletePassword(item.id) }}>
                        <lord-icon
                          src="https://cdn.lordicon.com/skkahier.json"
                          trigger="hover"
                          style={{ "width": "25px", "height": "25px" }}>
                        </lord-icon>
                      </span>
                    </td>
                  </tr>
                })}
              </tbody>
            </table>}
        </div>
      </div>
    </div>
  )
}

export default Manager
