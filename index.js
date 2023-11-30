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
        return `<div> <a id = "puppyName" href=#${puppy.name}> 
            <h2> ${puppy.name} </h2> </a>
            <div> <img id = "allPuppyImage" src = ${puppy.imageUrl} /> </div>
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
        <div class = "selectedPuppy">
        <h2> Selected Puppy: ${singlePupFound.name}</h2>
        <h3> Breed: ${singlePupFound.breed} </h3>
        <img class = "puppyImage" src = ${singlePupFound.imageUrl}>
        <div> <a class = "backTag" href=#> Back to all puppies</a> </div>
        </div>
        `
    } else {
        selectedPuppyDiv.innerHTML = ""
    }

}
getPuppies();