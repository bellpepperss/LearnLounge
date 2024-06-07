
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

const mainContentPost = document.getElementById("main")

const createSubForumPostsContainer = () => {
    const subForumPostsCard = document.createElement("div");
    subForumPostsCard.classList.add("forum-card");

    return subForumPostsCard;
}

const createSubForumPosts = (subForumPostsInfo) => {
    const subForumPostsCard = document.createElement("div");
    subForumPostsCard.classList.add("forum-card");

    const subForumPostsContent = document.createElement("div");
    subForumPostsContent.classList.add("forum-content");

    const subForumPosts = document.createElement("div");
    subForumPosts.classList.add("forum-info");

    const subForumPoster = document.createElement("div");
    subForumPoster.classList.add("user-avatar");
    const userAvatar = document.createElement("img");
    userAvatar.src = subForumPostsInfo.userAvatarURL;
    subForumPoster.appendChild(userAvatar);
    subForumPoster.textContent = subForumPostsInfo.username;

    const subForumTitle = document.createElement("h2");
    subForumTitle.textContent = subForumPostsInfo.title;
    const subForumContent = document.createElement("p");
    subForumContent.textContent = subForumPostsInfo.subforumContent;
    const subForumImage = document.createElement("img");
    subForumImage.classList.add("subforum-image")
    subForumImage.src = subForumPostsInfo.subforumImageURL;

    subForumPosts.appendChild(subForumPoster);
    subForumPosts.appendChild(subForumTitle);
    subForumPosts.appendChild(subForumContent);
    subForumPosts.appendChild(subForumImage);

    subForumPostsContent.appendChild(subForumPosts);

    subForumPostsCard.appendChild(subForumPostsContent);

    return subForumPostsCard;
}

const SubForumPosts = () => {
    fetch("http://127.0.0.1:5500/SubForumPosts.json").then(Response => Response.json()).then(data => {
        // const SubForumPostsContainer = createSubForumPostsContainer();
        
        data.forEach(subforum => {
            const subForumPosts = createSubForumPosts(subforum);
            mainContentPost.appendChild(subForumPosts);
            // SubForumPostsContainer.appendChild(subForumPosts);
        });
        
        // mainContentPost.appendChild(SubForumPostsContainer);
    })
}

SubForumPosts()