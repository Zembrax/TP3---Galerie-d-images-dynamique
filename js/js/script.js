function performSearch(imageCount) {
    const searchInput = document.getElementById('searchInput').value.trim();

    // Vérifier si la valeur de recherche n'est pas vide
    if (searchInput !== '') {
        fetch(`https://api.pexels.com/v1/search?query=${searchInput}&per_page=${imageCount}&page=1`, {
            method: 'GET',
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
            if (data.photos.length === 0) {
                // Afficher le message indiquant qu'il n'y a plus d'images à charger
                document.getElementById('finMessage').style.display = 'block';
            } else {
                // Cacher le message s'il y a encore des images à charger
                document.getElementById('finMessage').style.display = 'none';
                displayImages(data.photos);
            }
        })
        .catch(error => {
            console.error('Une erreur s\'est produite :', error.message);
        });
    }
}


// Fonction pour afficher les images dans la galerie
function displayImages(photos) {
    const gallerySection = document.querySelector('.Page_site');
    gallerySection.innerHTML = ''; // Effacer le contenu précédent de la galerie

    // Parcourir les photos et les ajouter à la galerie
    photos.forEach(photo => {
        const imageElement = document.createElement('img');
        imageElement.src = photo.src.medium;
        imageElement.alt = photo.photographer;
        imageElement.classList.add('gallery-image'); // Ajouter une classe pour appliquer le style CSS
        gallerySection.appendChild(imageElement);
    });
}

// Définition de la fonction pour mettre à jour le nombre d'images à charger
function updateImageCount() {
    const sliderValue = document.getElementById('monSlider').value;
    const imageCountElement = document.getElementById('imageCount');
    if (imageCountElement) {
        imageCountElement.textContent = sliderValue;
        performSearch(sliderValue);
    } else {
        console.error('Element with ID "imageCount" not found.');
    }
}

// Détection du défilement de la page pour charger plus d'images lorsque l'utilisateur atteint le bas de la page
window.addEventListener('scroll', function() {
    // Vérifier si l'utilisateur a atteint le bas de la page
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
        // Charger plus d'images en appelant la fonction performSearch()
        const currentImageCount = parseInt(document.getElementById('monSlider').value);
        const newImageCount = currentImageCount + 10; // Charger 10 images supplémentaires à chaque fois
        performSearch(newImageCount);
    }
});

// Initialisation : Charger les images initiales au chargement de la page
document.addEventListener('DOMContentLoaded', function() {
    const initialImageCount = parseInt(document.getElementById('monSlider').value);
    performSearch(initialImageCount);
});