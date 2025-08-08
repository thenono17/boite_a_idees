import getData from "../methode/getData.js";
import updateUserLink from "../methode/authStatus.js";

updateUserLink();

const ideaId = 1;

(async () => {
  const comments = await getData(
    `http://localhost:3000/ideas/${ideaId}/comments`
  );
  if (comments) {
    console.log(comments);
  } else {
    console.error("Impossible de récupérer les commentaires");
  }
})();
