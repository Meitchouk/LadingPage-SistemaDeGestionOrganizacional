document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const prevButton = document.getElementById("prev-slide");
    const nextButton = document.getElementById("next-slide");
    const imageFolder = "/img"; // Ruta de la carpeta de imágenes
    let currentIndex = 0;

    // Función para cargar las imágenes de la carpeta dinámicamente
    function loadImages() {
        fetch(imageFolder) // Hacer una solicitud HTTP para obtener la lista de archivos en la carpeta
            .then((response) => response.text())
            .then((html) => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, "text/html");
                const links = Array.from(doc.querySelectorAll("a"));
                const imageFiles = links
                    .filter((link) => /\.(jpg|jpeg|png)$/i.test(link.href)) // Filtrar solo archivos JPG o PNG
                    .map((link) => link.href);

                // Cargar las imágenes dinámicamente en el carrusel
                imageFiles.forEach((file) => {
                    const img = document.createElement("img");
                    img.src = file;
                    img.alt = decodeURIComponent(file.split("/").pop().split(".")[0]); // Decodificar la URL y obtener el nombre del archivo sin extensión
                    const slide = document.createElement("div"); // Crea un contenedor div para cada imagen
                    slide.className = "slide";
                    slide.appendChild(img);
                    carousel.appendChild(slide);
                });

                showCurrentSlide(); // Mostrar la primera imagen
                updateCarouselTitle(currentIndex); // Actualizar el título después de cargar las imágenes
            });
    }

    // Función para mostrar la imagen actual
    function showCurrentSlide() {
        const slides = carousel.querySelectorAll(".slide");
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.style.transform = "translateX(0%)"; // Muestra la imagen actual
            } else {
                const offset = (index - currentIndex) * 100; // Calcula el desplazamiento
                slide.style.transform = `translateX(${offset}%)`; // Aplica el desplazamiento
            }
        });
    }

    // Avanzar al siguiente slide
    nextButton.addEventListener("click", function () {
        currentIndex++;
        if (currentIndex >= carousel.childElementCount) {
            currentIndex = 0; // Vuelve al primer slide al llegar al final
        }
        showCurrentSlide();
        updateCarouselTitle(currentIndex);
    });

    // Retroceder al slide anterior
    prevButton.addEventListener("click", function () {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = carousel.childElementCount - 1; // Vuelve al último slide al llegar al principio
        }
        showCurrentSlide();
        updateCarouselTitle(currentIndex);
    });

    // Cargar automáticamente las imágenes al cargar la página
    loadImages();

    // Función para actualizar el título
    function updateCarouselTitle(index) {
        const currentImage = carousel.querySelector(`.slide:nth-child(${index + 1}) img`);
        const imageName = currentImage ? currentImage.alt : "";
        const carouselTitle = document.getElementById("carousel-title");
        carouselTitle.textContent = imageName;
    }

    // Llamada inicial para mostrar el título de la primera imagen
    //updateCarouselTitle(0); // Comentamos esta llamada inicial
});
