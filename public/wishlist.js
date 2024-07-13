// Initialize the wishlist from localStorage if it doesn't exist
let wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
if (!wishlist.length) {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
}

function addWish(obj) {
    // Retrieve and update the wishlist in localStorage
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    // Filter out any existing item with the same idDrink
    wishlist = wishlist.filter(item => item.idDrink !== obj.idDrink);
    // Add the new item to the wishlist
    wishlist.push(obj);
    // Save the updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    // Optionally, update the in-memory wishlist
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    console.log(wishlist);
    return true;
}

function removeWish(id) {
    // Retrieve and update the wishlist in localStorage
    wishlist = JSON.parse(localStorage.getItem('wishlist'));
    // Filter out the item with the specified id
    wishlist = wishlist.filter(item => item.idDrink !== id);
    // Save the updated wishlist to localStorage
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    return true;
}

function getWishlist() {
    // Retrieve the wishlist from localStorage
    wishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    return wishlist;
}

async function fetchById(id) {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=';
    try {
        let response = await fetch(url + id);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        if (data.drinks) {
            return data.drinks[0];
        } else {
            console.log("No drinks found.");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}



async function createFavItem() {
    const image = document.querySelector('#modal-image');
    let id = image.alt;

    const item = await fetchById(id);
    console.log(item)
    addWish(item)
}
// Example usage
console.log(getWishlist()); // Should log the wishlist from localStorage
