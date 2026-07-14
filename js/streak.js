function getToday() {
    return new Date().toISOString().split("T")[0];
}

function isNewDay(savedDate) {
    return savedDate !== getToday();
}

/**
 * Updates the streak based on whether the previous day had completed tasks.
 * Call this BEFORE resetting completed[] for the new day.
 * @param {object} game - The game state object
 */
function updateStreak(game) {
    // Check if any task was completed on the previous day
    const hadCompletedTasks = game.completed &&
        game.completed.some(done => done === true);

    if (hadCompletedTasks) {
        game.streak += 1;
    } else {
        game.streak = 0;
    }

    // Track best streak
    if (game.streak > game.bestStreak) {
        game.bestStreak = game.streak;
    }
}