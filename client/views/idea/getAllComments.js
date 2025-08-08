import updateUserLink from "../methode/authStatus.js";

updateUserLink();

const ideaId = 1;

(async () => {
  try {
    const res = await fetch(`http://localhost:3000/ideas/${ideaId}/comments`, {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erreur serveur :", errorData.message || res.statusText);
      return;
    }

    const comments = await res.json();
    console.log(comments);
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
})();
