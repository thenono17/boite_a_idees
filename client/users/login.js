const form = document.getElementById("FormLogin");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const res = await fetch("http://localhost:3000/users/login", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();

    if (res.ok) {
      console.log(data.message);
      window.location.href = "../authentification/auth.html";
    } else {
      console.error(data.message);
    }
  } catch (err) {
    console.error("Erreur réseau", err);
  }
});
