const ideaId = 1;

try {
  const res = await fetch(`http://localhost:3000/ideas/${ideaId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const comment = await res.json();
  console.log(comment);
} catch (err) {
  console.error("Erreur lors du chargement des idées", err);
}
