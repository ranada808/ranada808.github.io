<!doctype html>
<html>
<head>
<meta charset="utf-8">
<title>Login</title>
<style type="text/css">
body {
	margin-left: 600px;
	margin-top: 300px;
	margin-right: 100px;
	margin-bottom: 100px;
}
</style>
</head>

<body>
<h1>Login</h1>
<form method="post" name="login_form">
<label>	Username:
  <br/></label>
<input name="username" type="text" required="required" maxlength="20">
<br/>
<label>Password:
  <br/></label>
<input name="password" type="password" required="required" maxlength="20"><br/>
<input type="submit" formaction="access_granted.php" formmethod="POST" value="Login">
</form>
<p><a href="register.php">Register</a><br><br>
  <a href="KBJJHome.html">Return to Home</a>
</p>

<p>&nbsp;</p>
</body>
</html>
