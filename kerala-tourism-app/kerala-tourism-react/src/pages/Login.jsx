<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Login Page</title>
  <style>
    body {
      margin: 0;
      font-family: 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, rgb(89, 151, 89), #0d5e1e, #012506);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .login-box {
      background: white;
      padding: 40px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-box h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #333;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
      color: #555;
    }

    .input-group input {
      width: 100%;
      padding: 12px;
      border: 2px solid #ddd;
      border-radius: 10px;
      font-size: 16px;
      transition: 0.3s ease;
    }

    .input-group input:focus {
      border-color: #046d12;
      outline: none;
    }

    .login-btn {
      width: 100%;
      background: linear-gradient(to right, #066b02, #02721e);
      color: white;
      border: none;
      padding: 14px;
      border-radius: 10px;
      font-size: 16px;
      font-weight: bold;
      cursor: pointer;
      transition: transform 0.2s, box-shadow 0.2s;
    }

    .login-btn:hover {
      transform: scale(1.03);
      box-shadow: 0 6px 15px rgba(4, 170, 45, 0.3);
    }

    .bottom-text {
      text-align: center;
      margin-top: 20px;
      color: #127405;
    }

    .bottom-text a {
      color: #067402;
      text-decoration: none;
    }

    .bottom-text a:hover {
      text-decoration: underline;
    }

    .error-message {
      color: red;
      text-align: center;
      margin-top: 10px;
    }
  </style>
</head>

<body>

  <div class="login-box">
    <h2>Login</h2>
    <form id="loginForm">
      <div class="input-group">
        <label for="username">Username</label>
        <input type="text" id="username" name="username" placeholder="Enter your username" required />
      </div>
      <div class="input-group">
        <label for="password">Password</label>
        <input type="password" id="password" name="password" placeholder="Enter your password" required />
      </div>
      <button class="login-btn" type="submit">Login</button>
      <div id="error" class="error-message"></div>
    </form>
    <div class="bottom-text">
      Don't have an account? <a href="sign.html">Sign up</a>
    </div>
  </div>

  <script>
    document.getElementById('loginForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      })
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            window.location.href = data.redirect;
          } else {
            document.getElementById('error').innerHTML = data.message;
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    });
  </script>

</body>

</html>
