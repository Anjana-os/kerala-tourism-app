<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin Login</title>
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <style>
    body {
      margin: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #395c3f, #0a3a22);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .login-box {
      background: white;
      padding: 40px 30px;
      border-radius: 15px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.2);
      width: 100%;
      max-width: 400px;
    }

    .login-box h2 {
      text-align: center;
      margin-bottom: 25px;
      color: #2b5d36;
    }

    .input-group {
      margin-bottom: 20px;
    }

    .input-group label {
      display: block;
      font-weight: bold;
      margin-bottom: 8px;
      color: #333;
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
      border-color: #066b02;
      outline: none;
    }

    .login-btn {
      width: 100%;
      background: linear-gradient(to right, #3b7d31, #2c8f46);
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
      box-shadow: 0 6px 15px rgba(0, 128, 0, 0.3);
    }

    .bottom-text {
      text-align: center;
      margin-top: 20px;
      color: #2f7a42;
    }

    .bottom-text a {
      color: #127d0e;
      text-decoration: none;
    }

    .bottom-text a:hover {
      text-decoration: underline;
    }

    @media (max-width: 500px) {
      .login-box {
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>

  <div class="login-box">
    <h2>Admin Login</h2>
    <form action="/login" method="POST">
      <div class="input-group">
        <label for="admin-username">Username</label>
        <input type="text" id="admin-username" name="username" placeholder="Enter admin username" required />
      </div>
      <div class="input-group">
        <label for="admin-password">Password</label>
        <input type="password" id="admin-password" name="password" placeholder="Enter password" required />
      </div>
      <button class="login-btn" type="submit">Login</button>
    </form>
    <div class="bottom-text">
      Not an admin? <a href="login.html">Customer Login</a>
    </div>
  </div>

</body>
</html>
