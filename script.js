const searchBtn = document.getElementById('searchbox-btn');
const mealList = document.getElementById('meal');
const mealDetailsContent = document.querySelector('.meal-details-content');
const recipeCloseBtn = document.getElementById('recipe-close-btn');

//Event Listeners
searchBtn.addEventListener('click', getMealList);
mealList.addEventListener('click', getMealRecipe);

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
        let mealItem = e.target.parentElement.parentElement;
        // console.log(mealItem);
        fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`)
        .then(response => response.json())
        .then(data => mealRecipeModal(data.meals))
    }
}

