import * as AiIcons from 'react-icons/ai';
import * as BsIcons from 'react-icons/bs';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext';

export const Sign = () => {
  const [signIn, setSignIn] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useContext(userContext);
  const navigate = useNavigate();

  const handleSignIn = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const response = await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      const currentUser = await response.json();
      setUser(currentUser);
      sessionStorage.setItem('token', JSON.stringify(currentUser.token));
      navigate('/profile');
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const data = { email, password };

    const response = await fetch('http://localhost:5000/users/register', {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 201) {
      const currentUser = await response.json();
      setUser(currentUser);
      sessionStorage.setItem('token', JSON.stringify(currentUser.token));
      navigate('/profile');
    }
  };

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div>
          <h6 className="text-center text-xl font-bold tracking-wide text-darkBlue">
            BloggIn.
          </h6>
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            {signIn ? 'Sign in to your account' : 'Start your bloggin journey'}
          </h2>
        </div>
        <form className="mt-8 space-y-6" action="#" method="POST">
          <input type="hidden" name="remember" defaultValue="true" />
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-midBlue focus:outline-none focus:ring-midBlue sm:text-sm"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-midBlue focus:outline-none focus:ring-midBlue sm:text-sm"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-lightBlue focus:ring-midBlue"
              />
              <label
                htmlFor="remember-me"
                className="ml-2 block text-sm text-gray-900"
              >
                Remember me
              </label>
            </div>

            <div className="text-sm">
              <a
                href="#"
                className="font-medium text-lightBlue hover:text-midBlue"
              >
                Forgot your password?
              </a>
            </div>
          </div>

          <div>
            <button
              onClick={signIn ? handleSignIn : handleRegister}
              // type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-lightBlue py-2 px-4 text-sm font-medium text-white hover:bg-midBlue focus:outline-none focus:ring-2 focus:ring-midBlue focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                {signIn ? (
                  <AiIcons.AiOutlineLock
                    className="h-5 w-5 text-midBlue group-hover:text-white"
                    aria-hidden="true"
                  />
                ) : (
                  <BsIcons.BsPencilSquare
                    className="h-5 w-5 text-midBlue group-hover:text-white"
                    aria-hidden="true"
                  />
                )}
              </span>
              {signIn ? 'Sign in' : 'Sign up'}
            </button>
          </div>

          <div className="mt-20 text-center text-sm">
            <button
              className="font-medium text-lightBlue hover:text-midBlue"
              onClick={(e) => {
                e.preventDefault();
                setSignIn(!signIn);
                setEmail('');
                setPassword('');
              }}
            >
              {signIn ? 'Register' : 'Login'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};