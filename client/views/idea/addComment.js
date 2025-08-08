const form = document.getElementById("CommentForm");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const ideaId = 1;
  const descr = document.getElementById("comment").value;

  try {
    const res = await fetch(`http://localhost:3000/ideas/${ideaId}/comments`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ descr }),
    });
    const data = res.json();
    if (res.ok) {
      console.log(data.message);
    } else {
      console.error(data.message);
    }
  } catch (err) {
    console.error("Erreur réseau", err);
  }
});
