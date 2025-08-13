var x = document.getElementById("login");
var y = document.getElementById("register");
var z = document.getElementById("btn");

function login() {
  x.style.left = "27px";
  y.style.right = "-350px";
  z.style.left = "0px";
}

function register() {
  x.style.left = "-350px";
  y.style.right = "25px";
  z.style.left = "150px";
}

function myLogPassword() {
  var a = document.getElementById("logPassword");
  var b = document.getElementById("eye");
  var c = document.getElementById("eye-slash");

  if (a.type === "password") {
    a.type = "text";
    b.style.opacity = "0";
    c.style.opacity = "1";
  } else {
    a.type = "password";
    b.style.opacity = "1";
    c.style.opacity = "0";
  }
}

function myRegPassword() {
  var d = document.getElementById("regPassword");
  var b = document.getElementById("eye-2");
  var c = document.getElementById("eye-slash-2");

  if (d.type === "password") {
    d.type = "text";
    b.style.opacity = "0";
    c.style.opacity = "1";
  } else {
    d.type = "password";
    b.style.opacity = "1";
    c.style.opacity = "0";
  }
}

window.onload = function () {
  Swal.fire({
    title: "Use This Info To Login",
    html: `
      <p style="font-size:16px; margin-bottom:5px;">
          Use the following credentials to log in:
      </p>
      <p style="font-size:15px;">
          <b>Email:</b> youssef@gmail.com<br>
          <b>Password:</b> youssef
      </p>
      <p style="font-size:15px;color:red">
          If You Want Add New Email, Pass Go to Sign Up and Back to Login
      </p>
    `,
    confirmButtonText: "Got it!",
    confirmButtonColor: "#0d7c66c0",
    background: "#f0f0f0",
    color: "#333",
    customClass: {
      popup: "custom-swal-popup",
    },
  });
};

document.querySelector("#register .input-submit").addEventListener("click", function (e) {
  e.preventDefault();

  let username = document.getElementById("regUsername").value.trim();
  let email = document.getElementById("regEmail").value.trim();
  let password = document.getElementById("regPassword").value.trim();

  if (!username || !email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Incomplete Fields",
      text: "Please fill all fields to sign up.",
    });
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("email", email);
  localStorage.setItem("password", password);

  Swal.fire({
    icon: "success",
    title: "Account Created!",
    text: "You can now log in with your new account.",
    confirmButtonText: "OK",
  }).then(() => {
    login();
  });
});

document.querySelector("#login .input-submit").addEventListener("click", function (e) {
  e.preventDefault();

  let email = document.getElementById("logEmail").value.trim();
  let password = document.getElementById("logPassword").value.trim();

  if (!email || !password) {
    Swal.fire({
      icon: "warning",
      title: "Missing Information",
      text: "Please enter both email and password.",
    });
    return;
  }

  let storedEmail = localStorage.getItem("email");
  let storedPassword = localStorage.getItem("password");

  if (
    (storedEmail && email === storedEmail && password === storedPassword) ||
    (email === "youssef@gmail.com" && password === "youssef")
  ) {
    Swal.fire({
      icon: "success",
      title: "Login Successful!",
      showConfirmButton: false,
      timer: 1500,
    }).then(() => {
      window.location.href = "Home.html";
    });
  } else {
    Swal.fire({
      icon: "error",
      title: "Incorrect Credentials",
      text: "Invalid email or password!",
    });
  }
});
