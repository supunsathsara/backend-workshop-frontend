import React from 'react'
import { createClient } from '@supabase/supabase-js'



function Auth() {
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

    return (
        <div className='text-white text-2xl flex flex-row mx-auto text-center gap-6'>
            <button onClick={handleRegister}>Register</button>
            <button>Login</button>
        </div>
    )
}

export default Auth