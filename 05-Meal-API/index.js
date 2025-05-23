// async function lessThanCero(){
//    return new Promise ((resolve, reject)  => {
//     const i = 10
//     if (i < 1) {
//         resolve("less than 0")
//     } else{
//         reject("more than 0")
//     }
// })
// }

// lessThanCero().then( value => console.log(value))
//     .catch(err => console.error(err))







const search = document.getElementById("search")
const submit = document.getElementById("submit")
const randomBtn = document.getElementById("random")

// for the meals
const resultHeading = document.getElementById("meal-result-heading")
const mealsEl = document.getElementById("meals")
const singleMeal = document.getElementById("single-meal-container") // different keyName


//function to fetch API data
submit.addEventListener("submit", (e) => {
    e.preventDefault()
    const items = search.value
    if(items.trim()){

        // fetching data from API
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${items}`)
    .then((resp) => resp.json() )
    .then(data => {

        console.log(data)

        // resultHeading.innerHTML = `Search Result for ${items}`

        if(data.meals == null){
            resultHeading.innerHTML = `Not Result for "${items}"`
        } else{
            resultHeading.innerHTML = `Search Result for ${items}`
            mealsEl.innerHTML = data.meals.map(
            (meal) => `<div class="meal"> 
            <img src="${meal.strMealThumb}" alt="${meal.strMeal}"> 
            
            <div class="meal-info" data-mealId="${meal.idMeal}">
            <h3>${meal.strMeal}</h3>
                </div>
            </div>` 
            )
            .join("")
        }
    })
    
    // Clear Input Field
    search.value = ""

    } else{
        // alert("Enter some item")
        resultHeading.textContent = "Insert Some Item"
    }

})

// Function to get meal ID
function getSingleItemId(mealId){
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
    .then(resp => resp.json())
    .then(data => {
        const meal = data.meals[0]
        addMealToDOM(meal)
    })
}


// RANDOM MEAL
randomBtn.addEventListener("click", getRandomMeal)

function getRandomMeal(){
    //clean
    mealsEl.innerHTML = ""
    resultHeading.innerHTML = ""
    
    fetch(`https://www.themealdb.com/api/json/v1/1/random.php`)
    .then((resp) => resp.json())
    .then((data) =>{
        const meal = data.meals[0]
        addMealToDOM(meal)
    })
}


function formatInstructions(instructions) {
  // 1. Dividir las instrucciones en oraciones usando el punto
  let steps = instructions.split('.')
    .map(step => step.trim()) // Eliminar espacios en blanco
    .filter(step => step.length > 0); // Eliminar cadenas vacías

  // 2. Si no hay puntos, devolver las instrucciones tal cual
  if (steps.length === 0) {
    return `<p>${instructions}</p>`;
  }

  // 3. Crear una lista numerada de pasos
  return `
    <ul class="instructions-list">
      ${steps.map(step => `<li>${step}.</li>`).join('')}
    </ul>
  `;
}



// function to ADD meal to DOM
function addMealToDOM(meal) {
    const ingredients = []
    for(let i = 1; i <= 20; i++ ){
        if(meal[`strIngredient${i}`]) {
            ingredients.push(`${meal[`strIngredient${i}`]}  -  ${meal[`strMeasure${i}`]}`) 
        } else{
            break
        }
    }
    // console.log(ingredients)
    singleMeal.innerHTML = `
    <div class="single-meal">
        <h1>${meal.strMeal}</h1>
            <div class="single-meal-info">
                ${meal.strCategory ? `<p> ${meal.strCategory} </p>` : "" }
                ${meal.strArea ? `<p> ${meal.strArea} </p>` : "" }
            </div>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
                <div class="main">
                    <h2>Ingredients</h2>
                    <ul> ${ingredients.map((ing) => `<li> ${ing} </li>`).join("") } </ul>
                    <h2> Instructions </h2>
                    ${formatInstructions(meal.strInstructions)}
                </div>
    </div>
    `
}



// Single meal click

mealsEl.addEventListener("click", (object) => {
    const mealInfo = object.composedPath().find((single_item) => {

        if(single_item.classList) {
            return single_item.classList.contains("meal-info")
        } else{
            return false
        }
    })
    // console.log(mealInfo)
    if(mealInfo){
        const mealId = mealInfo.getAttribute("data-mealId")
        // console.log(mealId)
        getSingleItemId(mealId)
    }
})