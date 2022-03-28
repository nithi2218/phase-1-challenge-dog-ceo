// challenge - 1

// 1. on page load, fetches the images using the url above ⬆️
// 2. parses the response as JSON
// 3. adds image elements to the DOM for each 🤔 image in the array

document.addEventListener('DOMContentLoaded', (event) => {
    fetchImages()
    fetchBreeds()
    
});

let breeds; // store breeds from fetch call
const imgUrl = "https://dog.ceo/api/breeds/image/random/4"

let fetchImages = () => {
    fetch(imgUrl)
    .then((response) => response.json())
    .then(function(data) {

        let images = data.message
        for (const imageUrl of images) {
            addImage(imageUrl)
        }
    })
    .catch(function (error) {
        console.error(`Fetch failed: ${error}`)
    })
}

let addImage = (imgSource) => {
    let imagesContainer = document.getElementById('dog-image-container');
    let item = `<img src="${imgSource}" />`
    imagesContainer.innerHTML += item
}

// challenge 2
const breedUrl = 'https://dog.ceo/api/breeds/list/all' 


let fetchBreeds = () => {
    fetch(breedUrl)
    .then((response) => response.json())
    .then((data) => {
        breeds = Object.keys(data.message)

        updateBreedListing(breeds);
        breedDropdownListener();
    })
    .catch(function (error) {
        console.error(`Fetch failed: ${error}`)
    })
}

// let filteredList

let createBreed = (breed) => {
// create the single li 

    let breedsContainer = document.getElementById('dog-breeds');

    let li = document.createElement('li')
    li.textContent = breed
    breedsContainer.appendChild(li)

    li.addEventListener('click', (event) => {
        event.target.style.color = 'red'
       event.target.classList.add('li-style');  
    })
    
    //the following won't work.
    // let li = `<li>${breed}</li>` 
    // breedsContainer.innerHTML += li
}

let updateBreedListing = (breeds) => {
    // take in all breeds
    // empty current ul listing
    // loop and add the breed array received

    let breedsContainer = document.getElementById('dog-breeds');
    breedsContainer.innerHTML = '';

    breeds.forEach( (breed) =>  createBreed(breed) );
}

let filterBreeds = (alphabet) => {
    let filteredBreeds = breeds.filter(breed => breed.startsWith(alphabet))
    updateBreedListing(filteredBreeds)
    
}

let breedDropdownListener = () => {
    // listen to change event
    // filter the breeds array

    let breedSelect = document.getElementById('breed-dropdown');

    breedSelect.addEventListener('change', (event) => {
        let alphabet = event.target.value
        filterBreeds(alphabet)
    })
}