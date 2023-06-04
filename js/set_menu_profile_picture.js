if (localStorage.getItem("profile_pic")) {
    document.getElementById('profilePhoto').src =
        localStorage.getItem("profile_pic");
}