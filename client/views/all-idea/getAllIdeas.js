import updateUserLink from "../methode/authStatus.js";

updateUserLink();

(async () => {
  try {
    const res = await fetch("http://localhost:3000/ideas", {
      method: "GET",
      credentials: "include",
    });

    if (!res.ok) {
      const errorData = await res.json();
      console.error("Erreur serveur :", errorData.message || res.statusText);
      return;
    }

    const ideas = await res.json();
    console.log(ideas);
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
})();
