

function renderGridFav(cocktails){
    const grid = document.querySelector('.grid-fav');
    while (grid.firstChild) {
            grid.removeChild(grid.firstChild);
        }
        cocktails.map(cocktail => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
        
            <img src="${cocktail.strDrinkThumb}" alt="${cocktail.idDrink}">
            <h3>${cocktail.strDrink}</h3>
        `;
        card.addEventListener('click', () => openModal(cocktail));
        grid.appendChild(card);
    });
}

document.addEventListener("DOMContentLoaded",()=>{
    console.log("loaded favs")
    let cocktails = getWishlist()
    renderGridFav(cocktails)
})
