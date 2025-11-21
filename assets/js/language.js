document.addEventListener("DOMContentLoaded", function () {

    const langBtn = document.getElementById("language-btn");
    let currentLang = "es";

    console.log("Script cargado correctamente");
    console.log("Botón encontrado:", langBtn);

    // --- CARGAR IDIOMA ---
    function loadLanguage(lang) {
        console.log("Cargando idioma:", lang);
        fetch("assets/json/language.json")
            .then(res => {
                console.log("Respuesta recibida:", res.status);
                return res.json();
            })
            .then(data => {
                console.log("Datos cargados:", data);
                
                let elementosActualizados = 0;
                document.querySelectorAll("[data-key]").forEach(el => {
                    const key = el.getAttribute("data-key");
                    if (data[lang] && data[lang][key]) {
                        el.innerHTML = data[lang][key];
                        elementosActualizados++;
                    }
                });
                
                console.log(`Elementos actualizados: ${elementosActualizados}`);

                // Cambiar el texto del botón
                if (langBtn && data[lang] && data[lang].lang_btn) {
                    langBtn.innerText = data[lang].lang_btn;
                    console.log("Botón actualizado a:", data[lang].lang_btn);
                }
            })
            .catch(error => console.error("Error cargando idioma:", error));
    }

    // --- CARGAR PRECIOS ---
    function loadPrices() {
        console.log("Cargando precios...");
        fetch("assets/json/prices.json")
            .then(res => {
                console.log("Precios - Respuesta:", res.status);
                return res.json();
            })
            .then(p => {
                console.log("Precios cargados:", p);
                
                // Individual
                setPrices("personal", p.personal);

                // Pareja
                setPrices("pareja", p.pareja);

                // Grupos
                setPrices("gruporeducido", p.gruporeducido);
                setPrices("grupogrande", p.grupogrande);

                // Gimnasio
                const gimCuota = document.getElementById("gimnasio-cuota");
                const gimBono1 = document.getElementById("gimnasio-bono1");
                const gimBono10 = document.getElementById("gimnasio-bono10");
                
                if (gimCuota) gimCuota.innerText = p.gimnasio.cuota;
                if (gimBono1) gimBono1.innerText = p.gimnasio.bono1;
                if (gimBono10) gimBono10.innerText = p.gimnasio.bono10;

                // Online
                const onlineSeg2 = document.getElementById("online-seg_2");
                const onlineSeg4 = document.getElementById("online-seg_4");
                
                if (onlineSeg2) onlineSeg2.innerText = p.online.seg_2;
                if (onlineSeg4) onlineSeg4.innerText = p.online.seg_4;
                
                setPrices("online", p.online);
                
                console.log("Precios cargados correctamente");
            })
            .catch(error => console.error("Error cargando precios:", error));
    }

    function setPrices(prefix, priceGroup) {
        const priceKeys = ["1_sesion", "4_sesiones", "8_sesiones", "12_sesiones"];
        
        priceKeys.forEach(key => {
            const elementId = `${prefix}-${key}`;
            const element = document.getElementById(elementId);
            if (element && priceGroup[key]) {
                element.innerText = priceGroup[key];
            }
        });
    }

    // BOTÓN DE CAMBIO DE IDIOMA
    if (langBtn) {
        console.log("Evento click añadido al botón");
        langBtn.addEventListener("click", function (e) {
            e.preventDefault();
            console.log("Click detectado! Idioma actual:", currentLang);
            currentLang = currentLang === "es" ? "en" : "es";
            console.log("Cambiando a:", currentLang);
            loadLanguage(currentLang);
        });
    } else {
        console.error("ERROR: No se encontró el botón con id 'language-btn'");
    }

    // CARGAR AL INICIO
    console.log("Iniciando carga inicial...");
    loadLanguage(currentLang);
    loadPrices();
});