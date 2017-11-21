function getRecipes() {

    let ingredientName = document.getElementById('ingredient').value
    if(ingredientName === '') {
        return alert('Please enter an ingredient')
    }

    let ingredientDiv = document.getElementById('ingredientRecipe')
    ingredientDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
			ingredientDiv.innerHTML = ingredientDiv.innerHTML + `
			<h1>${response.count} recipes for ${ingredientName} </h1>
			`
			for (var i = 0; i < response.count; i++){
				ingredientDiv.innerHTML = ingredientDiv.innerHTML + `
				<li>${response.recipes[i].title}</li>
				<a href="${response.recipes[i].f2f_url}" target="_blank"> <img src="${response.recipes[i].image_url}" style="width:500px;height:500px;"> </a>
				`
			}
        }
    }
    xhr.open('GET', `/recipes?ingredient=${ingredientName}`, true)
    xhr.send()
}

/*
//Attach Enter-key Handler
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
*/
