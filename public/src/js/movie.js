function movieDetailRender() {
    const movieEl = document.querySelector("#movie")

    let vote = data.vote_average
    let voteColorClass = vote >= 8 ? "t-c-high" : vote >= 4 ? "t-c-norm" : "t-c-low"


    movieEl.innerHTML = `
    <div id="poster">
        <img src="${API_IMAGE_BASE_URL + data.poster_path}" onerror="this.src='src/images/no_poster.jpg';">
    </div>
    <div id="movie_information">
        <h1>${data.original_title}</h1>
        <span class="rate ${voteColorClass}">${vote}</span>
        <h3>Overview</h3>
        <p>${data.overview}</p>
    </div>
    `    
}

function relatedMoviesRender() {
    const moviesEl = document.querySelector("#movies")
    movies.filter(movie => movie.id !== data.id)
    .sort(() => Math.random() - Math.random())
    .slice(0, 4)
    .forEach(element => {
        const movieEl = document.createElement("div")
        movieEl.classList.add("related_movie")

        let vote = element.vote_average
        let voteColorClass = vote >= 8 ? "t-c-high" : vote >= 4 ? "t-c-norm" : "t-c-low"
    
        movieEl.innerHTML = `
        <div id="poster">
            <img src="${API_IMAGE_BASE_URL + element.poster_path}" onerror="this.src='src/images/no_poster.jpg';">
            <span class="rate ${voteColorClass}">${vote}</span>
        </div>
        <div id="movie_information">
            <h1>${element.original_title}</h1>
        </div>
        `
        movieEl.addEventListener("click", () => {
            localStorage.setItem("movie", JSON.stringify(element));
            window.location.reload()
        })

        moviesEl.appendChild(movieEl)
    });
}


const data = JSON.parse(localStorage.getItem("movie"))
const movies = JSON.parse(localStorage.getItem("movies"))

setCoverImage(data.backdrop_path)
movieDetailRender()
relatedMoviesRender()
