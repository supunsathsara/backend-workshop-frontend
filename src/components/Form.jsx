import React, { useState } from 'react'

function Form() {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Form submitted')
    console.log(name,email,message)

    try {
      const response = fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          email: email,
          message: message
        })
      })
      console.log(response)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div className='text-3xl min-h-screen justify-center text-center text-white '>
      Form
    <form onSubmit={handleSubmit} className='text-black flex flex-col max-w-xl mx-auto gap-5'>
      <label className='text-3xl'>Name</label>
      <input className='text-3xl' type='text' onChange={(e) => setName(e.target.value)} />
      <label className='text-3xl'>Email</label>
      <input className='text-3xl' type='text' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
      <label className='text-3xl'>Message</label>
      <input className='text-3xl' type='text' placeholder='Message' 
      onChange={(e) => setMessage(e.target.value)}
      />
      <button className='text-3xl bg-slate-700' type='submit'>Submit</button>
    </form>
    </div>
  )
}

export default Form