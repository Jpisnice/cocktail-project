//             "idDrink": "17187",
//             "strDrink": "Derby",
//             "strDrinkAlternate": null,
//             "strTags": "Classic,IBA",
//             "strVideo": "https://www.youtube.com/watch?v=bYQTTokGkFI",
//             "strCategory": "Ordinary Drink",
//             "strIBA": "Unforgettables",
//             "strAlcoholic": "Alcoholic",
//             "strGlass": "Cocktail glass",
//             "strInstructions": "Pour all ingredients into a mixing glass with ice. Stir. Strain into a cocktail glass. Garnish with a sprig of fresh mint in the drink.",
//             "strInstructionsES": null,
//             "strInstructionsDE": "Alle Zutaten in ein Mischglas mit Eis geben. Rühren. In ein Cocktailglas abseihen. Mit einem Zweig frischer Minze im Getränk garnieren.",
//             "strInstructionsFR": null,
//             "strInstructionsIT": "Versare tutti gli ingredienti in un mixing glass con ghiaccio. Filtrare in un bicchiere da cocktail. Agitare. Guarnire con un rametto di menta fresca nella bevanda.",
//             "strInstructionsZH-HANS": null,
//             "strInstructionsZH-HANT": null,
//             "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/52weey1606772672.jpg",
//             "strIngredient1": "gin",

const url = "https://www.thecocktaildb.com/api/json/v1/1/search.php?f=";
let cocktails=[];



const getData = async (char) => {
    try {
        let response = await fetch(url + char);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        let data = await response.json();

        if (data.drinks) {
            const res=data.drinks
            return res;
        } else {
            console.log("No drinks found.");
        }
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

function toggleHeart(button) {
            button.classList.toggle('filled');
        }

async function fetchData(char) {
    try {
        cocktails = await getData(char);
        return cocktails
    } catch (error) {
        console.error('Error:', error);
    }
}

function renderGrid(cocktails){
    const grid = document.querySelector('.grid');
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



document.addEventListener('DOMContentLoaded', async () => {
    document.getElementById('sb').addEventListener('click',async function() {
            const inputField = document.getElementById('search');
            const inputText = inputField.value;
            cocktails= await fetchData(inputText)
            console.log(cocktails)
            renderGrid(cocktails)
        });

    cocktails= await fetchData('a')
    renderGrid(cocktails)

    
});

const modal = document.getElementById("modal");
const modalTitle = document.getElementById("modal-title");
const modalImage = document.getElementById("modal-image");
const modalIngredients = document.getElementById("modal-ingredients");
const modalInstructions = document.getElementById("modal-instructions");

function openModal(cocktail) {
    //checking if item in wishlist
    let ary = []
    ary = wishlist.filter(item=> item.idDrink==cocktail.idDrink)||[]
    const heart = document.getElementsByClassName("heart")[0];

    if(ary.length)
    {
        
        if(!heart.classList.contains('filled'))
        {
            heart.classList.add('filled')
        }

    }
    else
    {
        heart.classList.remove('filled')
    }

    modalTitle.textContent = cocktail.strDrink;
    modalImage.src = cocktail.strDrinkThumb;
    modalImage.alt = cocktail.idDrink;
    modalInstructions.textContent = cocktail.strInstructions;
    
    modalIngredients.innerHTML = '';
    for (let i = 1; i <= 15; i++) {
        if (cocktail[`strIngredient${i}`]) {
            const li = document.createElement('li');
            li.textContent = `${cocktail[`strMeasure${i}`] || ''} ${cocktail[`strIngredient${i}`]}`;
            modalIngredients.appendChild(li);
        }
    }

    modal.style.display = "block";
}

const span = document.getElementsByClassName("close")[0];
const heart = document.getElementsByClassName("heart")[0];
span.onclick = function() {
    modal.style.display = "none";
    renderGridFav(getWishlist());
}

heart.onclick = function(){

    if(this.classList.contains("filled"))
    {
        //remove from favs
        this.classList.remove("filled")
        const id = modalImage.alt;
        removeWish(id);
        console.log(wishlist)
    }
    else{
        
        //add to favs
        this.classList.add("filled")
        createFavItem();
    }
    
    
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
        renderGridFav(getWishlist());
    }
}








