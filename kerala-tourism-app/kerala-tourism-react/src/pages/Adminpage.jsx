<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Admin - Add Tourist Place</title>
  <style>
    body {
      font-family: Arial, sans-serif;
      background: #f0f9f0;
      padding: 40px;
    }

    h1 {
      text-align: center;
      color: #2d7030;
    }

    .form-container {
      background: #fff;
      padding: 20px;
      max-width: 500px;
      margin: 0 auto;
      border-radius: 12px;
      box-shadow: 0 0 10px rgba(0,0,0,0.1);
    }

    select, input, textarea {
      width: 100%;
      padding: 10px;
      margin-bottom: 15px;
      border: 1px solid #ccc;
      border-radius: 8px;
    }

    button {
      padding: 12px;
      background-color: #28a745;
      color: white;
      border: none;
      border-radius: 6px;
      cursor: pointer;
      font-weight: bold;
    }

    button:hover {
      background-color: #1e7e34;
    }
  </style>
</head>
<body>

  <h1>Admin Panel - Add Tourist Place</h1>

  <div class="form-container">
    <form action="/add-place" method="POST">
      <label for="district">Select District:</label>
      <select name="district" id="district" required>
        <option value="">--Choose District--</option>
        <option value="trivandrum">Thiruvananthapuram</option>
        <option value="kollam">Kollam</option>
        <option value="pathanamthitta">Pathanamthitta</option>
        <option value="alappuzha">Alappuzha</option>
        <option value="kottayam">Kottayam</option>
        <option value="idukki">Idukki</option>
        <option value="ernakulam">Ernakulam</option>
        <option value="thrissur">Thrissur</option>
        <option value="palakkad">Palakkad</option>
        <option value="Malappuram">Malappuram</option>
        <option value="Kozhikode">Kozhikode</option>
        <option value="Wayanad">Wayanad</option>
        <option value="Kannur">Kannur</option>
        <option value="Kasaragod">Kasaragod</option>
      </select>

      <input type="text" name="name" placeholder="Place Name" required>
      <input type="text" name="address" placeholder="Address" required>
      <input type="text" name="image" placeholder="Image URL" required>

      <button type="submit">➕ Add Place</button>
    </form>
  </div>

</body>
</html>
