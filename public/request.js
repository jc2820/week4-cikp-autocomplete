// inputBox is our search bar. It waits for an input and runs api function each time.
const inputBox = document.querySelector('input[name="autocomplete"]');
let currentMatches = [];
let finalInput = document.querySelector(".input-field");
let finalDish;

const api = () => {
    if (inputBox.value === "") {
        killAllChildren();
    } else {
    //grab the value in the input box
    let currentInput = inputBox.value;
    let xhr = new XMLHttpRequest();
    // make a file path using the search prefix and our input value
    let searchConcat = "/search?q=" + currentInput;
    let updatedSearch = searchConcat.toLowerCase();
    xhr.onreadystatechange = () => {
        if (xhr.readyState == 4 && xhr.status == 200) {
            // Response comes back so...
            // Populate the currentmatches array with parsed response
            currentMatches = JSON.parse(xhr.responseText);
            // append current matches to DOM -- call function here.
            createList(currentMatches);
        }
    };
    // Send the search term over to our server
    xhr.open("GET", updatedSearch, true);
    xhr.send();
}
};

inputBox.addEventListener("input", api);

    const apiDish = () => {
        let country = finalInput.value;
        let xhr = new XMLHttpRequest();
        let submittedCountry = "/submit=" + country;
        console.log(country);
        xhr.onreadystatechange = () => {
            if (xhr.readyState == 4 && xhr.status == 200) {
                finalDish = JSON.parse(xhr.responseText);
                createCountryDish(finalDish);
            }
        };
        xhr.open("GET", submittedCountry, true);
        xhr.send();
    }
    

// event listener for submit button click
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener('click', apiDish);