const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";

/* WARNING: QUI E' UN' OPERAZIONE PERICOLOSA PERCHE' E' UNA CHIAVE DI AUTENTICAZIONE, NON VA MESSA IN UN FILE JAVASCRIPT, MA AL LIMITE IN UN FILE .ENV CHE NON VIENE VISUALIZZATO NEL BROWSER */
/* GROSSA RED FLAG, QUI E NEL FUTURO, NON PUSHARE MAI SU GIT UNA CHIAVE, IN QUESTO CASO IL PERICOLO E' RELATIVO, MA SE FOSSE UN SITO VERO......... */
const KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAzNTE5NmU2MDQ3YjAwMTlmYTYwMmUiLCJpYXQiOjE3MTE0OTM1MjYsImV4cCI6MTcxMjcwMzEyNn0.PkvVrsJDf1OqXYkQ83iPwW2Bt-5BYuQO6_7uyXrKMkM";


// Selezione del container delle carte dei prodotti
const cardContainer = document.getElementById("cardContainer");

// Funzione per gestire le richieste API in modo astratto
const abstractFetch = async (url, options = {}) => {
    // Definizione dei valori predefiniti per il metodo e gli headers
    const defaultHeaders = {
        "Authorization": KEY,
        "Content-Type": "application/json",
    }
    // Creazione delle opzioni di richiesta combinando i valori predefiniti con quelli forniti
    const requestOptions = {
        method: options.method || "GET", // Se non è specificato un metodo, di default usa GET
        headers: {...defaultHeaders, ...options.headers}, // Combina i valori predefiniti con quelli forniti
        ...options // Include eventuali altre opzioni fornite
    }
    // Se è presente un corpo dati, lo converte in formato JSON
    if (options.body) {
        options.body = JSON.stringify(options.body);
    }
    try {
        // Effettua la richiesta al backend
        const response = await fetch(url, requestOptions);
        // Se la risposta non è ok, genera un errore
        if (!response.ok) {
            throw new Error (`${options.method} Response from fetch not ok`);
        }
        // Restituisce i dati della risposta come oggetto JSON
        return await response.json();
    } catch (error) {
        // Gestisce gli errori e li mostra nella console
        console.log(error);
        throw (error);
    }
}

// Funzione per creare una carta di prodotto e aggiungerla al container delle carte
const createCard = (product) => {
    // Creazione del wrapper della carta
    const cardWrapper = document.createElement("div");
    cardWrapper.setAttribute("class", "col-12 col-md-4 col-lg-3 card");
    
    // Creazione del link per reindirizzare alla pagina del prodotto
    const productLink = document.createElement("a");
    productLink.setAttribute("href", `product.html?id=${product._id}`);
    productLink.setAttribute("class", "card-link");

    // Creazione dell'immagine del prodotto
    const img = document.createElement("img");
    img.setAttribute("class", "card-img-top");
    img.setAttribute("src", product.imageUrl);

    // Creazione del corpo della carta
    const cardBody = document.createElement("div");
    cardBody.setAttribute("class", "card-body");

    // Creazione del titolo del prodotto
    const cardTitle = document.createElement("h5");
    cardTitle.setAttribute("class", "card-title");
    cardTitle.textContent = product.name;

    // Creazione della descrizione del prodotto
    const cardDescription = document.createElement("p");
    cardDescription.setAttribute("class", "card-text");
    cardDescription.textContent = product.description;

    // Creazione del prezzo del prodotto
    const cardPrice = document.createElement("p");
    cardPrice.setAttribute("class", "card-text");
    cardPrice.textContent = `Price: $${product.price}`;

    // Aggiunta degli elementi al corpo della carta e del link
    cardBody.append(cardTitle, cardDescription, cardPrice);
    productLink.append(img, cardBody);
    cardWrapper.appendChild(productLink);
    // Aggiunta della carta al container delle carte
    cardContainer.appendChild(cardWrapper);
}

// Richiede i dati dei prodotti dal backend e crea le carte corrispondenti
abstractFetch(ENDPOINT, {}).then(res => res.map(product => createCard(product))); // Effettua una richiesta GET al backend e crea le carte dei prodotti



/* SINCERAMENTE QUESTO CODICE NON L'HO NEMMENO GUARDATO, NON HO IDEA DI COSA FACCIA, MA COMUNQUE NON SERVE, PUOI CANCELLARE DA QUI IN POI, L'HO RISCRITTO SU BACKOFFICE.JS */

/* POST */
/*
abstractFetch(ENDPOINT, {method: "POST", body: newProduct}).then(res => console.log(res)); 

const getProduct = async (headers, method, body) => {
    try {
        const response = await fetch(ENDPOINT, HEADERS)
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error ("[GET] Response from fetch not ok");
        }
    } catch (error) {
        console.log(error);
    }
}
getProduct().then(body => console.log(body))

const postProduct = async () => {
    try {
        const response = await fetch(ENDPOINT, {
            method: "POST",
            headers: {
                "Authorization": KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error ("[POST] Response from fetch not ok");
        }
    } catch (error) {
        console.log(error);
    }
}
postProduct().then(body => console.log(body)) 

const putProduct = async (id) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: "PUT",
            headers: {
                "Authorization": KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error ("[PUT] Response from fetch not ok");
        }
    } catch (error) {
        console.log(error);
    }
}
putProduct().then(body => console.log(body)) 

const deleteProduct = async (id) => {
    try {
        const response = await fetch(ENDPOINT, {
            method: "DELETE",
            headers: {
                "Authorization": KEY,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newProduct)
        })
        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            throw new Error ("[DELETE] Response from fetch not ok");
        }
    } catch (error) {
        console.log(error);
    }
}
deleteProduct().then(body => console.log(body)) 
*/