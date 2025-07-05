<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Sign Up Page</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #21463f, #0f9576);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .form-container {
      background: #ffffff;
      padding: 40px 30px;
      border-radius: 20px;
      box-shadow: 0 8px 24px rgba(24, 94, 68, 0.1);
      width: 350px;
      text-align: center;
    }

    h2 {
      margin-bottom: 25px;
      color: #0b280d;
      font-weight: 600;
    }

    input[type="text"],
    input[type="password"] {
      width: 100%;
      padding: 12px;
      margin: 10px 0;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 14px;
      transition: border 0.3s;
    }

    input:focus {
      border-color: #116424;
      outline: none;
    }

    button {
      width: 100%;
      padding: 12px;
      margin-top: 20px;
      background-color: #22b17d;
      color: white;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background-color: #6d9e92;
    }

    .error-message {
      color: red;
      text-align: center;
      margin-top: 10px;
    }

    .success-message {
      color: green;
      text-align: center;
      margin-top: 10px;
    }
  </style>
</head>

<body>

  <div class="form-container">
    <h2>Sign Up</h2>
    <form id="signupForm">
      <input type="text" id="username" placeholder="Username" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Register</button>
      <div id="message"></div>
    </form>
  </div>

  <script>
    document.getElementById('signupForm').addEventListener('submit', function (event) {
      event.preventDefault();

      const username = document.getElementById('username').value;
      const password = document.getElementById('password').value;

      fetch('/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `username=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`
      })
        .then(response => response.text())
        .then(data => {
          const messageDiv = document.getElementById('message');

          if (data.includes('✅ Registration successful')) {
            messageDiv.className = 'success-message';
            messageDiv.innerHTML = data;

            setTimeout(() => {
              window.location.href = 'login.html'; // Redirect to login after 2 seconds
            }, 2000);
          } else {
            messageDiv.className = 'error-message';
            messageDiv.innerHTML = data;
          }
        })
        .catch(error => {
          console.error('Error:', error);
          document.getElementById('message').className = 'error-message';
          document.getElementById('message').innerHTML = '❌ Something went wrong. Please try again.';
        });
    });
  </script>

</body>

</html>
