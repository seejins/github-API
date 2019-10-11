const searchUrl="https://api.github.com/users/:username/repos"



function displayResults(responseJson) {
    $("#results-list").empty();

    console.log(responseJson);

    for(let i =0; i<responseJson.length; i++) {
        $("#results-list").append(
            `
            <li>
                <h3>${responseJson[i].name}</h3>
                <a href="${responseJson[i].html_url}">${responseJson[i].html_url}</a>
            </li>
            `
        )
    }
    $("#results").removeClass("hidden");

}



function getRepo(searchHandle) {
    console.log("formData", searchHandle);

    const url = `https://api.github.com/users/${searchHandle}/repos`

    console.log("URL", url);

    fetch(url)
        .then(response=> {
            if(response.ok) {
                return response.json();
            }
            throw new Error(response.statusText);
        }).then(responseJson=>displayResults(responseJson))
        .catch(err => {
            $("#js-error-message").text(`Something failed: ${err.message}`);
        });    
}



function watchForm() {
    $('form').submit(event => {
        event.preventDefault();
        const searchHandle = $("#search-handle").val();

        if(searchHandle != "") {
            getRepo(searchHandle);
        } else {
            alert("Please enter a user handle");
        }
    })

}





$(watchForm);