document.addEventListener("DOMContentLoaded", function () {
    var backToTopButton = document.getElementById("back-to-top-button");

    // Mostrar el botón cuando se desplace hacia abajo
    window.addEventListener("scroll", function () {
        if (window.pageYOffset > 100) {
            backToTopButton.style.display = "block";
        } else {
            backToTopButton.style.display = "none";
        }
    });

    // Desplazarse hacia arriba al hacer clic en el botón
    backToTopButton.addEventListener("click", function (e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: "smooth" // Desplazamiento suave
        });
    });
});
