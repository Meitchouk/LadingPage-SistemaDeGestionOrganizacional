document.addEventListener("DOMContentLoaded", function () {
    const carousel = document.querySelector(".carousel");
    const imageNames = [
        "1- Desagregación del Sistema",
        "2- Diagrama de Contexto",
        "3- Caja Negra",
        "4- CAJA BLANCA - Subsistema de Epidemiología",
        "5- CAJA BLANCA - Subsistema de Administración",
        "6- CAJA BLANCA - Subsistema de Enfermería",
        "7- CAJA BLANCA - Subsistema de Dirección Médica",
        "8- Modelo de Diamante",
        "9- Árbol de objetivos",
        "10- Árbol de problemas",
        "11- Matriz de Optimización de objetivos versus alternativas",
        "12- Diagrama sin RC",
        "13- Ruta Crítica",
        "14- Diagrama de GANTT"
    ];
    const maxImagesToShow = imageNames.length;
    let currentIndex = 0;

    // Función para cargar las imágenes de la carpeta dinámicamente
    function loadImages() {
        imageNames.forEach((imageName, index) => {
            const img = document.createElement("img");
            img.src = `img/${index + 1}.png`;
            img.alt = imageName;
            const slide = document.createElement("div");
            slide.className = "slide";
            slide.appendChild(img);
            carousel.appendChild(slide);
        });

        showCurrentSlide(); // Mostrar la primera imagen
        updateCarouselTitle(currentIndex);
    }

    // Función para mostrar la imagen actual
    function showCurrentSlide() {
        const slides = carousel.querySelectorAll(".slide");
        slides.forEach((slide, index) => {
            if (index === currentIndex) {
                slide.style.display = "block"; // Muestra la imagen actual
            } else {
                slide.style.display = "none"; // Oculta las demás imágenes
            }
        });
    }

    // Cambiar automáticamente las imágenes cada 30 segundos
    setInterval(() => {
        currentIndex++;
        if (currentIndex >= maxImagesToShow) {
            currentIndex = 0;
        }
        showCurrentSlide();
        updateCarouselTitle(currentIndex);
    }, 30000);

    // Función para actualizar el título
    function updateCarouselTitle(index) {
        const carouselTitle = document.getElementById("carousel-title");
        carouselTitle.textContent = imageNames[index];
    }

    // Cargar automáticamente las imágenes al cargar la página
    loadImages();
    
    function prevSlide() {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = maxImagesToShow - 1;
        }
        showCurrentSlide();
        updateCarouselTitle(currentIndex);
    }
    
    function nextSlide() {
        currentIndex++;
        if (currentIndex >= maxImagesToShow) {
            currentIndex = 0;
        }
        showCurrentSlide();
        updateCarouselTitle(currentIndex);
    }
    
    // Eventos para los botones externos
    const prevButton = document.getElementById("prevButton");
    const nextButton = document.getElementById("nextButton");
    
    prevButton.addEventListener("click", prevSlide);
    nextButton.addEventListener("click", nextSlide);
});

