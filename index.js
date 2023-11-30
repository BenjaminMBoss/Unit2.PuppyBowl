let puppyList = [];

const puppyDiv = document.querySelector(".puppyContainer");
const selectedPuppyDiv = document.querySelector(".selectedPuppy")


window.addEventListener("hashchange", () => {
    render();
})

async function getPuppies() {
    const puppyGrab = await fetch ("https://fsa-puppy-bowl.herokuapp.com/api/2310-ftb-et-web-ft/players")
    const puppyData = await puppyGrab.json();
    puppyList = puppyData.data.players;
    render();
}

function render() {
    const html = puppyList.map((puppy) => {
        return `<div> <a href=#${puppy.name}> 
            <h2> ${puppy.name} </h2> </a>
            <h3> ${puppy.breed} </h3>
            </div>
            `
    })
    
    const singlePup = window.location.hash.slice(1);
    const singlePupFound = puppyList.find((puppy) => {
        return puppy.name === singlePup;
    })
    
    puppyDiv.innerHTML =  singlePupFound ? "": `<div class = "allPuppyContainers"> ${html.join("")}</div>`

    if (singlePupFound) {
        selectedPuppyDiv.innerHTML =   `
        <h2> Selected Puppy: ${singlePupFound.name}</h2>
        <h3> ${singlePupFound.breed} </h3>
        <img src = ${singlePupFound.imageUrl}>
        <div> <a href=#> Back to all puppies</a> </div>
        `
    } else {
        selectedPuppyDiv.innerHTML = ""
    }

}
getPuppies();