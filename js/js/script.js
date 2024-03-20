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
            page++; // Augmente le numéro de page pour la prochaine requête
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
        applyImageStyles(imageElement); // Appliquer les styles CSS aux nouvelles images
        gallerySection.appendChild(imageElement);
    });
}

function applyImageStyles(imageElement) {
    // Appliquer les styles CSS aux images nouvellement créées
    imageElement.style.height = 'auto';
    imageElement.style.margin = '10px';
    imageElement.style.border = '1px solid #ccc';
    imageElement.style.borderRadius = '5px';
    imageElement.style.boxShadow = '0 2px 4px rgba(0, 0, 0, 0.1)';
    imageElement.style.maxWidth = '100%'; // Limiter la largeur maximale des images
}

function updateImageCount() {
    const imageCountElement = document.getElementById('imageCount');
    if (imageCountElement) {
        imageCountElement.textContent = document.getElementById('monSlider').value;
        page = 1; // Réinitialise la page à 1 lors de la mise à jour du compteur d'images
        performSearch();
    } else {
        console.error('Element with ID "imageCount" not found.');
    }
}

// Appel de la fonction performSearch lorsque la page est chargée ou rechargée
window.addEventListener('DOMContentLoaded', function() {
    performSearch();
});

// Détection du défilement de la page pour charger plus d'images lorsque l'utilisateur atteint le bas de la page
window.addEventListener('scroll', function() {
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        performSearch();
    }
});

function adjustColumnCount(columnCount) {
    const pageSiteSection = document.querySelector('.Page_site');
    pageSiteSection.style.flexDirection = 'row'; // Assurez-vous que les éléments sont alignés horizontalement

    // Réinitialisez la largeur pour assurer une mise en page correcte
    pageSiteSection.style.width = 'auto'; 
    pageSiteSection.style.justifyContent = 'flex-start'; 

    // Ajoutez un style pour répartir les colonnes de manière égale
    pageSiteSection.style.flexWrap = 'wrap';
    pageSiteSection.style.alignContent = 'flex-start';

    // Calculez la largeur des colonnes en fonction du nombre de colonnes souhaité
    const columnWidth = `${100 / columnCount}%`;
    const images = pageSiteSection.querySelectorAll('img');
    images.forEach(image => {
        image.style.width = columnWidth;
    });
}

// Appel de la fonction adjustColumnCount() lorsque le slider est déplacé
document.getElementById('monSlider').addEventListener('input', function() {
    const sliderValue = this.value;
    adjustColumnCount(sliderValue);
});