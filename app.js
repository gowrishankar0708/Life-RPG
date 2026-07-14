let game = loadGame();

// --- Daily Reset Logic ---
if (isNewDay(game.date)) {

    const previousDate = game.date;

    // Only save history & update streak if there WAS a previous day recorded
    if (previousDate) {
        // Save previous day's data to history
        const completedCount = game.completed.filter(done => done === true).length;
        game.history[previousDate] = {
            xp: game.todayXP,
            tasksCompleted: completedCount,
            totalTasks: tasks.length,
            streak: game.streak
        };

        // Update streak based on previous day's performance
        updateStreak(game);
    }

    // Reset for new day
    game.date = getToday();
    game.completed = new Array(tasks.length).fill(false);
    game.todayXP = 0;

    saveGame(game);
}

// --- Render everything ---
renderTasks();
updateXP();
renderUI();
renderHistory();