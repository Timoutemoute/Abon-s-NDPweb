// Remplacez par votre clé API YouTube et l'ID de chaîne
const API_KEY = 'AIzaSyCByW5mZYsBROy0vWezfRPAJ_N0ksCJmwY'; // Remplacez par votre clé API
const CHANNEL_ID = 'UCx1zi13TAKxrAVvs6sXr03Q'; // Remplacez par votre ID de chaîne

// Éléments du DOM
const counterElement = document.getElementById('counter');
const messageElement = document.getElementById('message');
const container = document.querySelector('.container');

// Fonction pour récupérer le nombre d'abonnés
async function getSubscriberCount() {
    try {
        // Faire une requête à l'API YouTube
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${CHANNEL_ID}&key=${API_KEY}`
        );

        // Vérifier si la réponse est valide
        if (!response.ok) {
            throw new Error(`Erreur HTTP : ${response.status}`);
        }

        // Convertir la réponse en JSON
        const data = await response.json();

        // Vérifier si les données sont valides
        if (!data.items || data.items.length === 0) {
            throw new Error('Aucune donnée trouvée pour cette chaîne.');
        }

        // Extraire le nombre d'abonnés
        const subscribers = data.items[0].statistics.subscriberCount;
        counterElement.textContent = subscribers;

        // Appliquer des animations en fonction du nombre d'abonnés
        applyAnimations(subscribers);

        // Animation spéciale à 500 abonnés
        if (subscribers === "500") {
            celebrate500Subscribers();
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des abonnés :', error);
        counterElement.textContent = 'Erreur';
        messageElement.textContent = 'Impossible de charger les abonnés.';
        messageElement.classList.add('show-message');
    }
}

// Fonction pour appliquer des animations en fonction du nombre d'abonnés
function applyAnimations(subscribers) {
    // Animation de base à chaque mise à jour
    counterElement.classList.add('bounce');
    setTimeout(() => {
        counterElement.classList.remove('bounce');
    }, 500);

    // Effet de lueur (glow) à chaque mise à jour
    counterElement.classList.add('glow');
    setTimeout(() => {
        counterElement.classList.remove('glow');
    }, 1000);

    // Effet de flottement (float) à chaque mise à jour
    counterElement.classList.add('float');
    setTimeout(() => {
        counterElement.classList.remove('float');
    }, 2000);

    // Ajouter des confettis à chaque nouvel abonné
    createConfetti();
}

// Fonction pour célébrer 500 abonnés
function celebrate500Subscribers() {
    // Message de félicitations
    messageElement.textContent = "Félicitations pour les 500 abonnés ! 🎉";
    messageElement.classList.add('show-message');

    // Ajouter des confettis
    for (let i = 0; i < 50; i++) {
        createConfetti();
    }

    // Ajouter des feux d'artifice
    createFireworks();

    // Animation spéciale du compteur
    counterElement.classList.add('pulse', 'color-change');
}

// Fonction pour créer des confettis
function createConfetti() {
    const confetti = document.createElement('div');
    confetti.classList.add('confetti');
    confetti.style.left = `${Math.random() * 100}%`;
    confetti.style.animationDuration = `${Math.random() * 2 + 1}s`;
    container.appendChild(confetti);
    setTimeout(() => confetti.remove(), 2000);
}

// Fonction pour créer des feux d'artifice
function createFireworks() {
    const fireworks = document.createElement('div');
    fireworks.classList.add('fireworks');
    fireworks.style.left = `${Math.random() * 100}%`;
    fireworks.style.top = `${Math.random() * 100}%`;
    container.appendChild(fireworks);
    setTimeout(() => fireworks.remove(), 1000);
}

// Mettre à jour le compteur toutes les 10 secondes
setInterval(getSubscriberCount, 10000);

// Charger le compteur au démarrage
getSubscriberCount();