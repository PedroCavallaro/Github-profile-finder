import { createUser, renderSavedProfiles } from "./methods"
import { gitUserInfo } from "./methods"

const user: Element = document.querySelector(".user")
const inputSearch: HTMLSelectElement = document.querySelector("#inputSearch")
const porfilePicture: HTMLImageElement = document.querySelector("#porfilePicture")
const username: HTMLParagraphElement = document.querySelector("#username")
const bio: Element = document.querySelector("#bio")
const totalrepos: HTMLParagraphElement = document.querySelector("#totalRepos")
const saveUser: HTMLButtonElement = document.querySelector("#saveUser")
const linkProfile: Element = document.querySelector("#repos")
const containerSavedProf: HTMLDivElement = document.querySelector(".containerSavedProf")
let savedUsers: gitUserInfo[] = []

function renderProfile(info:gitUserInfo){
    porfilePicture.src = info.avatar_url
    username.innerHTML = info.username
    bio.innerHTML = info.bio 
    totalrepos.innerHTML = String(info.public_repos)
    linkProfile.innerHTML = `<a href='https://github.com/${info.username}'>github.com/${info.username}</a>`
}

window.addEventListener("load", ()=>{
    if(localStorage.getItem("savedUsers")){
        savedUsers = JSON.parse(localStorage.getItem("savedUsers"))
        renderSavedProfiles(savedUsers,containerSavedProf)
    }
})

inputSearch.addEventListener("keyup", async (e)=>{
    user.classList.add("show")
    const userInfo = await createUser(inputSearch.value)    
    renderProfile(userInfo)
})

saveUser.addEventListener("click", async ()=>{
    const info = await createUser(username.innerHTML)
    savedUsers.push(info)
    localStorage.setItem("savedUsers", JSON.stringify(savedUsers))
    containerSavedProf.innerHTML = ""
    renderSavedProfiles(savedUsers, containerSavedProf)
})
