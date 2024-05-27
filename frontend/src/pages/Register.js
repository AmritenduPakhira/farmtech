import React, { useState, useEffect, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import toast, { Toaster } from 'react-hot-toast';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(useGSAP);

const Register = ({ onLogin }) => {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const containerRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();

  useGSAP(
    () => {
    let ctx = gsap.context(() => {
      gsap.from(containerRef.current, { opacity: 0, y: 20, duration: 1 });
      gsap.from(emailRef.current, { opacity: 0, x: -50, duration: 0.5, delay: 0.5 });
      gsap.from(passwordRef.current, { opacity: 0, x: 50, duration: 0.5, delay: 0.7 });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = await auth.user;

      onLogin(user);
      toast.success('User Registered');
      navigate("/login");
    } catch (error) {
      console.log(error);
      const errorCode = error.code;
      const errorMessage = error.message;
      toast.error(`${errorCode}: ${errorMessage}`);
    }

    setEmail('');
    setPassword('');
  };

  return (
    <main className="bg-gray-100 h-[75vh] flex items-center justify-center">
      <Toaster />
      <section className="max-w-md w-full space-y-8" ref={containerRef}>
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-green-800">Register</h1>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <input type="hidden" name="remember" value="true" />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">Email address</label>
              <input
                id="email-address"
                name="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Email address"
                ref={emailRef}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only">Password</label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-green-300 placeholder-green-500 text-green-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-sm"
                placeholder="Password"
                ref={passwordRef}
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
            >
              Sign up
            </button>
            <p className="text-center mt-2 text-sm">
              Already have an account?{' '}
              <NavLink to="/login" className="font-medium text-green-600 hover:text-green-500">
                Sign in
              </NavLink>
            </p>
          </div>
        </form>
      </section>
    </main>
  );
};

export default Register;
