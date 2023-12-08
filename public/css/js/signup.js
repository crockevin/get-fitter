const signupForm = document.getElementById("signup-Form");

const signupFormHandler = async (event) => {
  event.preventDefault();

  const firstName = document.querySelector("#first_name").valueOf.trim();
  const lastName = document.querySelector("#last_name").valueOf.trim();
  const email = document.querySelector("#email").valueOf.trim();
  const password = document.querySelector("#password").valueOf.trim();

  if (!firstName || !lastName || !email || !password) {
    alert("Fill in all required fields");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords incorrect");
    return;
  }

  try {
    const response = await fetch("", {
      method: "POST",
      body: JSON.stringify({ firstName, lastName, email, password }),
      headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
      document.location.replace("/");
    } else {
      alert("sign up failed .");
    }
  } catch (error) {
    console.error("Error during fetch:", error);
    alert(
      "A problem has arisen. Kindly attempt the action anew at a later time."
    );
  }
};
signupForm.addEventListener('submit', signupFormHandler);