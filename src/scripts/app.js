import request from 'superagent'

function fetchAndRenderUser(usr){
  request.get(`https://api.github.com/users/${usr}`)
    .then((serverRes)=>{
      const userProfileEl = document.querySelector('.user-profile-col')
      const apiUserData = serverRes.body

      userProfileEl.innerHTML = `
        <img class="user-img" src="${apiUserData.avatar_url}" alt="img">
        <h2 class="user-name">${apiUserData.name}</h2>
        <h3 class="user-login">${apiUserData.login}</h3>
        <button class="user-follow"type="button" name="button">Follow</button>
        <h6 class="user-blockreport">Block or report user</h6>
        <h4 class="user-company">
          <i class="fas fa-user-friends"></i>
          ${apiUserData.company || ''}
        </h4>
        <p class="user-location">
          <i class="fas fa-map-marker-alt"></i>
          ${apiUserData.location || ''}
        </p>
        <p class="user-email">
          <i class="fas fa-envelope"></i>
          <a href="#">${apiUserData.email || ''}</a>
        </p>
        <p class="user-blog">
          <i class="fas fa-link"></i><a href="#">${apiUserData.blog || ''}</a>
        </p>
      `
    })

  request.get(`https://api.github.com/users/${usr}/repos`)
    .then((serverRes)=>{
      const userReposContainerEl = document.querySelector('.user-repos-col')
      const apiRepoData = serverRes.body

      console.log(apiRepoData);

      let bigHtmlStr = ''
      apiRepoData.forEach( repo =>{
        const d = new Date(repo.updated_at)
        let day = d.getDate()
        let month = d.getMonth()
        let year = d.getFullYear()

        console.log(year);
        bigHtmlStr += `
        <div class="repository">
          <h2><a href="${repo.url}"> ${repo.name}</a> </h2>
          <p>${repo.description || ''}</p>
          <div class="repo-stats">
            <span>${repo.language || ''}</span>
            <span>Updated on ${day}/${month}/${year}</span>
          </div>
        </div>
        `
      })

      userReposContainerEl.innerHTML = bigHtmlStr

    })
}


document.querySelector('input')
  .addEventListener('keydown', (e)=>{
    const inputEl = e.target
    if(e.keyCode === 13){
      fetchAndRenderUser(inputEl.value)
    }
  })

fetchAndRenderUser('tphdev')
