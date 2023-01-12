//https://api.github.com/users

const api = `https://api.github.com/users`;
const getUser = async (username) => {
     const res = await fetch(`https://api.github.com/users/${username}`);
     try {
          if (res.status == 200) {
               const data = await res.json();
               return data;
          }
     } catch (error) {
          console.log(error);
     }
};

const doc = document.addEventListener("DOMContentLoaded", () => {
     const searchForm = document.querySelector("#searchForm");
     searchForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const searchInput = document.querySelector("#searchInput");
          const username = searchInput.value.trim();
          if (username.length > 0) {
               const user = await getUser(username);
               console.log(user);
          }
     });
});
