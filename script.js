
function openNav() {
    document.getElementById("sidenav").style.width = "250px";
    document.getElementById("main").style.marginLeft = "250px";
  }
  
  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  function closeNav() {
    document.getElementById("sidenav").style.width = "100px";
    document.getElementById("main").style.marginLeft = "100px";
  }

  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("loginModal");
    const loginBtn = document.getElementById("loginBtn");
    const logoutBtn = document.getElementById("logoutBtn");
    const span = document.getElementsByClassName("close")[0];
    const loginForm = document.getElementById("loginForm");
    const userAvatar = document.getElementById("userAvatar");
    const userName = document.getElementById("userName");
    const dropdownMenu = document.getElementById("dropdownMenu");
    const dropdownUserName = document.getElementById("dropdownUserName");
    const dropdownUserEmail = document.getElementById("dropdownUserEmail");
    const logoutLink = document.getElementById("logoutLink");

    // Show login modal
    loginBtn.onclick = function() {
        modal.style.display = "flex";
    }

    // Hide login modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // Hide login modal when clicking outside of it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Handle login form submission
    loginForm.onsubmit = function(event) {
        event.preventDefault();
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const email = username + "@gmail"; // Simulate an email based on username

        if (username && password) {
            localStorage.setItem("username", username);
            localStorage.setItem("email", email);
            localStorage.setItem("loggedIn", "true");
            updateUI();
            modal.style.display = "none";
        }
    }

    // Handle logout
    logoutBtn.onclick = logoutLink.onclick = function() {
        localStorage.removeItem("username");
        localStorage.removeItem("email");
        localStorage.removeItem("loggedIn");
        updateUI();
    }

    // Show dropdown menu
    userAvatar.onclick = function() {
        dropdownMenu.style.display = dropdownMenu.style.display === "none" ? "block" : "none";
    }

    // Hide dropdown 
    window.onclick = function(event) {
        if (event.target !== userAvatar && !userAvatar.contains(event.target) && event.target !== dropdownMenu && !dropdownMenu.contains(event.target)) {
            dropdownMenu.style.display = "none";
        }
    }

    // Update UI based on login state
    function updateUI() {
        const loggedIn = localStorage.getItem("loggedIn");
        if (loggedIn === "true") {
            const username = localStorage.getItem("username");
            const email = localStorage.getItem("email");
            userName.textContent = username;
            dropdownUserName.textContent = username;
            dropdownUserEmail.textContent = email;
            loginBtn.style.display = "none";
            userAvatar.style.display = "flex";
            logoutBtn.style.display = "block";
        } else {
            loginBtn.style.display = "block";
            userAvatar.style.display = "none";
            dropdownMenu.style.display = "none";
            logoutBtn.style.display = "none";
        }
    }

    // Initial UI update
    updateUI();
});
