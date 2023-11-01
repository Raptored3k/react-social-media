import React, { MouseEventHandler, useState } from 'react';
import { registerUser, selectUsers } from '../features/user/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../tools/store';
import { Link, useNavigate } from 'react-router-dom';

const RegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [emailTakenError, setEmailTakenError] = useState(false);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const users = useSelector(selectUsers);

  const handleRegister: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault();
    const ifEmailTaken = users.find((user) => user.email === email);
    if (!ifEmailTaken) {
      dispatch(registerUser({ email, name, username }));
      setEmailTakenError(false);
      navigate('/login');
    } else {
      setEmailTakenError(true);
    }
  };

  return (
    <div className='min-h-screen min-w-screen flex justify-center items-center bg-slate-900'>
      <div className='flex flex-col justify-center px-6 py-12 w-2/5'>
        <h2 className='mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-white'>Register a new account</h2>
        <div className='mt-20'>
          <form className='space-y-10'>
            <div>
              <div>
                <label htmlFor='email' className='block text-md font-medium leading-6 text-white'>
                  Email address
                </label>
              </div>
              <div className=''>
                <input
                  type='email'
                  name='email'
                  id='email'
                  autoComplete='email'
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className='block mt-2 w-full rounded-md border-0 py-2 bg-slate-700 text-white shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                />
              </div>
              <div className='text-red-700 leading-8 text-right'>{emailTakenError && 'Email is already taken!'}</div>
            </div>
            <div>
              <div>
                <label htmlFor='email' className='block text-md font-medium leading-6 text-white'>
                  Name
                </label>
              </div>
              <div className=''>
                <input
                  type='text'
                  name='name'
                  id='name'
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='block mt-2 w-full rounded-md border-0 py-2 bg-slate-700 text-white shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                />
              </div>
            </div>
            <div>
              <div>
                <label htmlFor='email' className='block text-md font-medium leading-6 text-white'>
                  Username
                </label>
              </div>
              <div className=''>
                <input
                  type='text'
                  name='username'
                  id='username'
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className='block mt-2 w-full rounded-md border-0 py-2 bg-slate-700 text-white shadow-sm ring-1 ring-inset ring-slate-600 focus:ring-2 focus:ring-inset focus:ring-indigo-600'
                />
              </div>
            </div>
            <div>
              <button
                type='submit'
                onClick={handleRegister}
                className='flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600'
              >
                Register
              </button>
            </div>
          </form>
          <div className='text-md mt-6 text-white text-center'>
            Already a member?{' '}
            <Link to='/login'>
              <b className='text-indigo-600 cursor-pointer'>Login</b>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
