
const rijen = document.querySelectorAll(".tabel tbody tr");

function updateDashboard() {
    let behaaldeEC = 0;

    rijen.forEach(function (rij) {
        const cijferCel = rij.querySelector(".cijfer");
        const ec = Number(rij.dataset.ec);

        const cijferTekst = cijferCel.textContent.trim().replace(",", ".");
        const cijfer = Number(cijferTekst);

        // Verwijder eerst de oude kleuren
        rij.classList.remove("gehaald", "gefaald");

        // Sla lege cijfers over
        if (cijferTekst === "" || cijferTekst === "-") {
            return;
        }

        // Controleer of het cijfer geldig is
        if (!Number.isFinite(cijfer) || cijfer < 1 || cijfer > 10) {
            return;
        }

        // Bepaal de kleur en bereken de EC's
        if (cijfer >= 5.5) {
            rij.classList.add("gehaald");
            behaaldeEC += ec;
        } else {
            rij.classList.add("gefaald");
        }
    });

    document.getElementById("behaalde-ec").textContent = behaaldeEC;
    document.getElementById("advies-ec").textContent = behaaldeEC;

    const percentage = Math.min((behaaldeEC / 60) * 100, 100);

    document.getElementById("voortgang-vulling").style.width =
        percentage + "%";

    document.getElementById("voortgang-tekst").textContent =
        Math.round(percentage) + "% van de 60 EC behaald";

    document.getElementById("voortgang-balk").setAttribute(
        "aria-valuenow",
        Math.min(behaaldeEC, 60)
    );
}

updateDashboard();
