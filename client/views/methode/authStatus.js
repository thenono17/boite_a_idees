export default async function updateUserLink() {
  try {
    const res = await fetch("http://localhost:3000/users/auth", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      console.warn("Utilisateur non connecté");
      return;
    }

    const user = await res.json();

    const userElement = document.getElementById("user-link");
    if (userElement) {
      userElement.textContent = `👤 ${user.username}`;
      userElement.href = "../profile/profile.html";
    }
  } catch (err) {
    console.error("Erreur lors de la vérification de l'utilisateur :", err);
  }
}
