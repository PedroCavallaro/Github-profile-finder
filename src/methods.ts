export interface gitUserInfo{
    username:string,
    avatar_url: string,
    id:number,
    bio: string,
    public_repos: number,
    repos_url: string

}
export async function getUser(username: string) {
    const response = await fetch(`https://api.github.com/users/${username}`, {
        method: "GET"
        ,
        headers:{
            'Content-type' : 'application-json'
        }
    })
    
    return await (response).json()   
}

export async function createUser(username: string) {
    const response = await getUser(username) 
    const userInfo: gitUserInfo = {
        username: response.login,
        avatar_url: response.avatar_url,
        id: response.id,
        bio: response?.bio,
        public_repos: response.public_repos,
       repos_url: response.repos_url 
    }
    return userInfo
}

export function findUser(savedUsers: gitUserInfo[], username:string) {
    return savedUsers.find((e) => e.username === username);
}

export function renderSavedProfiles(savedUsers: gitUserInfo[], mainDiv: HTMLDivElement){  
    savedUsers.forEach((e)=>{
        mainDiv.innerHTML += `<div class="info">
                                <div>
                                <img class="infoImg" width="100px" height="100px" src='${e.avatar_url}'>
                                </div>
                                <div>
                                    <label>Username: ${e.username}</label>
                                    <label>Total repos: ${e.public_repos}</label>
                                    <a href='https://github.com/${e.username}'>https://github.com/${e.username}</label>
                                </div>
                            </div>`
                            
    }) 
                            

}

 
