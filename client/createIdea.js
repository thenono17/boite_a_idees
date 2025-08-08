const form = document.getElementById("FormHome");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = document.getElementById("title").value;
  const descr = document.getElementById("description").value;
  const categorie = document.getElementById("categorie").value;

  try {
    const res = await fetch("http://localhost:3000/ideas", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, descr, categorie }),
    });

    const data = await res.json();
    if (res.ok) {
      console.log("Idée rajouté");
      window.location.href = "./views/all-idea/all-ideapage.html";
    } else {
      console.error(data.message);
    }
  } catch (err) {
    console.error("Erreur réseau", err);
  }
});
