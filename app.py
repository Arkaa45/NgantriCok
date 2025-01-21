from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            # Input dari pengguna
            waktu_kedatangan = float(request.form["waktu_kedatangan"])
            waktu_pelayanan = float(request.form["waktu_pelayanan"])

            # Perhitungan
            laju_kedatangan = 1 / waktu_kedatangan
            laju_pelayanan = 1 / waktu_pelayanan
            jumlah_pelayan = 2

            rho = laju_kedatangan / (jumlah_pelayan * laju_pelayanan)

            # Validasi kestabilan sistem
            if rho >= 1:
                return render_template("index.html", error="Sistem tidak stabil karena ρ ≥ 1.")

            w = 1 / (laju_pelayanan - (laju_kedatangan / jumlah_pelayan))
            wq = (laju_kedatangan**2) / (2 * laju_pelayanan * (laju_pelayanan - (laju_kedatangan / jumlah_pelayan)))

            return render_template(
                "index.html",
                laju_kedatangan=laju_kedatangan,
                laju_pelayanan=laju_pelayanan,
                rho=rho,
                w=w,
                wq=wq,
            )
        except ValueError:
            return render_template("index.html", error="Input tidak valid. Masukkan angka.")
    return render_template("index.html")


if __name__ == "__main__":
    app.run(debug=True)
