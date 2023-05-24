const movie = JSON.parse(localStorage.getItem("movie"))
const tickets = JSON.parse(localStorage.getItem("tickets"))

let ticketsCost = 0
let serviceCost = 2.99

tickets.forEach(ticket => {
    const ticketCost = ticket.isVip ? 25 : 15

    const ticketEl = document.createElement("div")
    ticketEl.classList.add("ticket")
    
    ticketEl.innerHTML = `
    <div class="color ${ ticket.isVip ? "vip" : ""}"></div>
    <div class="data">
        <div class="info">
            <div>Seat: ${ticket.seat}</div>
            <div>Row: ${ticket.row}</div>
        </div>
        <div>
            <div class="price">${(Math.ceil(ticketCost * 100) / 100).toFixed(2)}</div>
        </div>
    </div>
    `

    ticketsCost += ticketCost
    document.querySelector(".ticket_checkout #tickets").appendChild(ticketEl)
});

let totalCost = ticketsCost + serviceCost

document.querySelector(".ticket_checkout #movie_info .title").textContent = movie.original_title
document.querySelector(".ticket_checkout #tikets_price").textContent = (Math.ceil(ticketsCost * 100) / 100).toFixed(2)
document.querySelector(".ticket_checkout #service_price").textContent = (Math.ceil(serviceCost * 100) / 100).toFixed(2)
document.querySelector(".ticket_checkout #total_cost .price").textContent = (Math.ceil(totalCost * 100) / 100).toFixed(2)


