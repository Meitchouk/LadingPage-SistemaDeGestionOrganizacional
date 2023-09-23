let translations = {};

function loadTranslations(lang) {
    const translationFile = `translations/${lang}.json`;
    $.getJSON(translationFile, function(data) {
        translations = data;
        updateContent();
    });
}

function updateContent() {
    document.querySelector(".header h1").textContent = translations.title;
    document.querySelector(".header h2").textContent = translations.subtitle;
}

document.getElementById("translate-es").addEventListener("click", function() {
    loadTranslations("es");
    $("html").attr("lang", "es");
    $("#translate-en").show();
    $("#translate-es").hide();
});

document.getElementById("translate-en").addEventListener("click", function() {
    loadTranslations("en");
    $("html").attr("lang", "en");
    $("#translate-en").hide();
    $("#translate-es").show();
});

loadTranslations("es");
