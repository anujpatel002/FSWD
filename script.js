let users = [
    {username:"25MCA100", name:"Anuj" , password:"25MCA100", role:"Student"},
    {username:"25MCA091", name:"Tirth" ,password:"25MCA091", role:"Student"},
    {username:"25MCA095", name:"Vivek" ,password:"25MCA095",role:"Student"},
    {username:"Admin", name:"Administration" ,password:"Admin", role:"Admin"},
]

// Code for index.html
if (document.querySelector("#username")) {
    const txtUsername = document.querySelector("#username");
    const txtPassword = document.querySelector("#password");
    const loginForm = document.querySelector("#loginForm");

    loginForm.addEventListener("submit", (e) => {
        let uname = txtUsername.value.trim();
        let pass = txtPassword.value.trim();

        if (!uname || !pass) {
            alert("Please fill in both username and password.");
            e.preventDefault();
            return;
        }

        let user = users.find(u => u.username === uname && u.password === pass);

        if (!user) {
            alert("Invalid username or password.");
            e.preventDefault();
            return;
        }

        if (user.role === "Admin") {
            window.location.href = "Admin.html?name=" + user.name;
        } else {
            alert("Login successful as Student!");
        }
        e.preventDefault(); // Prevent form submission for demo
    });
}

// Code for Admin.html
if (document.querySelector("#greet")) {
    const greet = document.querySelector("#greet");
    const urlParams = new URLSearchParams(window.location.search);
    const name = urlParams.get('name') || 'Admin';
    greet.textContent = name;
}

function displayUsers(filter = "") {
    const allusers = document.querySelector("#allUsers");
    // Clear existing rows except header
    while (allusers.rows.length > 1) {
        allusers.deleteRow(1);
    }
    let no = 0;
    const filteredUsers = filter ? users.filter(user =>
        user.username.toLowerCase().includes(filter.toLowerCase()) ||
        user.name.toLowerCase().includes(filter.toLowerCase())
    ) : users;
    filteredUsers.forEach(user => {
        const createUser = document.createElement("tr");
        createUser.classList.add("user");

        const srNo = document.createElement("td");
        const createUsername = document.createElement("td");
        const createName = document.createElement("td");
        const creatRole = document.createElement("td");
        const actionsCell = document.createElement("td");
        
        no += 1;
        srNo.textContent = no;
        createUsername.textContent = user.username;
        createName.textContent = user.name;
        creatRole.textContent = user.role;

        // Create Update button
        const updateBtn = document.createElement("button");
        updateBtn.textContent = "Update";
        updateBtn.style.marginRight = "5px";
        updateBtn.addEventListener("click", () => updateUser(user.username));

        // Create Delete button
        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener("click", () => deleteUser(user.username));

        actionsCell.append(updateBtn);
        actionsCell.append(deleteBtn);

        createUser.append(srNo);
        createUser.append(createUsername);
        createUser.append(createName);
        createUser.append(creatRole);
        createUser.append(actionsCell);

        allusers.append(createUser);
    });
}

function updateUser(username) {
    const user = users.find(u => u.username === username);
    if (!user) {
        alert("User not found.");
        return;
    }

    // Populate the form with existing user data
    const ausername = document.querySelector("#ausername");
    const aname = document.querySelector("#aname");
    const apass = document.querySelector("#apassword");
    const arole = document.querySelector("#arole");

    ausername.value = user.username;
    ausername.disabled = true; // Disable username field during update
    aname.value = user.name;
    apass.value = user.password;
    arole.value = user.role;

    // Change the button text and functionality
    const btnAddUser = document.querySelector("#btnAddUser");
    btnAddUser.textContent = "Update User";
    btnAddUser.dataset.mode = "update";
    btnAddUser.dataset.originalUsername = username;

    // Scroll to the form
    document.querySelector("#addUser").scrollIntoView({ behavior: "smooth" });
}

function deleteUser(username) {
    if (username === "Admin") {
        alert("Cannot delete the Admin user.");
        return;
    }

    if (confirm(`Are you sure you want to delete user "${username}"?`)) {
        const index = users.findIndex(u => u.username === username);
        if (index > -1) {
            users.splice(index, 1);
            displayUsers();
            alert("User deleted successfully!");
        }
    }
}

if(document.querySelector("#allUsers")){
    displayUsers();
}

if(document.querySelector("#searchBtn")){
    const searchInput = document.querySelector("#searchInput");
    const searchBtn = document.querySelector("#searchBtn");
    const clearBtn = document.querySelector("#clearBtn");

    searchBtn.addEventListener("click", () => {
        const filter = searchInput.value.trim();
        displayUsers(filter);
    });

    clearBtn.addEventListener("click", () => {
        searchInput.value = "";
        displayUsers();
    });
}

if(document.querySelector("#addUser")){

    const ausername = document.querySelector("#ausername");
    const aname = document.querySelector("#aname");
    const apass = document.querySelector("#apassword");
    const arole = document.querySelector("#arole");
    const btnAddUser = document.querySelector("#btnAddUser");

    btnAddUser.addEventListener("click",()=>{
        const username = ausername.value.trim();
        const name = aname.value.trim();
        const password = apass.value.trim();
        const role = arole.value;

        if (!username || !name || !password || !role) {
            alert("Please fill in all fields.");
            return;
        }

        // Check if in update mode
        if (btnAddUser.dataset.mode === "update") {
            const originalUsername = btnAddUser.dataset.originalUsername;
            const userIndex = users.findIndex(u => u.username === originalUsername);
            
            if (userIndex > -1) {
                users[userIndex].name = name;
                users[userIndex].password = password;
                users[userIndex].role = role;
                
                displayUsers();
                alert("User updated successfully!");
            }
            
            // Reset the form
            btnAddUser.textContent = "Add";
            delete btnAddUser.dataset.mode;
            delete btnAddUser.dataset.originalUsername;
            ausername.disabled = false;
        } else {
            // Add mode
            if (users.some(u => u.username === username)) {
                alert("Username already exists.");
                return;
            }

            const user = {
                username: username,
                name: name,
                password: password,
                role: role
            };

            users.push(user);
            displayUsers();
            alert("User added successfully!");
        }

        // Clear form
        ausername.value = "";
        aname.value = "";
        apass.value = "";
        arole.value = "";
    })
}
