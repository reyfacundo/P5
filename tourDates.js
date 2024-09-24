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