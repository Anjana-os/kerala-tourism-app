<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Sign In Page</title>

  <!-- Google Fonts -->
  <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet">

  <!-- Font Awesome (for icons) -->
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />

  <style>
    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
      padding: 0;
      font-family: 'Poppins', sans-serif;
      background: linear-gradient(135deg, #97aeaa, #8b9e76);
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .signin-container {
      background: rgba(255, 255, 255, 0.15);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      padding: 40px 30px;
      border-radius: 20px;
      box-shadow: 0 8px 32px rgba(52, 90, 66, 0.25);
      width: 350px;
      text-align: center;
      color: #fff;
    }

    .signin-container h2 {
      margin-bottom: 30px;
      font-weight: 600;
      font-size: 28px;
    }

    .signin-button {
      width: 100%;
      padding: 14px;
      margin: 12px 0;
      border: none;
      border-radius: 10px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }

    .admin-button {
      background: #587651;
      color: #fff;
    }

    .admin-button:hover {
      background: #77917c;
      transform: scale(1.03);
      box-shadow: 0 4px 15px rgba(123, 244, 159, 0.4);
    }

    .customer-button {
      background: #28a745;
      color: #fff;
    }

    .customer-button:hover {
      background: #1e7e34;
      transform: scale(1.03);
      box-shadow: 0 4px 15px rgba(6, 74, 17, 0.4);
    }

    @media (max-width: 400px) {
      .signin-container {
        width: 90%;
        padding: 30px 20px;
      }
    }
  </style>
</head>
<body>

  <div class="signin-container">
    <h2>Welcome </h2>
    <button class="signin-button admin-button" onclick="signinAs('admin')">
      <i class="fas fa-user-shield"></i> Sign in as Admin
    </button>
    <button class="signin-button customer-button" onclick="signinAs('customer')">
      <i class="fas fa-user"></i> Sign in as Customer
    </button>
  </div>

  <script>
    function signinAs(role) {
      if (role === 'admin') {
        window.location.href = "loginadmin.html";
      } else {
        window.location.href = "sign2.html";
      }
    }
  </script>

</body>
</html>
