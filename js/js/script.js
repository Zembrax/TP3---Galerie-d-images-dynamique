let page = 1;

function performSearch() {
    const searchInput = document.getElementById('searchInput').value.trim();
    const imageCount = document.getElementById('monSlider').value;

    if (searchInput !== '') {
        fetch(`https://api.pexels.com/v1/search?query=${searchInput}&per_page=${15}&page=${page}`, {
            headers: {
                'Authorization': 'e3sFrokIhhSLtKi03d3l4cT7yRQPdj8YL9EHzDqn704H3abGPtrRn8kT'
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Échec de la requête API');
            }
            return response.json();
        })
        .then(data => {
            displayImages(data.photos);
            page++;
        })
        .catch(error => {
            console.error('Une erreur s\'est produite :', error.message);
        });
    }
}

function displayImages(photos) {
    const gallerySection = document.querySelector('.Page_site');

    photos.forEach(photo => {
        const imageElement = document.createElement('img');
        imageElement.src = photo.src.medium;
        imageElement.alt = photo.photographer;
        applyImageStyles(imageElement);
        gallerySection.appendChild(imageElement);
    });
}

function applyImageStyles(imageElement, columnCount) {

    imageElement.style.height = 'auto';
    imageElement.style.margin = '5px';
    imageElement.style.border = '1px solid #ccc';
    imageElement.style.borderRadius = '5px';
    imageElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    imageElement.style.maxWidth = '100%';
    imageElement.style.display = 'block'; 

    imageElement.style.marginLeft = 'auto';
    imageElement.style.marginRight = 'auto';
}

function applyImageStyles(imageElement, columnCount) {

    imageElement.style.height = 'auto';
    imageElement.style.margin = '10px';
    imageElement.style.border = '1px solid #ccc';
    imageElement.style.borderRadius = '5px';
    imageElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    imageElement.style.maxWidth = `calc(100% / ${columnCount} - 20px)`; 
}



function adjustColumnCount(columnCount) {
    const pageSiteSection = document.querySelector('.Page_site');
    const images = pageSiteSection.querySelectorAll('img');

    pageSiteSection.innerHTML = '';


    const columnWidth = `${100 / columnCount}%`;


    pageSiteSection.style.display = 'grid';
    pageSiteSection.style.gridTemplateColumns = `repeat(${columnCount}, 1fr)`;


    images.forEach(image => {
        applyImageStyles(image, columnCount);
        pageSiteSection.appendChild(image);
    });
}


window.addEventListener('DOMContentLoaded', function() {
    performSearch();
});


window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        performSearch();
    }
});


document.getElementById('monSlider').addEventListener('input', function() {
    const sliderValue = this.value;
    adjustColumnCount(sliderValue);
});