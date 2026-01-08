const form = document.querySelector("form");
const inputs = document.querySelectorAll("input[type='text'], input[type='email']");

form.addEventListener("submit", function (e) {
    e.preventDefault();

    let formularioValido = true;

    inputs.forEach(input => {
        if (input.value.trim() === "") {
            marcarError(input, "Este campo es obligatorio");
            formularioValido = false;
        } else {
            limpiarError(input);
        }
    });

    // Validación email
    const email = document.getElementById("email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email.value)) {
        marcarError(email, "Email inválido");
        formularioValido = false;
    }

    // Validación teléfono (solo números)
    const telefono = document.getElementById("telefono");
    const telefonoRegex = /^[0-9]+$/;

    if (!telefonoRegex.test(telefono.value)) {
        marcarError(telefono, "Solo números");
        formularioValido = false;
    }

    if (formularioValido) {
        alert("Formulario enviado correctamente ✅");
        form.submit();
    }
});

function marcarError(input, mensaje) {
    input.classList.add("error");

    if (!input.nextElementSibling || input.nextElementSibling.tagName !== "SPAN") {
        const span = document.createElement("span");
        span.textContent = mensaje;
        span.classList.add("mensaje-error");
        input.insertAdjacentElement("afterend", span);
    }
}

function limpiarError(input) {
    input.classList.remove("error");
    if (input.nextElementSibling && input.nextElementSibling.tagName === "SPAN") {
        input.nextElementSibling.remove();
    }
}
