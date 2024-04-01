const ENDPOINT = "https://striveschool-api.herokuapp.com/api/product/";

/* WARNING: QUI E' UN' OPERAZIONE PERICOLOSA PERCHE' E' UNA CHIAVE DI AUTENTICAZIONE, NON VA MESSA IN UN FILE JAVASCRIPT, MA AL LIMITE IN UN FILE .ENV CHE NON VIENE VISUALIZZATO NEL BROWSER */
/* GROSSA RED FLAG, QUI E NEL FUTURO, NON PUSHARE MAI SU GIT UNA CHIAVE, IN QUESTO CASO IL PERICOLO E' RELATIVO, MA SE FOSSE UN SITO VERO......... */
const KEY = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjAzNTE5NmU2MDQ3YjAwMTlmYTYwMmUiLCJpYXQiOjE3MTE0OTM1MjYsImV4cCI6MTcxMjcwMzEyNn0.PkvVrsJDf1OqXYkQ83iPwW2Bt-5BYuQO6_7uyXrKMkM";


// Selezione del bottone per aggiungere un nuovo prodotto
const addBtn = document.querySelector("#add-product-btn");

// Funzione per ottenere i valori del form per l'aggiunta di un nuovo prodotto
const getFormValues = () => {
    const form = document.getElementById("add-product-form");
    const formData = new FormData(form);
    const values = {};

    formData.forEach((value, key) => {
        values[key] = value;
    });

    return values;
};

// Aggiunta di un ascoltatore di eventi per l'invio del form per l'aggiunta di un nuovo prodotto
addBtn.addEventListener("click", async (event) => {
    event.preventDefault(); // Evita il comportamento predefinito del submit del form
    const productData = getFormValues();
    
    try {
        // Invia una richiesta POST per aggiungere il nuovo prodotto
        const response = await fetch(ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': KEY
            },
            body: JSON.stringify(productData)
        });

        if (!response.ok) {
            throw new Error('Failed to add product');
        }

        // Pulisce il form dopo l'invio dei dati
        document.getElementById("add-product-form").reset();
        
        // Aggiorna la lista dei prodotti dopo l'aggiunta
        await loadProducts(); // Attendiamo il completamento del caricamento prima di procedere
        
        console.log('Product added successfully');
    } catch (error) {
        console.error('Error adding product:', error);
    }
});

// Funzione per caricare la lista dei prodotti dal backend
const loadProducts = async () => {
    const response = await fetch(ENDPOINT, {
        headers: {
            "Authorization": KEY
        }
    });
    const products = await response.json();
    const tableBody = document.getElementById("productTableBody");

    tableBody.innerHTML = ""; // Pulisce la tabella prima di aggiungere i nuovi prodotti

    // Itera sui prodotti e aggiunge una riga per ciascuno nella tabella
    products.forEach(product => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.description}</td>
            <td>${product.brand}</td>
            <td>${product.price}</td>
            <td><img src="${product.imageUrl}" alt="${product.name}" style="width: 50px; height: 50px;"></td>
            <td>
                <button class="btn btn-danger btn-sm" onclick="deleteProduct('${product._id}')">Delete</button>
                <button class="btn btn-primary btn-sm" onclick="editProduct('${product._id}')">Edit</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
};

// Funzione per eliminare un prodotto
const deleteProduct = async (productId) => {
    try {
        await fetch(`${ENDPOINT}/${productId}`, {
            method: "DELETE",
            headers: {
                "Authorization": KEY
            }
        });
        // Ricarica i prodotti dopo l'eliminazione
        loadProducts();
    } catch (error) {
        console.error("Error deleting product:", error);
    }
};

// Funzione per modificare un prodotto
const editProduct = async (productId) => {
    try {
        // Ottiene i dettagli del prodotto tramite una richiesta GET al backend
        const response = await fetch(`${ENDPOINT}/${productId}`, {
            headers: {
                "Authorization": KEY
            }
        });

        if (!response.ok) {
            throw new Error('Failed to fetch product details');
        }
        
        const productDetails = await response.json();
        
        // Popola il modulo di modifica con i dettagli del prodotto
        const editForm = document.getElementById("edit-product-form");
        editForm.querySelector("[name='edit-name']").value = productDetails.name;
        editForm.querySelector("[name='edit-description']").value = productDetails.description;
        editForm.querySelector("[name='edit-brand']").value = productDetails.brand;
        editForm.querySelector("[name='edit-price']").value = productDetails.price;
        editForm.querySelector("[name='edit-imageUrl']").value = productDetails.imageUrl;

        // Visualizza il modulo di modifica e nasconde il modulo di aggiunta
        editForm.style.display = "block";
        document.getElementById("add-product-form").style.display = "none";

        // Aggiungi un ascoltatore di eventi per l'invio del modulo di modifica
        editForm.addEventListener("submit", async (event) => {
            event.preventDefault();
            
            const updatedProductData = {
                name: editForm.querySelector("[name='edit-name']").value,
                description: editForm.querySelector("[name='edit-description']").value,
                brand: editForm.querySelector("[name='edit-brand']").value,
                price: editForm.querySelector("[name='edit-price']").value,
                imageUrl: editForm.querySelector("[name='edit-imageUrl']").value
            };

            try {
                // Invia una richiesta PUT per aggiornare i dettagli del prodotto
                const updateResponse = await fetch(`${ENDPOINT}/${productId}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': KEY
                    },
                    body: JSON.stringify(updatedProductData)
                });

                if (!updateResponse.ok) {
                    throw new Error('Failed to update product');
                }

                // Pulisce il modulo di modifica dopo l'invio dei dati
                editForm.reset();
                
                // Aggiorna la lista dei prodotti
                loadProducts();
                
                console.log('Product updated successfully');
            } catch (error) {
                console.error('Error updating product:', error);
            }
        });

    } catch (error) {
        console.error('Error fetching product details:', error);
    }
};

// Carica i prodotti quando la pagina viene caricata
window.onload = loadProducts;