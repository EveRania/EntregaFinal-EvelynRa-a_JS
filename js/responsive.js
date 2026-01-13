document.addEventListener("DOMContentLoaded", () => {
    const menuBtn = document.getElementById("icon-menu");
    const navMobile = document.getElementById("navMobile");

    menuBtn.addEventListener("click", () => {
        navMobile.classList.toggle("active");
    });
});
