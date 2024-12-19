API_USER = "http:/localhost:8080/api/users"

function block_user(username, role, phone, email) {
    res = `<tr>
            <td>
                <input type="checkbox" id = 'checkbox_user'>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>
            <td>${username}</td>
            <td>${role}</td>
            <td>${phone}</td>
            <td>${email}</td>
        </tr>
    `
    return res;
}

function Filter(data) {
    filter_role = document.getElementById("role").value;
    filter_sort = document.getElementById("sort").value;
    filter_seach_name = document.getElementById("search").value

    if (filter_seach_name != "") {
        data = data.filter((user) => user.username.toLowerCase() === filter_seach_name.toLowerCase())
    }

    if (filter_role != "all") data = data.filter((user) => user.role === filter_role);
    if (filter_sort != "none") {
        if (filter_sort === "name") {
            data = data.sort((a, b) => a.username.localeCompare(b.username));
        }
        if (filter_sort === "role") {
            data = data.sort((a, b) => a.role.localeCompare(b.role));
        }
        if (filter_sort === "email") {
            data = data.sort((a, b) => a.email.localeCompare(b.email));
        }
    }
    return data
}

function show_user() {
    fetch(API_USER)
        .then((res) => res.json())
        .then((data) => {
            let res = `
        <tr>
            <th>Actions</th>
            <th>Name</th>
            <th>Role</th>
            <th>Phone</th>
            <th>Email</th>
        </tr>
        `
            data = Filter(data)

            data.forEach((user) => {
                const username = user.username
                const email = user.email
                const role = user.role

                let phone = null
                if ('phone' in user) phone = user.phone

                const isActive = user.isActive;

                res += block_user(username, role, phone, email);
            })

            const userList = document.getElementById("user-db")
            userList.innerHTML = res
        })
}

show_user()

document.getElementById("filter").addEventListener("click", () => {
    show_user()
});
