const ideasContainer = document.getElementById("IdeasContainer");

try {
  const res = await fetch("http://localhost:3000/ideas", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const ideas = await res.json();
  console.log(ideas);
} catch (err) {
  console.error("Erreur lors du chargement des idées", err);
}
