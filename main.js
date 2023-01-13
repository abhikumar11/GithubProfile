//https://api.github.com/users

const api = `https://api.github.com/users`;
const getUser = async (username) => {
     const res = await fetch(`https://api.github.com/users/${username}`);
     try {
          if (res.status == 200) {
               const data = await res.json();
               return data;
          } else {
               dispalyError(res.status);
          }
     } catch (error) {
          console.log(error);
     }
};
const loadData = (data) => {
     var userdata = "";
     userdata += ` <div class="profile-userpic">
     <img src="${data.avatar_url}" class="d-block">
 </div>
 <div class="profile-usertitle">`;
 if(data.name!==null) {
 userdata+= `<div class="profile-usertitle-name">${data.name}</div>`;
 }
 userdata+=  `<div class="profile-usertitle-job">${data.login}</div>
 </div>   
<div class="portlet light bordered">
 <!-- STAT -->
 <div class="row list-separated profile-stat">
     <div class="col-md-6 col-sm-6 col-xs-6">
         <div class="uppercase profile-stat-title">${data.followers}</div>
         <div class="uppercase profile-stat-text"> Followers </div>
     </div>
     <div class="col-md-6 col-sm-6 col-xs-6">
         <div class="uppercase profile-stat-title">${data.following}</div>
         <div class="uppercase profile-stat-text"> Following </div>
     </div>
 </div>
 <!-- END STAT --><div>`;
  if(data.bio!==null){
  userdata+=`<h4 class="profile-desc-title">About ${data.name}</h4>
     <span class="profile-desc-text"> ${data.bio}</span>`;
  }
  if(data.twitter_username!==null){
  userdata+=`</div><div class="margin-top-20 profile-desc-link">
 <i class="fab fa-twitter"></i>
     <a target="_blank" href="https://www.twitter.com/${data.twitter_username}">@${data.twitter_username}</a>
 </div></div>`
 };
 document.querySelector('#profile').innerHTML =userdata;
};
const dispalyError = (status) => {
     const msg = document.querySelector("#message");
     var errormsg = "";
     if (status === 404) {
          errormsg = `<div class="alert alert-danger text-center">User not found</div>`;
     } else {
          errormsg = `<div class="alert alert-danger text-center">Something went wrong</div>`;
     }
     msg.innerHTML = errormsg;
     setTimeout(() => {
          msg.innerHTML = ``;
     }, 5000);
};

const doc = document.addEventListener("DOMContentLoaded", () => {
     const searchForm = document.querySelector("#searchForm");
     searchForm.addEventListener("submit", async (e) => {
          e.preventDefault();
          const searchInput = document.querySelector("#searchInput");
          const username = searchInput.value.trim();
          if (username.length > 0) {
               const user = await getUser(username);
               if (user.login) {
                    loadData(user);
                    document.querySelector(".searchblock").style.display =
                         "none";
                    document.querySelector(".profile").style.display = "block";
                    console.log(user);
               }
          }
     });
});
