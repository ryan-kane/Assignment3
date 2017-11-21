var sendObj = {
    'search': ""
};

function handleSubmit(){
    //clear the page
    let mainDiv = document.getElementById("main");
    mainDiv.innerHTML= '';

    //check if there is anything entered
    let ingredient = {};
    ingredient.name = document.getElementById('ingredients_input').value;
    console.log(ingredient.name);
    document.getElementById('ingredients_input').innerHTML = '';
    if(ingredient.name === '') {
        return alert('Please enter an ingredient');
    }

    let xhr = new XMLHttpRequest()
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            let response = JSON.parse(xhr.responseText)
			mainDiv.innerHTML = mainDiv.innerHTML + `
			<h1>${response.count} recipes for ${ingredient.name} </h1>
			`
			for (var i = 0; i < response.count; i++){
                mainDiv.innerHTML = mainDiv.innerHTML + `
                <div class="multicolumn">
                    <ul>
                        <li class="recipes">
                            <a href="${response.recipes[i].f2f_url}" target="_blank">
                                <figure>
                                    <img class="recipe" src="${response.recipes[i].image_url}">
                                    <figcaption>${response.recipes[i].title}</figcapture>
                                </figure>
                            </a>
                        </li>
                    </ul>
                </div>
                `
			}
        }
    }
    xhr.open('POST', `/recipes?ingredient=${ingredient.name}`, true);
    xhr.send();
}