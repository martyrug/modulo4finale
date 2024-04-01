const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";

/* WARNING: QUI E' UN' OPERAZIONE PERICOLOSA PERCHE' E' UNA CHIAVE DI AUTENTICAZIONE, NON VA MESSA IN UN FILE JAVASCRIPT, MA AL LIMITE IN UN FILE .ENV CHE NON VIENE VISUALIZZATO NEL BROWSER */
/* GROSSA RED FLAG, QUI E NEL FUTURO, NON PUSHARE MAI SU GIT UNA CHIAVE, IN QUESTO CASO IL PERICOLO E' RELATIVO, MA SE FOSSE UN SITO VERO......... */
const KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAzNTE5NmU2MDQ3YjAwMTlmYTYwMmUiLCJpYXQiOjE3MTE0OTM1MjYsImV4cCI6MTcxMjcwMzEyNn0.PkvVrsJDf1OqXYkQ83iPwW2Bt-5BYuQO6_7uyXrKMkM";

// Funzione per ottenere i dettagli del prodotto in base all'ID presente nei parametri dell'URL
const getProductDetails = async () => {
    // Ottiene i parametri dell'URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
    try {
        // Invia una richiesta GET al backend per ottenere i dettagli del prodotto
        const response = await fetch(`${ENDPOINT}/${productId}`, {
            headers: {
                "Authorization": KEY
            }
        });
        // Verifica se la risposta è ok
        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        // Converte la risposta in formato JSON e mostra i dettagli del prodotto
        const productDetails = await response.json();
        displayProductDetails(productDetails);
    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Funzione per visualizzare i dettagli del prodotto nell'HTML
const displayProductDetails = (product) => {
    // Ottiene il container degli elementi dei dettagli del prodotto
    const productDetailsContainer = document.getElementById("productDetailsContainer");
    // Crea un nuovo elemento div per contenere i dettagli del prodotto
    const productDetailsCard = document.createElement("div");
    productDetailsCard.setAttribute("class", "col-12 col-md-6 offset-md-3 card");
    // Inserisce i dettagli del prodotto nell'elemento div creato
    productDetailsCard.innerHTML = `
        <div class="card-body">
            <h5 class="card-title">${product.name}</h5>
            <p class="card-text">${product.description}</p>
            <p class="card-text">Brand: ${product.brand}</p>
            <p class="card-text">Price: $${product.price}</p>
            <img src="${product.imageUrl}" class="card-img-top" alt="${product.name}">
        </div>
    `;
    // Aggiunge l'elemento div con i dettagli del prodotto al container
    productDetailsContainer.appendChild(productDetailsCard);
};

// Chiama la funzione per ottenere e visualizzare i dettagli del prodotto quando la pagina viene caricata
getProductDetails();