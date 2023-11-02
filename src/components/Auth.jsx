import React, { useEffect, useState } from 'react'
import { createClient } from '@supabase/supabase-js'



function Auth() {
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUserOnLoad = async () => {

            const { data: { user } } = await supabase.auth.getUser();
            console.log(user)
            setUser(user)
        }

        getUserOnLoad()
    }, [])

    // Create a single supabase client for interacting with your database
    const supabase = createClient('https://efvuymwccuxpqcsbrhhl.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV5bXdjY3V4cHFjc2JyaGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NTMwNjMsImV4cCI6MjAxNDQyOTA2M30.gWZQJLYktfF8v5qzVZtaPEyAY_r5n77WXubgfKooBpE')

    const handleRegister = async () => {
        const email = "test00@supunsathsara.com";
        const password = "123@321"

        const { data, error } = await supabase.auth.signUp({
            email: email,
            password: password,
        })

        console.log(data)
        console.log(error)
    }

    const handleLogin = async () => {

        const { data, error } = await supabase.auth.signInWithPassword({
            email: 'test00@supunsathsara.com',
            password: '123@321',
        })

        console.log(data)
    }

    const handleLogout = async () => {
        const { error } = await supabase.auth.signOut()
        console.log(error)
    }

    const getUser = async () => {

        const { data: { user } } = await supabase.auth.getUser();
        console.log(user)
        setUser(user)
    }

    return (
        <div className='text-white text-2xl flex flex-col mx-auto text-center gap-6'>
            <button onClick={handleRegister}>Register</button>
            <button onClick={handleLogin}>Login</button>
            <button onClick={handleLogout}>Logout</button>
            <button onClick={getUser}>Get User</button>

            {user && <p>{user.email}</p>}
            {!user && <p>Not Logged in</p>}
        </div>
    )
}

export default Auth