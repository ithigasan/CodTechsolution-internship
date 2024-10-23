// Add your Edamam API credentials here
const appId = 'YOUR_APP_ID'; // Replace with your Edamam APP ID
const apiKey = 'YOUR_API_KEY'; // Replace with your Edamam API Key

const searchButton = document.getElementById('search-button');
const searchInput = document.getElementById('search-input');
const recipeResults = document.getElementById('recipe-results');

// Event listener for the search button
searchButton.addEventListener('click', () => {
    const query = searchInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// Fetch recipes from Edamam API
async function fetchRecipes(query) {
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&to=12`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.hits.length > 0) {
            displayRecipes(data.hits);
        } else {
            recipeResults.innerHTML = '<p>No recipes found. Try a different search.</p>';
        }
    } catch (error) {
        recipeResults.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}

// Display recipes on the page
function displayRecipes(recipes) {
    recipeResults.innerHTML = ''; // Clear previous results

    recipes.forEach(recipeObj => {
        const recipe = recipeObj.recipe;

        const recipeCard = document.createElement('div');
        recipeCard.classList.add('recipe-card');

        recipeCard.innerHTML = `
            <img src="${recipe.image}" alt="${recipe.label}">
            <h3>${recipe.label}</h3>
            <ul>
                ${recipe.ingredientLines.map(ingredient => `<li>${ingredient}</li>`).join('')}
            </ul>
            <a href="${recipe.url}" target="_blank">View Full Recipe</a>
        `;

        recipeResults.appendChild(recipeCard);
    });
}
