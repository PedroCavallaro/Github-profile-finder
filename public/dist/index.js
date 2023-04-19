import { createUser, renderSavedProfiles } from "./methods.js";
const user = document.querySelector(".user");
const inputSearch = document.querySelector("#inputSearch");
const porfilePicture = document.querySelector("#porfilePicture");
const username = document.querySelector("#username");
const bio = document.querySelector("#bio");
const totalrepos = document.querySelector("#totalRepos");
const saveUser = document.querySelector("#saveUser");
const linkProfile = document.querySelector("#repos");
const containerSavedProf = document.querySelector(".containerSavedProf");
let savedUsers = [];
function renderProfile(info) {
    porfilePicture.src = info.avatar_url;
    username.innerHTML = info.username;
    bio.innerHTML = info.bio;
    totalrepos.innerHTML = String(info.public_repos);
    linkProfile.innerHTML = `<a href='https://github.com/${info.username}'>github.com/${info.username}</a>`;
}
window.addEventListener("load", () => {
    if (localStorage.getItem("savedUsers")) {
        savedUsers = JSON.parse(localStorage.getItem("savedUsers"));
        renderSavedProfiles(savedUsers, containerSavedProf);
    }
});
inputSearch.addEventListener("keyup", async (e) => {
    user.classList.add("show");
    const userInfo = await createUser(inputSearch.value);
    renderProfile(userInfo);
});
saveUser.addEventListener("click", async () => {
    const info = await createUser(username.innerHTML);
    savedUsers.push(info);
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers));
    containerSavedProf.innerHTML = "";
    renderSavedProfiles(savedUsers, containerSavedProf);
});
