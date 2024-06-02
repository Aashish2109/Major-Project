document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-form");
  const otpContainer = document.getElementById("otp-container");
  const otpForm = document.getElementById("otp-form");

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(loginForm);
    const email = formData.get("email");

    fetch("/send-otp", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          fetch("/login", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ email: email }),
          });
          if (data.owner_role == "Admin") {
            alert("OTP Sent Succesully");
            otpContainer.style.display = "block";
          }
          else{
            alert("admin does not exists")
          }
        }
      })
      .catch((error) => console.error("Error:", error));
  });

  otpForm.addEventListener("submit", function (event) {
    event.preventDefault();
    const formData = new FormData(otpForm);
    const otp = formData.get("otp");

    fetch(`/validate-otp/${otp}`, {
      method: "POST",
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          alert(data.error);
        } else {
          alert("Admin Login Successfully");
          window.location.href = "./adminfunctions.html";
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
