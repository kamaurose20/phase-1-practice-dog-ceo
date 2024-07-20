console.log('%c HI', 'color: firebrick')
document.addEventListener('DOMContentLoaded', () => {

    const imgUrl = "https://dog.ceo/api/breeds/image/random/4";
    const breedUrl = "https://dog.ceo/api/breeds/list/all";
    let allBreeds = [];

    function fetchImgUrl() {
        return fetch(imgUrl)
            .then(response => response.json())
            .then(json => renderImgUrl(json.message))
            .catch(error => console.error('Error fetching images:', error));
    }

    function renderImgUrl(images) {
        const div = document.querySelector('div');
        images.forEach(imageUrl => {
            const img = document.createElement('img');
            img.src = imageUrl;
            div.appendChild(img);
        });
    }

    function fetchBreedUrl() {
        return fetch(breedUrl)
            .then(response => response.json())
            .then(json => {
                allBreeds = Object.keys(json.message); 
                renderBreedUrl(allBreeds);
            })
            .catch(error => console.error('Error fetching breeds:', error));
    }

    function renderBreedUrl(breeds) {
        const ul = document.querySelector('ul');
        ul.innerHTML = ''; 
        breeds.forEach(breed => {
            const li = document.createElement('li');
            li.innerHTML = breed;
            ul.appendChild(li);
            li.addEventListener('click', () => {
                li.style.color = 'green';
            });
        });
    }

    function filterBreedsByLetter(letter) {
        const filteredBreeds = allBreeds.filter(breed => breed.startsWith(letter));
        renderBreedUrl(filteredBreeds);
    }

    const dropdown = document.getElementById('breed-dropdown');
    dropdown.addEventListener('change', (event) => {
        const selectedLetter = event.target.value;
        filterBreedsByLetter(selectedLetter);
    });

    fetchImgUrl();
    fetchBreedUrl();
});
