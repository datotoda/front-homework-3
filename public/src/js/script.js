const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"

const API_MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
const API_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280"
const MOVIE_BASE_URL = "https://www.themoviedb.org/movie/"

async function getData(url) {
    return fetch(url).then((response) => response.json()).catch(() => {
        return fetch('src/js/demo_movies.json').then((response) => response.json())
    })
}

function getCardEl(data) {
    let cardEl = document.createElement("div")
    cardEl.classList.add("movie")

    let vote = data.vote_average
    let voteColorClass = vote >= 8 ? "t-c-high" : vote >= 4 ? "t-c-norm" : "t-c-low"

    cardEl.innerHTML = `
    <img src="${API_IMAGE_BASE_URL + data.poster_path}" onerror="this.src='src/images/no_poster.jpg';">
    <div class="movie-front">
        <h3>${data.original_title}</h3>
        <span class="rate ${voteColorClass}">${vote}</span>
    </div>
    <div class="movie-back">
        <h3>Overview</h3>
        <p>${data.overview}</p>
    </div>
    `

    cardEl.addEventListener("click", () => {
        localStorage.setItem("movie", JSON.stringify(data));
        window.location = "movie.html"
    })

    return cardEl
}

async function search(query) {
    let data = await getData(query ? API_SEARCH_URL + query : API_MOVIES_URL)
    localStorage.setItem("movies", JSON.stringify(data.results));
    render_movies(data.results)
}

async function render_movies(results) {
    let section = document.getElementById("movies")
    section.innerHTML = ""
    for (let i = 0; i < results.length; i++){
        section.appendChild(getCardEl(results[i]))
    }
}


function setCoverImage(image_path) {
    const cover_image = document.getElementById("cover_image")
    const image = document.createElement("img")

    image.src = API_IMAGE_BASE_URL + image_path
    image.onerror = () => { image.src = 'src/images/no_poster.jpg' }

    cover_image.appendChild(image)
}

const navEl = document.createElement('header')
navEl.innerHTML = `
<nav>
    <div id="navbar_logo">
        <img src="src/images/kaxetinet_logo.png"/>
        <span>Kaxetinet</span>
    </div>
    <div class="search">
        <form id="search_form">
            <input type="text" name="q" id="search_input" onsubmit="search" placeholder="Search">
        </form>
    </div>
    </nav>
`
const body = document.querySelector('body')
body.insertBefore(navEl, body.firstChild)   


document.getElementById("search_form").addEventListener("submit", (e) => {
    e.preventDefault()
    const query = document.getElementById('search_input').value
    window.location = `index.html?q=${query}`
})

document.querySelector("#navbar_logo").addEventListener("click", (e) => {
    window.location = "index.html"
})