// API using from EDAMAM.com - Food Recipe Search API

const searchForm = document.querySelector("form");
const searchResultDiv = document.querySelector(".search-result");
const container = document.querySelector(".container");
let searchQuery = "";

const APP_ID = "f5b37755";
const APP_KEY = "bd6c8b084e2720ac5f55864a053fd66e";

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.querySelector("input").value;

  searchResultDiv.style.animation = "none";
  fetchAPI(searchQuery);
});

const fetchAPI = async (query) => {
  // &to=20 - means search results upto 20 items
  const baseURL = `https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}&to=20`;
  const response = await fetch(baseURL);
  const result = await response.json();

  // Hits - Name of list of Recipe Items from JSON Object
  generateHTML(result.hits);
};

const generateHTML = (results) => {
  container.classList.remove("initial");

  let generatedHTML = "";
  let imageUrl;
  let title;
  let recipeUrl;
  let calories;
  let dietLabel;
  let healthLabel;

  results.map((result) => {
    imageUrl = result.recipe.image;
    title = result.recipe.label;
    recipeUrl = result.recipe.url;
    calories = result.recipe.calories.toFixed(2);
    dietLabel =
      result.recipe.dietLabels.length > 0
        ? result.recipe.dietLabels
        : "No Data Found";
    healthLabel = result.recipe.healthLabels.slice(0, 5);
    healthLabelElements = "";

    healthLabel.forEach((label) => {
      healthLabelElements += `
            <li>${label}</li>
            `;
    });

    generatedHTML += `
        <div class="item">
            <img src="${imageUrl}" alt="" />
            <div class="flex-container">
              <h1 class="title">${title}</h1>
              <a class="view-button" target="_blank" href="${recipeUrl}">View Recipe</a>
            </div>
            <p class="item-data">Calories: ${calories}</p>
            <p class="item-data">Diet Label: ${dietLabel}</p>
            <ul class="item-data">Health Label: 
                ${healthLabelElements}
            </ul>
        </div>

        `;
  });
  searchResultDiv.style.opacity = "1";
  searchResultDiv.style.animation = "opening 1s ease";
  searchResultDiv.innerHTML = generatedHTML;
};
