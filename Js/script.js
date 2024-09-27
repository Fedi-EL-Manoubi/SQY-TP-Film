        let userFavorites = [];

        //
        function loadFavorites() {
            const xhr = new XMLHttpRequest();
            xhr.open('GET', 'get_favorites.php', true);
            xhr.onload = function () {
                if (xhr.status === 200) {
                    const response = JSON.parse(xhr.responseText);
                    if (response.error) {
                        console.error(response.error);
                        alert(response.error);
                    } else {
                        userFavorites = response;
                        displayFavorites(userFavorites);
                    }
                } else {
                    console.error('Erreur lors du chargement des favoris:', xhr.statusText);
                }
            };
            xhr.send();
        }


        function displayMovies(movies) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = ''; // Vider la div

            movies.forEach(movie => {
                const isFavorite = userFavorites.some(fav => fav.imdbID === movie.imdbID);

                const movieHTML = `
                    <div class="movie">
                                         <h3>${movie.Title} (${movie.Year})</h3>
                        <img src="${movie.Poster !== "N/A" ? movie.Poster : 'placeholder.jpg'}" alt="${movie.Title}">
                        <p>ID IMDB : ${movie.imdbID}</p>
                        <button ${isFavorite ? 'disabled' : ''} onclick="addToFavorites('${movie.imdbID}', '${movie.Title}', '${movie.Year}')">
                            ${isFavorite ? 'Déjà en favoris' : 'Ajouter aux favoris'}
                        </button>
                    </div>
                `;
                resultDiv.innerHTML += movieHTML;
            });
        }


        function addToFavorites(imdbID, title, year) {
            // Envoi AJAX vers PHP pour ajouter aux favoris
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'add_favorite.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`imdbID=${imdbID}&title=${title}&year=${year}`);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('Film ajouté aux favoris !');
                    loadFavorites();
                }
            };
        }function displayFavorites(favorites) {
            const favoritesDiv = document.getElementById('favorites');
            favoritesDiv.innerHTML = ''; // Vider la div avant d'ajouter de nouveaux favoris

            if (favorites.length === 0) {
                favoritesDiv.innerHTML = '<p>Vous n\'avez aucun film en favoris pour le moment.</p>';
            } else {
                favorites.forEach(favorite => {
                    const movieHTML = `
                        <div class="movie">
                            <h3>${favorite.title} (${favorite.year})</h3>
                            <p>ID IMDB : ${favorite.imdbID}</p>
                            <button onclick="removeFavorite('${favorite.id}')">Retirer des favoris</button>
                        </div>
                    `;
                    favoritesDiv.innerHTML += movieHTML; // Ajouter chaque film dans la div des favoris
                });
            }
        }

        // Fonction pour retirer un film des fav
        function removeFavorite(id) {
            const xhr = new XMLHttpRequest();
            xhr.open('POST', 'remove_favorite.php', true);
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
            xhr.send(`id=${id}`);

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    alert('Film retiré des favoris !');
                    loadFavorites(); // Recharger les favoris après suppression
                }
            };
        }

        document.querySelector('form').addEventListener('submit', function (e) {
            e.preventDefault(); // Empêche le rechargement de la page lors de la soumission du formulaire

            const searchInput = document.getElementById('searchInput').value;
            const resultDiv = document.getElementById('result');

            // Vérifier si l'utilisateur a saisi quelque chose
            if (searchInput.trim() === '') {
                resultDiv.innerHTML = '<p>Veuillez entrer un titre de film.</p>';
                return;
            }

            const apiKey = '1b0319a8'; // Clé API OMDb
            const apiUrl = `http://www.omdbapi.com/?s=${encodeURIComponent(searchInput)}&apikey=${apiKey}`;

            // Requête API OMDb
            fetch(apiUrl)
                .then(response => response.json())
                .then(data => {
                    // Vérifier si des films ont été trouvés
                    if (data.Response === "True") {
                        displayMovies(data.Search); // Appel de la fonction pour afficher les films
                    } else {
                        resultDiv.innerHTML = '<p>Aucun film trouvé pour cette recherche.</p>';
                    }
                })
                .catch(error => {
                    console.error('Erreur:', error);
                    resultDiv.innerHTML = '<p>Une erreur est survenue lors de la recherche.</p>';
                });
        });

        document.getElementById('loadFavoritesBtn').addEventListener('click', function() {
            loadFavorites(); // Charger les favoris quand le bouton est cliqué
        });

