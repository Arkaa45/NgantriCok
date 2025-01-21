document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("form-antrian");
    const resultContainer = document.querySelector(".output-container");
    const resetButton = document.getElementById("resetButton");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const waktuKedatangan = document.getElementById("waktu_kedatangan").value;
        const waktuPelayanan = document.getElementById("waktu_pelayanan").value;

        try {
            const response = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
                body: new URLSearchParams({
                    waktu_kedatangan: waktuKedatangan,
                    waktu_pelayanan: waktuPelayanan,
                }),
            });

            const html = await response.text();
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");

            const error = doc.querySelector(".error");
            if (error) {
                resultContainer.style.display = "block";
                resultContainer.querySelector("h2").innerText = "Error:";
                resultContainer.querySelector("ul").innerHTML = `<li>${error.innerText}</li>`;
            } else {
                const results = doc.querySelector(".output-container ul").innerHTML;
                resultContainer.style.display = "block";
                resultContainer.querySelector("h2").innerText = "Hasil Perhitungan:";
                resultContainer.querySelector("ul").innerHTML = results;
                MathJax.typeset(); // Render ulang MathJax
            }
        } catch (error) {
            console.error(error);
            resultContainer.style.display = "block";
            resultContainer.querySelector("h2").innerText = "Error:";
            resultContainer.querySelector("ul").innerHTML = "<li>Terjadi kesalahan pada server.</li>";
        }
    });

    resetButton.addEventListener("click", () => {
        document.getElementById("waktu_kedatangan").value = "";
        document.getElementById("waktu_pelayanan").value = "";
        resultContainer.style.display = "none";
    });
});
