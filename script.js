const searchBtn = document.getElementById('searchbox-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//Event Listeners

//Event Listener to get a list of meals once the search button is clicked 
searchBtn.addEventListener('click', getMealList);

//Event Listener to display the modal of the recipe and its instructions once the button on any displayed meal is clicked on
mealList.addEventListener('click', getMealRecipe);

//Event Listener to close the modal of the recipe and its instructions
recipeCloseBtn.addEventListener('click', () => {
    mealDetailsContent.parentElement.classList.remove('showRecipe');
})

//Get meal list that matches the searched ingredients
function getMealList(){
    let searchInputText = document.getElementById('searchbox-input').value.trim();
    // console.log(searchInputText.length);
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${searchInputText}`)
    .then(response => response.json())
    .then(data => {
        // console.log(data);
        let html = "";
        if(data.meals){
            data.meals.forEach(meal => {
                html += `
                <div class="meal-item" data-id="${meal.idMeal}">
                    <div class="meal-image">
                        <img src="${meal.strMealThumb}" alt="Fries">
                    </div>
                    <div class="meal-name">
                        <h3>${meal.strMeal}</h3>
                        <a href="#" class="recipe-btn btn">
                            Get Recipe
                        </a>
                    </div>
                </div>
                `;
            }); 
            mealList.classList.remove('notFound');
        }
        else{
            html="Sorry, we could not find any meal with that ingredient name! &#128531"
            mealList.classList.add('notFound');
        }

        mealList.innerHTML = html;
    });
}

//Get the recipe of any of the displayed meals
function getMealRecipe(e){
    e.preventDefault();
    if(e.target.classList.contains('recipe-btn')){
        //declaration that targets the first parent element which is "meal-item"
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem);

        //API call used to fetch the data-id of the meals from the html class "meal-item"
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        //The data from the API is passed into mealRecipeModal and the parameter data.meals passed into it which contains all the listings of the meals in the API
        .then(data => mealRecipeModal(data.meals))
    }
}

//Create a modal for the recipe of the meals
function mealRecipeModal(meal){
    // console.log(meal);
    meal = meal[0];
    let html = 
    `
        <h2 class="recipe-title">
            ${meal.strMeal}
        </h2>
        <p class="recipe-category">
            ${meal.strCategory}
        </p>
        <div class="recipe-instructions">
            <h3>
                Instructions:
            </h3>
            <p>
                ${meal.strInstructions}
            </p>
        </div>
        <div class="recipe-image">
            <img src="${meal.strMealThumb}" alt="Fries">
        </div>
        <div class="recipe-link">
            <a href="${meal.strYoutube}" target="_blank"> Watch Video </a>
        </div>
    `;

    mealDetailsContent.innerHTML = html;
    mealDetailsContent.parentElement.classList.add('showRecipe');
}