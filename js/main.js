
let showData = document.getElementById("show-data");
let links = document.querySelectorAll(".nav-link");
let modelBody = document.querySelector(".modal-body");

let result = [];



async function getRecipes(recipe) {
  let response = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${recipe}`);
  result = (await response.json()).recipes;
  displayData();
}
getRecipes("pizza");

function displayData() {
  let box = "";
  result.forEach(ele => {
    box += `
            <div class="col-lg-4 col-md-6">
              <img src="${ele.image_url}" alt="recipes" class="w-100" />
              <p class="fs-5">${ele.title}</p>
              <a href="${ele.source_url}" target="_blank" class="btn btn-info mb-3">source</a>
              <a onclick="getRecipeDetails (${ele.recipe_id})" class="btn btn-warning mb-3" data-bs-toggle="modal" data-bs-target="#exampleModal">details</a>
            </div>
        `;
  });

  showData.innerHTML = box;
}


// Get Recipes By Links
links.forEach((ele) => {

  ele.addEventListener("click", () => {
    let currentRecipe = ele.innerHTML;
    getRecipes(currentRecipe);

    links.forEach((ele) => {
      ele.classList.remove("active");
    });

    ele.classList.add("active");
  });
});


// Get Recipes Details 

async function getRecipeDetails(recipeId) {
  let response = await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${recipeId}`);
  let result = await response.json();

  let showDetails = `
    <img src="${result.recipe.image_url}" alt="recipes details" class="img-fluid" />
    <p class="mt-4" >${result.recipe.publisher}</p>
  `;
  modelBody.innerHTML = showDetails;

}

