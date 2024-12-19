API_USER = "http://localhost:8080/api/movies"

function movie_block(name_vn, director, actor, country_name_vn, formats_name_vn, type_name_vn,
    release_date, end_date, image, time, limitage_vn, language_vn, background_image_url, brief_vn) {

    release_date = new Date(release_date)
    release_date = release_date.toLocaleString('en-GB', {
        weekday: 'long', // Ngày trong tuần
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    end_date = new Date(end_date)
    end_date = end_date.toLocaleString('en-GB', {
        weekday: 'long', // Ngày trong tuần
        year: 'numeric',
        month: 'numeric',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric'
    });

    res = `<div class="row">
        <div class="col-12">
            <div class="card mb-4 shadow-sm">
                <div class="card-body">
                    <h5 class="card-title">${name_vn}</h5>
                    
                    <p class="card-text">
                        <strong> Director:</strong> ${director} <br>
                        <strong> Actor:</strong> ${actor} <br>
                        <strong> Country:</strong> ${country_name_vn} <br>
                        <strong> Formats:</strong> ${formats_name_vn} <br>
                        <strong> Type:</strong> ${type_name_vn} <br>
                        <strong> Release Date</strong> ${release_date} <br>
                        <strong> End Date:</strong> ${end_date} <br>
                        <strong> Image:</strong> ${image} <br>
                        <strong> Time:</strong> ${time} <br>
                        <strong> Limit Age:</strong> ${limitage_vn} <br>
                        <strong> Language:</strong> ${language_vn} <br>
                        <strong> Background Image:</strong> ${background_image_url} <br>
                        <strong> Brief:</strong> ${brief_vn} <br>
                    </p>

                    <div class="d-flex">
                        <div class="ms-auto">
                            <button class="btn btn-primary btn-sm me-2">Edit</button>
                            <button class="btn btn-danger btn-sm">Remove</button>
                        </div>
                    </div>
                </div>
            </div>                      
        </div>
    </div>
    `
    return res;
}

function Filter(data) {
    filter_status = document.getElementById("status").value;
    filter_sort = document.getElementById("sort").value;
    filter_seach_name = document.getElementById("search").value

    if (filter_seach_name != "") {
        data = data.filter((movie) => movie.name_vn.toLowerCase() === filter_seach_name.toLowerCase())
    }

    if (filter_status != "all") {

        const today = new Date();

        if (filter_status == "currently_showing") {
            data = data.filter((movie) => {
                const releaseDate = new Date(movie.release_date);
                const endDate = new Date(movie.end_date);
                return releaseDate <= today && endDate >= today;
            });
        }

        if (filter_status == "coming_soon") {
            data = data.filter((movie) => {
                const releaseDate = new Date(movie.release_date);
                return today < releaseDate;
            });
        }

        if (filter_status == "ended") {
            data = data.filter((movie) => {
                const endDate = new Date(movie.end_date);
                return today > endDate;
            });
        }

    }
    if (filter_sort != "none") {
        if (filter_sort === "name") {
            data = data.sort((a, b) => a.name_vn.localeCompare(b.name_vn));
        }
        if (filter_sort === "time") {
            data = data.sort((a, b) => a.time - b.time);
        }
    }
    return data
}

function show_movies() {
    fetch(API_USER)
        .then((res) => res.json())
        .then((data) => {

            data = Filter(data);
            let res = ""
            data.forEach((movie) => {
                res += movie_block(
                    movie.name_vn, movie.director, movie.actor, movie.country_name_vn,
                    movie.formats_name_vn, movie.type_name_vn, movie.release_date,
                    movie.end_date, movie.image, movie.time, movie.limitage_vn,
                    movie.language_vn, movie.background_image_url, movie.brief_vn
                )
            })

            const userList = document.getElementById("movies-DB")
            userList.innerHTML = res
        })
}

show_movies()

document.getElementById("filter").addEventListener("click", () => {
    show_movies()
});
