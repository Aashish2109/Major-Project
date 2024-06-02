document.addEventListener("DOMContentLoaded", function () {
  const loginForm = document.getElementById("login-Form");
  const otpContainer = document.getElementById("otp-Container");
  const otpForm = document.getElementById("otp-Form");

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
          if (data.owner_role == "Reader") {
            alert("OTP Sent Successfully");
            otpContainer.style.display = "block";
          }
          else{
            alert("reader does not exists")
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
          alert("Reader Login Successfully");
          window.location.href = "./readerfunctions.html";
        }
      })
      .catch((error) => console.error("Error:", error));
  });
});
