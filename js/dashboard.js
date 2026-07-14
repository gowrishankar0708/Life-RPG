function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        const label = document.createElement("label");
        const checkbox = document.createElement("input");

        checkbox.type = "checkbox";
        checkbox.checked = game.completed[index] || false;

        // Apply completed style if already checked
        if (checkbox.checked) {
            label.classList.add("completed");
        }

        checkbox.addEventListener("change", () => {
            game.completed[index] = checkbox.checked;

            if (checkbox.checked) {
                label.classList.add("completed");
                // Reward animation
                label.classList.add("reward-anim");
                setTimeout(() => label.classList.remove("reward-anim"), 500);
            } else {
                label.classList.remove("completed");
            }

            saveGame(game);
            updateXP();
            renderUI();
        });

        label.appendChild(checkbox);
        label.append(` ${task.name} (+${task.xp} XP)`);
        taskList.appendChild(label);
    });
}

function renderUI() {
    // Level & Rank
    document.getElementById("level").textContent =
        `Level ${game.player.level}`;

    document.getElementById("rank").textContent =
        `Rank : ${game.player.rank}`;

    // XP Bar
    document.getElementById("xpText").textContent =
        `${game.player.xp % 100} / 100 XP`;

    document.querySelector(".xp-fill").style.width =
        (game.player.xp % 100) + "%";

    // Stats
    document.getElementById("health").textContent =
        game.player.stats.health + "%";

    document.getElementById("knowledge").textContent =
        game.player.stats.knowledge + "%";

    document.getElementById("strength").textContent =
        game.player.stats.strength + "%";

    document.getElementById("discipline").textContent =
        game.player.stats.discipline + "%";

    // Today's XP
    document.getElementById("todayXP").textContent =
        `⚡ Today's XP : ${game.todayXP}`;

    // Today's Date
    const today = new Date();
    const options = {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    };
    document.getElementById("todayDate").textContent =
        "📅 " + today.toLocaleDateString("en-IN", options);

    // Streak
    document.getElementById("streak").textContent =
        `🔥 ${game.streak} Day Streak`;

    // Best streak tooltip
    const streakEl = document.getElementById("streak");
    streakEl.title = `Best Streak: ${game.bestStreak} days`;
}

function renderHistory() {
    const container = document.getElementById("historyList");
    if (!container) return;

    container.innerHTML = "";

    const dates = Object.keys(game.history).sort().reverse();

    if (dates.length === 0) {
        container.innerHTML = `<p class="history-empty">No history yet — complete your first day!</p>`;
        return;
    }

    // Show last 7 days
    const recentDates = dates.slice(0, 7);

    recentDates.forEach(dateStr => {
        const entry = game.history[dateStr];

        // Format the date nicely
        const dateObj = new Date(dateStr + "T00:00:00");
        const options = { weekday: "short", day: "numeric", month: "short" };
        const formattedDate = dateObj.toLocaleDateString("en-IN", options);

        const card = document.createElement("div");
        card.className = "history-card";

        const allDone = entry.tasksCompleted === entry.totalTasks;
        const ratio = entry.totalTasks > 0
            ? Math.round((entry.tasksCompleted / entry.totalTasks) * 100)
            : 0;

        card.innerHTML = `
            <div class="history-date">${formattedDate}</div>
            <div class="history-details">
                <span class="history-xp">⚡ ${entry.xp} XP</span>
                <span class="history-tasks">${allDone ? "✅" : "📋"} ${entry.tasksCompleted}/${entry.totalTasks} quests</span>
                <span class="history-percent">${ratio}%</span>
            </div>
            <div class="history-bar">
                <div class="history-bar-fill" style="width:${ratio}%"></div>
            </div>
        `;

        container.appendChild(card);
    });
}