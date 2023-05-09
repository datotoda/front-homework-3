const API_KEY = "3fd2be6f0c70a2a598f084ddfb75487c"

const API_MOVIES_URL = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${API_KEY}&page=1`
const API_SEARCH_URL = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&query=`
const API_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w1280"

async function getData(url) {
    return fetch(url).then((response) => response.json()).catch(() => {
        return fetch('src/js/demo_movies.json').then((response) => response.json())
    })
}

function getCardHtml(data) {
    let cardHtml = ``

    let vote = data.vote_average
    let voteColorClass = vote >= 8 ? "t-c-high" : vote >= 4 ? "t-c-norm" : "t-c-low"

    let titleTag = `<h3>${data.original_title}</h3>`
    let overviewTag = `<p>${data.overview}</p>`
    let voteTag = `<span class="${voteColorClass}">${vote}</span>`
    let imgageTag = `<img src="${API_IMAGE_BASE_URL + data.poster_path}" onerror="this.src='src/images/no_poster.jpg';">`

    cardHtml += `<div class="movie">`
    cardHtml += imgageTag
    cardHtml += `<div class="movie-front">`
    cardHtml += titleTag
    cardHtml += voteTag
    cardHtml += `</div>`
    cardHtml += `<div class="movie-back">`
    cardHtml += `<h3>Overview</h3>`
    cardHtml += overviewTag
    cardHtml += `</div>`
    cardHtml += `</div>`

    return cardHtml
}


async function search() {
    let search_input = document.getElementById('search_input')
    let data = await getData(API_SEARCH_URL + search_input.value)
    search_input.value = ""
    render(data.results)
}


async function initialLoad() {
    let data = await getData(API_MOVIES_URL)
    render(data.results)
}

async function render(results) {
    let section = document.getElementById("movies")
    section.innerHTML = ""
    for (let i = 0; i < results.length; i++){
        section.innerHTML += getCardHtml(results[i])
    }
}


