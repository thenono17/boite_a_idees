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

    const ideasContainer = document.getElementById("IdeasContainer");
    const template = document.getElementById("CardIdeaTemplate");

    ideas.forEach((idea) => {
      const card = template.content.cloneNode(true);

      const cardRoot = card.querySelector(".col-12");

      cardRoot.setAttribute("data-id", idea.idea_id);

      card.querySelector("#TilteIdea").textContent = idea.title || "Titre";
      card.querySelector("#DescriptionIdea").textContent =
        idea.descr || "Description";
      card.querySelector("#NumberLikeIdea").textContent = idea.likes || 0;

      const link = card.querySelector("a");
      if (idea.id) {
        link.href = `./../idea/ideapage.html?id=${idea.id}`;
      }

      ideasContainer.appendChild(card);
    });
  } catch (err) {
    console.error("Erreur réseau :", err);
  }
})();
