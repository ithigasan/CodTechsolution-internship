const apiKey = 'YOUR_API_KEY';  // Replace with your Edamam Recipe API key
const appId = 'YOUR_APP_ID';    // Replace with your Edamam Recipe API ID
const searchBtn = document.getElementById('search-btn');
const recipeInput = document.getElementById('recipe-input');
const recipeResults = document.getElementById('recipe-results');

// Search button event listener
searchBtn.addEventListener('click', () => {
    const query = recipeInput.value.trim();
    if (query) {
        fetchRecipes(query);
    }
});

// Fetch recipes from the Edamam Recipe API
async function fetchRecipes(query) {
    const apiUrl = `https://api.edamam.com/search?q=${query}&app_id=${appId}&app_key=${apiKey}&to=12`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.hits.length > 0) {
            displayRecipes(data.hits);
        } else {
            recipeResults.innerHTML = '<p>No recipes found. Try another search.</p>';
        }
    } catch (error) {
        recipeResults.innerHTML = '<p>Error fetching recipes. Please try again later.</p>';
    }
}

// Display fetched recipes on the page
function displayRecipes(recipes) {
    recipeResults.innerHTML = '';  // Clear previous results

    recipes.forEach(hit => {
        const recipe = hit.recipe;

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
