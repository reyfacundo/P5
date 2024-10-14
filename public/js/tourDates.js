let user = prompt("Welcome in! What's your name?");

while (!user || user.length <= 2) {
    if (!user) {
        alert("Please enter a name.");
    } else if (user.length <= 2) {
        alert("That can't be a name!");
    }
    user = prompt("Welcome in! What's your name?");
}

document.querySelector('#user').textContent = `HEY THERE ${user}!`

let age = +prompt("What's your age?");

while (isNaN(age)) {
    age = +prompt("What's your age?");
}

if (age < 18) {
    Swal.fire({
        iconColor: '#d33311',
        icon: "error",
        title: "No minors allowed!",
        background: '#151414',
        confirmButtonColor: "#d33311",
        color: "#fafafa",
    })
    document.querySelectorAll('li img').forEach(e => {
        e.removeAttribute('onClick');
        e.style.display = 'none';
    })
    document.querySelectorAll('li h2').forEach(e => e.classList.remove('text-red-600'));
    document.querySelectorAll('li h2').forEach(e => e.classList.add('text-gray-500'));
    document.querySelector('.get').textContent = "ONLY +18 CAN GET TICKETS"
}


let tickets = {
    "Las Vegas": 100,
    "Tokyo": 100,
    "Brisbane": 1,
    "Inglewood": 0,
    "Auckland": 100,
    "Dunedin": 2
}

function getTickets(concertLocation, event) {
    if (tickets[concertLocation] == 0) {
        Swal.fire({
            icon: "info",
            title: "Sold Out!",
            text: "You are outta luck!, there are no more tickets for " + concertLocation,
            background: '#151414',
            confirmButtonColor: "#d33311",
            iconColor: "#d33311",
            color: "#fafafa",
        }
        );
        disableSoldOutButtons(event)
        return
    }
    if (tickets[concertLocation] == 1) {
        Swal.fire({
            icon: "success",
            title: "Sold!",
            text: "You have tickets to the " + concertLocation + " concert",
            background: '#151414',
            confirmButtonColor: "#9ce897",
            color: "#fafafa",
        })
        disableSoldOutButtons(event)
        tickets[concertLocation] -= 1
        return
    }
    tickets[concertLocation] -= 1
    Swal.fire({
        icon: "success",
        title: "Sold!",
        text: "You have tickets to the " + concertLocation + " concert",
        background: '#151414',
        confirmButtonColor: "#9ce897",
        color: "#fafafa",
    })

}


function disableSoldOutButtons(event){
    const li = event.target.closest('li');
    const span = document.createElement('span');
    span.textContent = 'SOLD OUT!'
    span.classList.add('m-auto', 'text-red-600')
    li.appendChild(span)
    event.target.style.display = 'none';

    event.target.removeAttribute('onClick');
}