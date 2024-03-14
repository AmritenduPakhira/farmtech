import React, { useState } from 'react';

const Login = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [redirectToHome, setRedirectToHome] = useState(false);

//   const toggleForm = () => {
//     setIsLogin((prevIsLogin) => !prevIsLogin);
//   };

const handleLogin = (e) => {
  e.preventDefault();
  const enteredUsername = document.getElementById('loginEmail').value;
  const enteredPassword = document.getElementById('loginPassword').value;

  // Define the list of valid credentials
  const credentials = [
      { username: 'amrit123', password: '123456789' },
      { username: 'saatvik123', password: 'password123' }
     
  ];

  // Check if any of the entered username and password pairs match
  const isValidCredentials = credentials.some(cred => cred.username === enteredUsername && cred.password === enteredPassword);

  if (isValidCredentials) {
      setRedirectToHome(true);
  } else {
      alert('Incorrect username or password');
  }
};


const handleSignUp = (e) => {
    e.preventDefault();
     setRedirectToHome(true);
  };

  if (redirectToHome) {
    
    window.location.href = '/home';
  }
  return (
    <div>
      <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mb-4">
            <div className="card-body">
              <h2 className="text-center mb-4">{isLogin ? 'Login' : 'Sign Up'}</h2>

              {isLogin ? (
                // Login Form
                <form onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="loginEmail" className="form-label">
                      Username
                    </label>
                    <input type="text" className="form-control" id="loginEmail" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="loginPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="loginPassword" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Login
                  </button>
                </form>
              ) : (
                // Sign Up Form
                <form onSubmit={handleSignUp}>
                     <div className="mb-3">
                    <label htmlFor="signupUsername" className="form-label">
                      Username
                    </label>
                    <input type="text" className="form-control" id="signupUsername" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupEmail" className="form-label">
                      Email address
                    </label>
                    <input type="email" className="form-control" id="signupEmail" required />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="signupPassword" className="form-label">
                      Password
                    </label>
                    <input type="password" className="form-control" id="signupPassword" required />
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Sign Up
                  </button>
                </form>
              )}

              <p className="text-center mt-3">
                {isLogin ? "Don't have an account? " : 'Already have an account? '}
                <span className="text-primary"  style={{ cursor: 'pointer' }}>
                  {isLogin ? 'Sign Up' : 'Login'}
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  )
}

export default Login
