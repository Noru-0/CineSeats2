document.getElementById('filter-button').addEventListener('click', function() {
    const genre = document.getElementById('genre-filter')?.value;
    const age = document.getElementById('age-filter').value;
    const rating = document.getElementById('rating-filter').value;
    const country = document.getElementById('country-filter').value;

    document.querySelectorAll('.movies-item').forEach(function(item) {
        const itemGenres = item.dataset.genre.split(', ');
        const matchesGenre = !genre || genre === 'none' || itemGenres.includes(genre);
        const matchesAge = age === 'none' || item.dataset.age === age;
        const matchesRating = rating === 'none' || item.dataset.rating === rating;
        const matchesCountry = country === 'none' || item.dataset.country === country;

        if (matchesGenre && matchesAge && matchesRating && matchesCountry) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        }
    });
});