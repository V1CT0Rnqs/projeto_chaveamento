document.addEventListener("DOMContentLoaded", () => {
    const advanceButton = document.getElementById("advance-button");
    const resultDisplay = document.getElementById("result");
    const champion = document.getElementById("champion");
    const startButton = document.getElementById("start-tournament");
    const teamForm = document.getElementById("team-form");

    let round = 1; // Controla a fase do torneio
    let teams = []; // Armazena os nomes dos times

    // Iniciar o torneio após adicionar os times
    startButton.addEventListener("click", () => {
        // Coleta os nomes dos times
        for (let i = 1; i <= 8; i++) {
            const teamInput = document.getElementById(`team${i}`);
            teams.push(teamInput.value || `Time ${i}`);
        }

        // Define os times nas Quartas de Final
        setMatch("qf1-team1", teams[0]);
        setMatch("qf1-team2", teams[1]);
        setMatch("qf2-team1", teams[2]);
        setMatch("qf2-team2", teams[3]);
        setMatch("qf3-team1", teams[4]);
        setMatch("qf3-team2", teams[5]);
        setMatch("qf4-team1", teams[6]);
        setMatch("qf4-team2", teams[7]);

        // Exibe a chave e o botão de avançar
        teamForm.classList.add("hidden");
        document.getElementById("quarter-finals").classList.remove("hidden");
        advanceButton.classList.remove("hidden");
    });

    advanceButton.addEventListener("click", () => {
        if (round === 1) {
            advanceRound("quarter-finals", "semi-finals", ["qf1-winner", "qf2-winner", "qf3-winner", "qf4-winner"], ["sf1-team1", "sf1-team2", "sf2-team1", "sf2-team2"]);
        } else if (round === 2) {
            advanceRound("semi-finals", "final", ["sf1-winner", "sf2-winner"], ["finalist1", "finalist2"]);
        } else if (round === 3) {
            declareWinner();
        }
        round++;
    });

    function setMatch(matchId, teamName) {
        document.getElementById(matchId).textContent = teamName;
    }

    function advanceRound(currentRoundId, nextRoundId, winnerIds, nextMatchIds) {
        const winners = winnerIds.map(id => document.getElementById(id).value);

        // Valida se todos os campos de vencedor foram preenchidos
        if (winners.some(winner => winner.trim() === "")) {
            alert("Preencha todos os vencedores antes de avançar!");
            return;
        }

        document.getElementById(currentRoundId).classList.add("hidden");
        document.getElementById(nextRoundId).classList.remove("hidden");

        // Define os vencedores para a próxima rodada
        nextMatchIds.forEach((matchId, index) => {
            setMatch(matchId, winners[index]);
        });
    }

    function declareWinner() {
        const finalWinner = document.getElementById("final-winner").value;

        // Valida se o campo de vencedor foi preenchido
        if (finalWinner.trim() === "") {
            alert("Preencha o vencedor final!");
            return;
        }

        document.getElementById("final").classList.add("hidden");
        resultDisplay.classList.remove("hidden");

        champion.textContent = finalWinner; // Exibe o vencedor final
        advanceButton.style.display = "none"; // Oculta o botão após a final
    }
});

