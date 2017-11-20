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
				`
			}
        }
    }
    xhr.open('GET', `/recipes?ingredient=${ingredientName}`, true)
    xhr.send()
}


function getWeather() {

    let cityName = document.getElementById('city').value
    if(cityName === '') {
        return alert('Please enter a city')
    }

    let cityDiv = document.getElementById('cityweather')
    cityDiv.innerHTML = ''

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
 			cityDiv.innerHTML = cityDiv.innerHTML + `
			<h1>Weather for ${response.name} </h1>
			<ul>
			<li>Location: LON:${response.coord.lon}, LAT:${response.coord.lat}</li>
			<li>Main: ${response.weather[0].main}</li>
			<li>Desc: ${response.weather[0].description}</li>
			</ul>
			`
        }
    }
    xhr.open('GET', `/weather?city=${cityName}`, true)
    xhr.send()
}

//Attach Enter-key Handler
/*
const ENTER=13
document.getElementById("ingredient")
    .addEventListener("keyup", function(event) {
    event.preventDefault();
    if (event.keyCode === ENTER) {
        document.getElementById("submit").click();
    }
});
*/