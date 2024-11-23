const apiKey = 'AIzaSyBMzE8QEtgaucF9WEg2kOpKKhWOUQ1nozw'; // Remplacez par votre clé API
const channelId = 'UCx1zi13TAKxrAVvs6sXr03Q'; // Remplacez par l'ID de la chaîne YouTube
const subscriberCountElement = document.getElementById('subscriberCount');
let previousSubscriberCount = 0;

// Fonction pour récupérer le nombre d'abonnés
async function fetchSubscriberCount() {
    try {
        const response = await fetch(`https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`);
        if (!response.ok) throw new Error('Erreur lors de la récupération des données');

        const data = await response.json();
        const subscriberCount = parseInt(data.items[0].statistics.subscriberCount);

        if (subscriberCount > previousSubscriberCount) {
            triggerLasers();  // Active les lasers si nouvel abonné
            triggerParticles();  // Particules en même temps
            triggerFlash();  // Flash lumineux
        }

        previousSubscriberCount = subscriberCount;
        updateSubscriberCount(subscriberCount);
    } catch (error) {
        console.error('Erreur:', error);
        subscriberCountElement.innerText = 'Erreur';
    }
}

// Mise à jour de l'affichage
function updateSubscriberCount(count) {
    subscriberCountElement.innerText = count;
}

// Fonction pour créer les lasers
function triggerLasers() {
    const laserContainer = document.getElementById('laserContainer');
    for (let i = 0; i < 10; i++) {
        const laser = document.createElement('div');
        laser.classList.add('laser');
        laser.style.left = `${Math.random() * 100}vw`;  // Position aléatoire horizontale
        laser.style.background = `linear-gradient(to top, rgba(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()}, 0.8), transparent)`;

        laserContainer.appendChild(laser);

        setTimeout(() => laser.remove(), 1000);  // Supprime le laser après l'animation
    }
}

// Fonction pour créer des particules
function triggerParticles() {
    const particleContainer = document.getElementById('particleContainer');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.classList.add('particle');
        particle.style.left = `${Math.random() * 100}vw`;
        particle.style.top = `${Math.random() * 100}vh`;
        particle.style.backgroundColor = `rgba(${randomColorValue()}, ${randomColorValue()}, ${randomColorValue()}, 0.8)`;

        particleContainer.appendChild(particle);

        setTimeout(() => particle.remove(), 1000);  // Supprime la particule après l'animation
    }
}

// Fonction pour créer un flash lumineux
function triggerFlash() {
    const flash = document.createElement('div');
    flash.classList.add('flash');
    document.body.appendChild(flash);

    setTimeout(() => flash.remove(), 200);  // Supprime le flash après l'animation
}

// Génère une valeur de couleur aléatoire
function randomColorValue() {
    return Math.floor(Math.random() * 256);
}

// Actualise le compteur toutes les 10 secondes
setInterval(fetchSubscriberCount, 10000);

// Appel initial
fetchSubscriberCount();