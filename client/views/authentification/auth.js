(async function () {
  try {
    const res = await fetch("http://localhost:3000/users/auth", {
      credentials: "include",
    });
    const data = await res.json();
    if (res.ok) {
      console.log("Utilisateur connecté");
      window.location.href = "../../index.html";
    } else {
      console.error(data.message);

      window.location.href = "../login/loginpage.html";
    }
  } catch (err) {
    console.error("Erreur lors de la vérification", err);
    window.location.href = "../login/loginpage.html";
  }
})();
