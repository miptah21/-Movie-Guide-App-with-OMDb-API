let movieNameRef = document.getElementById("movie-name");
let searchBtn = document.getElementById("search-btn");
let result = document.getElementById("result");
const key = "b5e58d0";
// Function to fetch data from API

let getMovie = () => {
    let movieName = movieNameRef.value;
    let url = `http://www.omdbapi.com/?t=${movieName}&apikey=${key}`;

    // If input field is empty

    if(movieName.length <= 0) {
        result.innerHTML = "<h3 class='msg'>Please enter a movie</h3>";
    }

    // If input isn't empty
    else {
        fetch(url).then((resp) => resp.json()).then((data) => {
            // if movie exist in database
            if(data.Response == "True") {
                result.innerHTML = `
                    <div class="info">
                        <img src="${data.Poster} class="poster">
                        <div>
                            <h2>${data.Title}</h2>
                            <div class="rating">
                                <img class="star" src="/img/star-icon.png">
                                <h4>${data.imdbRating}</h4>
                            </div>
                            <div class="details">
                                <span>${data.Rated}</span>
                                <span>${data.Year}</span>
                                <span>${data.Runtime}</span>
                            </div>
                            <div class="genre">
                                <div>${data.Genre.split(",").join("</div><div>")}</div>
                            </div>
                        </div>
                    </div>
                    <h3>Plot:</h3>
                    <p>${data.Plot}</p>
                    <h3>Cast:</h3>
                    <p>${data.Actors}</p>
                `;
            }

            // if movie doesn't exist in database
            else {
                result.innerHTML = `<h3 class="msg">${data.Error}</h3>`;
            }
        })
        // if error occurs
        .catch(() => {
            result.innerHTML = "<h3 class='msg'>Error Occured</h3>";
        })
    };
};

searchBtn.addEventListener("click", getMovie);

// Event listener untuk tombol enter
movieNameRef.addEventListener("keypress", function(event) {
    // Mengecek apakah tombol yang ditekan adalah "Enter"
    if (event.keyCode === 13 || event.which === 13) {
        // Jalankan fungsi getMovie
        getMovie();
    }
});

// Event listener untuk memantau perubahan input pada form
movieNameRef.addEventListener("input", function() {
    // Periksa apakah input kosong
    if (movieNameRef.value === "") {
        // Jika input kosong, hapus isi result
        result.innerHTML = "";
    }
});

movieNameRef.addEventListener("input", getMovie);

// Function to clear cache on page reload
let clearCache = () => {
    window.location.reload(true);
};

// Add event listener to window
window.addEventListener('beforeunload', clearCache);


