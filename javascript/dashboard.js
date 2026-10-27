/* Dashboard: berekent behaalde EC en werkt de voortgangsweergave bij. */
document.addEventListener("DOMContentLoaded", () => {
  const tableBody = document.querySelector(".dashboard-vakken .tabel tbody");
  const earnedCredits = document.getElementById("behaalde-ec");
  const adviceCredits = document.getElementById("advies-ec");
  const progressFill = document.getElementById("voortgang-vulling");
  const progressText = document.getElementById("voortgang-tekst");
  const progressBar = document.getElementById("voortgang-balk");
  const totalCredits = 60;
  const passMark = 5.5;

  // Stop quietly on pages that do not contain the dashboard.
  if (!tableBody || !earnedCredits || !adviceCredits || !progressFill || !progressText || !progressBar) return;

  function getValidGrade(row) {
    const gradeCell = row.querySelector(".cijfer");
    if (!gradeCell) return null;
    const rawGrade = gradeCell.textContent.trim().replace(",", ".");
    if (!rawGrade || rawGrade === "-") return null;
    const grade = Number(rawGrade);
    return Number.isFinite(grade) && grade >= 1 && grade <= 10 ? grade : null;
  }

  function updateDashboard() {
    let creditsEarned = 0;

    tableBody.querySelectorAll("tr").forEach((row) => {
      const grade = getValidGrade(row);
      const credits = Number(row.dataset.ec);
      row.classList.remove("gehaald", "gefaald");
      if (grade === null) return;

      if (grade >= passMark) {
        row.classList.add("gehaald");
        creditsEarned += Number.isFinite(credits) && credits > 0 ? credits : 0;
      } else {
        row.classList.add("gefaald");
      }
    });

    const progress = Math.min((creditsEarned / totalCredits) * 100, 100);
    earnedCredits.textContent = String(creditsEarned);
    adviceCredits.textContent = String(creditsEarned);
    progressFill.style.width = `${progress}%`;
    progressText.textContent = `${Math.round(progress)}% van de ${totalCredits} EC behaald`;
    progressBar.setAttribute("aria-valuenow", String(Math.min(creditsEarned, totalCredits)));
  }

  updateDashboard();
});
