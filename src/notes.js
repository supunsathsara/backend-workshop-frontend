
import { useState, useEffect } from 'react';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://efvuymwccuxpqcsbrhhl.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVmdnV5bXdjY3V4cHFjc2JyaGhsIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTg4NTMwNjMsImV4cCI6MjAxNDQyOTA2M30.gWZQJLYktfF8v5qzVZtaPEyAY_r5n77WXubgfKooBpE";
const supabase = createClient(supabaseUrl, supabaseKey);

function Notes() {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    const getTodos = async () => {
      try {
        const response = await fetch('http://localhost:3000/todo');
        const todos = await response.json();
        setTodos(todos);
      }
      catch (error) {
        console.error(error);
      }
    }
    getTodos();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  const { data: { user } } = await supabase.auth.getUser()
  console.log(user);

    setMessage('');
     const { data, error } = await supabase
       .from('todos')
       .insert([{ task: todo, user_id: user.id }])
     if (error) {
       setMessage('Something went wrong!');
       console.log(error)
     }
     else {
       setMessage('Successfully added!');
       console.log(data)
     }
/*
    try {
      //send a post request 
      const response = await fetch('http://localhost:3000/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: todo })
      });
      const data = await response.json();
      console.log(data);
    }
    catch (error) {
      console.error(error);
    }
    */

    setTodo('');
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todo/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          // Include any necessary authorization headers (e.g., authentication token) here
        },
      });
  
      if (response.ok) {
        setMessage('Successfully deleted!');

      } else {
        // Handle error, e.g., show an error message to the user
        setMessage('Something went wrong!');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setMessage('Something went wrong!');
      // Handle network error or other issues
    }
  }

  const handleSignup = async (e) => {
    e.preventDefault();
    // const { user, session, error } = await supabase.auth.signUp({
    //   email: 'vjkhgyhagaqpfz@hldrive.com',
    //   password: 'They_Live_1988!',
    // });
    // console.log(user, session, error)
    
const { data: { user } } = await supabase.auth.getUser()
console.log(user.id);
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    const { user, session, error } = await supabase.auth.signInWithPassword({
      email: 'vjkhgyhagaqpfz@hldrive.com',
      password: 'They_Live_1988!',
    });
    console.log(user, session, error)
  }

  return (
    <div>
      <section className="h-screen flex items-center flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="max-w-md w-full p-3 bg-slate-800 shadow overflow-hidden sm:rounded-lg space-y-8">
          <div className="flex justify-between">
            <h1 className="font-medium text-white">Todo App</h1>
            <button
              onClick={handleSignup}
              type="button" className="inline-flex items-center justify-center h-10 w-32 rounded-full bg-violet-500 hover:bg-violet-600 ">
              sign up
            </button>
            <button
              onClick={handleLogin}
              type="button" className="inline-flex items-center justify-center h-10 w-40 rounded-full bg-violet-500 hover:bg-violet-600 ">
              log in
            </button>
          </div>
          <form onSubmit={handleSubmit} className="flex">
            <input placeholder="New Task" className="h-10 px-3 py-2 bg-white dark:bg-slate-700 dark:text-slate-200 dark:border-slate-500 border shadow-sm border-slate-300 placeholder-slate-400 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 focus:outline-none focus:border-violet-500 focus:ring-violet-500 block w-full rounded-tl-lg rounded-bl-lg sm:text-sm focus:ring-1 invalid:border-pink-500 invalid:text-pink-600 focus:invalid:border-pink-500 focus:invalid:ring-pink-500 disabled:shadow-none" id="add-todo" type="text" name="task"
              onChange={(e) => setTodo(e.target.value)}
            />
            <button type="submit"
              aria-label="Add todo"
              className="h-10 bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring focus:ring-violet-300 active:bg-violet-700 px-5 py-2 text-sm leading-5 rounded-tr-lg rounded-br-lg font-semibold text-white">
              Add
            </button>
          </form>
          {message &&
            <p className='text-xl text-white text-center font-medium'>{message}</p>
          }
          <div className="h-80 overflow-x-hidden overflow-y-auto todo-list">
            {todos.map((todo) => (
              <div key={todo.id} className="px-4 py-5 sm:px-6">
                <div className="flex items-center justify-between">
                  <p className="text-xl font-medium text-white truncate">{todo.title}</p>
                  <div className="ml-2 flex-shrink-0 flex">
                    <button type="button" 
                    onClick={() => deleteTodo(todo.id)}
                    className="ml-2 inline-flex items-center justify-center h-10 w-10 rounded-full bg-violet-500 hover:bg-violet-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-violet-300">
                      <span className="sr-only">Delete</span>
                      🗑️
                    </button>
                  </div>
                </div>
              </div>
            ))

            }
          </div>
        </div>
      </section>
    </div>
  );
}

export default Notes;
