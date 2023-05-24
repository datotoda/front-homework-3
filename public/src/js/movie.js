function setTotalCost(total_cost) {
    document.getElementsByClassName("total-cost")[0].textContent = total_cost
}

function movieDetailRender() {
    const movieEl = document.querySelector("#movie")

    let vote = data.vote_average
    let voteColorClass = vote >= 8 ? "t-c-high" : vote >= 4 ? "t-c-norm" : "t-c-low"
    let release_date = new Date(data.release_date);

    movieEl.innerHTML = `
    <div id="poster">
        <img src="${API_IMAGE_BASE_URL + data.poster_path}" onerror="this.src='src/images/no_poster.jpg';">
    </div>
    <div id="movie_information">
        <h1>${data.original_title}</h1>
        <span class="year">${release_date.getFullYear()}</span>
        <span class="rate ${voteColorClass}">${vote}</span>
        <h3>Overview</h3>
        <p>${data.overview}</p>
    </div>
    `    
}

function relatedMoviesRender() {
    const moviesEl = document.querySelector("#movies")
    const relatedMovies = movies.filter(movie => movie.id !== data.id)
    .sort(() => Math.random() - Math.random())
    relatedMovies.push(data)
    relatedMovies.slice(0, 4)
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
            window.scroll(100, 100);
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
document.querySelector("#seats .title").textContent = data.original_title

if (data.backdrop_path) {
    document.querySelector(".screen").style.background = `url("${API_IMAGE_BASE_URL + data.backdrop_path}") no-repeat center/cover`
}

document.querySelectorAll(".seat").forEach((seat, seat_index) => {
    seat.addEventListener("click", () => { 
        const cost = seat.classList.contains("vip-seat") ? 25 : 15
        if (seat.classList.contains("desabled-seat")) { 
            return
        }
        
        if (seat.classList.contains("seat-selected")) {
            totalCost -= cost
            seat.classList.remove("seat-selected")
            
            let seats = JSON.parse(localStorage.getItem("seats"))
            seats = seats.filter((s) => s !== seat_index).sort((a, b) => a - b)
            localStorage.setItem("seats", JSON.stringify(seats))
        } else {
            totalCost += cost
            seat.classList.add("seat-selected")
            
            let seats = JSON.parse(localStorage.getItem("seats"))
            seats.push(seat_index)
            seats.sort((a, b) => a - b)
            localStorage.setItem("seats", JSON.stringify(seats))
        }
        setTotalCost(totalCost)
    })
})

let totalCost = 0
localStorage.setItem("seats", JSON.stringify([]))
setTotalCost(totalCost)


function goCheckout() {
    let seats = JSON.parse(localStorage.getItem("seats"))
    let tickets = []

    seats.sort((a, b) => a - b).forEach((seat) => {
        tickets.push({
            row: (seat - seat % 10) / 10 + 1,
            seat: seat % 10 + 1,
            isVip: [23, 24, 25, 26, 33, 34, 35, 36].includes(seat) 
        })
    })
    localStorage.setItem("tickets", JSON.stringify(tickets))
    window.location = "checkout.html"
}

document.querySelector(".footer button").addEventListener("click", goCheckout)
