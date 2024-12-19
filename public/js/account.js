document.addEventListener("DOMContentLoaded", () => {
    // Fetch users with optional filters
    const fetchUsers = async (filters = {}) => {
        const params = new URLSearchParams(filters);
        const response = await fetch(`/admin/users?${params.toString()}`);
        if (response.ok) {
            const { users } = await response.json();
            populateUserTable(users);
        } else {
            console.error("Error fetching users.");
        }
    };

    // Populate the user table
    const populateUserTable = (users) => {
        const tbody = document.querySelector("#user-db tbody");
        tbody.innerHTML = ""; // Clear existing rows

        users.forEach((user) => {
            const row = `
                <tr>
                    <td>${user.username}</td>
                    <td>${user.email}</td>
                    <td>${user.role}</td>
                    <td>${user.phone}</td>
                    <td>${user.status}</td>
                    <td>
                        <button class="block-btn btn btn-danger btn-sm" data-id="${user.id}">Block</button>
                        <button class="unblock-btn btn btn-success btn-sm" data-id="${user.id}">Unblock</button>
                        <button class="delete-btn btn btn-danger btn-sm" data-id="${user.id}">Delete</button>
                    </td>
                </tr>
            `;
            tbody.insertAdjacentHTML("beforeend", row);
        });

        // Reassign event listeners after updating the table
        assignActionListeners();
    };

    // Assign event listeners for block, unblock, and delete buttons
    const assignActionListeners = () => {
        // Block a user
        document.querySelectorAll(".block-btn").forEach((button) => {
            button.addEventListener("click", async () => {
                const userId = button.dataset.id;
                const response = await fetch(`/admin/users/${userId}/block`, { method: "PATCH" });
                if (response.ok) {
                    alert("User has been blocked.");
                    fetchUsers(); // Refresh the table
                } else {
                    alert("Error blocking user.");
                }
            });
        });

        // Unblock a user
        document.querySelectorAll(".unblock-btn").forEach((button) => {
            button.addEventListener("click", async () => {
                const userId = button.dataset.id;
                const response = await fetch(`/admin/users/${userId}/unblock`, { method: "PATCH" });
                if (response.ok) {
                    alert("User has been unblocked.");
                    fetchUsers(); // Refresh the table
                } else {
                    alert("Error unblocking user.");
                }
            });
        });

        // Delete a user
        document.querySelectorAll(".delete-btn").forEach((button) => {
            button.addEventListener("click", async () => {
                const userId = button.dataset.id;
                const response = await fetch(`/admin/users/${userId}`, { method: "DELETE" });
                if (response.ok) {
                    alert("User has been deleted.");
                    fetchUsers(); // Refresh the table
                } else {
                    alert("Error deleting user.");
                }
            });
        });
    };

    // Search button logic
    document.getElementById("search-button").addEventListener("click", () => {
        const username = document.getElementById("filter-username").value.trim();
        const email = document.getElementById("filter-email").value.trim();

        // Only send `username` and `email` for search
        const filters = {};
        if (username) filters.username = username;
        if (email) filters.email = email;

        fetchUsers(filters);
    });

    // Filter button logic
    document.getElementById("filter-button").addEventListener("click", () => {
        const sortBy = document.getElementById("sort-by").value;
        const sortOrder = document.getElementById("sort-order").value;
        const role = document.getElementById("role").value;

        // Only send sorting and role for filters
        const filters = {};
        if (sortBy && sortBy !== "none") filters.sortBy = sortBy;
        if (sortOrder) filters.sortOrder = sortOrder;
        if (role && role !== "all") filters.role = role;

        fetchUsers(filters);
    });

    // Initial load (fetch all users)
    fetchUsers();
});
