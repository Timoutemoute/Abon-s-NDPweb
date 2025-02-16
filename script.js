// Remplacez par votre clé API YouTube et l'ID de chaîne
const API_KEY = 'AIzaSyCByW5mZYsBROy0vWezfRPAJ_N0ksCJmwY'; // Remplacez par votre clé API
const CHANNEL_ID = 'UCx1zi13TAKxrAVvs6sXr03Q'; // Remplacez par votre ID de chaîne

// Éléments du DOM
const counterElement = document.getElementById('counter');
const messageElement = document.getElementById('message');

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

        // Animation à chaque mise à jour
        counterElement.classList.add('bounce');
        setTimeout(() => {
            counterElement.classList.remove('bounce');
        }, 500);

        // Animation spéciale à 500 abonnés
        if (subscribers === "500") {
            counterElement.classList.add('pulse', 'color-change');
            messageElement.textContent = "Félicitations pour les 500 abonnés ! 🎉";
            messageElement.classList.add('show-message');

            // Confetti
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            document.querySelector('.counter-wrapper').appendChild(confetti);
            setTimeout(() => confetti.remove(), 2000);

            // Fireworks
            const fireworks = document.createElement('div');
            fireworks.classList.add('fireworks');
            document.querySelector('.counter-wrapper').appendChild(fireworks);
            setTimeout(() => fireworks.remove(), 1000);
        }
    } catch (error) {
        console.error('Erreur lors de la récupération des abonnés :', error);
        counterElement.textContent = 'Erreur';
        messageElement.textContent = 'Impossible de charger les abonnés.';
        messageElement.classList.add('show-message');
    }
}

// Mettre à jour le compteur toutes les 10 secondes
setInterval(getSubscriberCount, 10000);

// Charger le compteur au démarrage
getSubscriberCount();