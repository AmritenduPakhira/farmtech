import React, { useState } from "react";

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [redirectToHome, setRedirectToHome] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    const enteredUsername = document.getElementById("loginEmail").value;
    const enteredPassword = document.getElementById("loginPassword").value;

    const credentials = [
      { username: "amrit123", password: "123456789" },
      { username: "saatvik123", password: "password123" },
    ];

    const isValidCredentials = credentials.some(
      (cred) =>
        cred.username === enteredUsername && cred.password === enteredPassword
    );

    if (isValidCredentials) {
      setRedirectToHome(true);
    } else {
      alert("Incorrect username or password");
    }
  };

  const handleSignUp = (e) => {
    e.preventDefault();
    setRedirectToHome(true);
  };

  if (redirectToHome) {
    window.location.href = "/home";
  }

  return (
    <div className="w-screen flex items-center justify-center" style={{ height: "80vh" }}>
      <div className="w-full md:w-6/12">
        <div className="bg-transparent shadow-md rounded px-8 pt-6 pb-8 mb-4">
          <h2 className="text-center mb-4">{isLogin ? "Login" : "Sign Up"}</h2>

          {isLogin ? (
            // Login Form
            <form onSubmit={handleLogin} className=" p-6 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="loginEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="loginEmail"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="loginPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="loginPassword"
                  required
                />
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
                Login
              </button>
            </form>
          ) : (
            // Sign Up Form
            <form onSubmit={handleSignUp} className=" p-6 rounded-lg">
              <div className="mb-4">
                <label
                  htmlFor="signupUsername"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Username
                </label>
                <input
                  type="text"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signupUsername"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="signupEmail"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Email address
                </label>
                <input
                  type="email"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signupEmail"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="signupPassword"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Password
                </label>
                <input
                  type="password"
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  id="signupPassword"
                  required
                />
              </div>
              <button type="submit" className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded w-full">
                Sign Up
              </button>
            </form>
          )}

          <p className="text-center mt-3">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => setIsLogin(!isLogin)}
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
