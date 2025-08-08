const from = document.getElementById("FormCreateAccount");

from.addEventListener("submit", async (e) => {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, email, password }),
    });

    const data = await res.json();

    if (res.ok) {
      console.log(data.message || "Inscription réussie !");
      window.location.href = "../login/loginpage.html";
    } else {
      console.error(data.message || "Erreur lors de l’inscription");
    }
  } catch (err) {
    console.error("Erreur réseau : ", err);
  }
});
