import getData from "../methode/getData.js";
import updateUserLink from "../methode/authStatus.js";

updateUserLink();

(async () => {
  const comments = await getData(`http://localhost:3000/ideas`);
  if (comments) {
    console.log(comments);
  } else {
    console.error("Impossible de récupérer les commentaires");
  }
})();
