function updateXP() {
    const checkboxes = document.querySelectorAll("input[type='checkbox']");

    let xp = 0;
    let health = 0;
    let knowledge = 0;
    let strength = 0;
    let discipline = 0;

    checkboxes.forEach((box, index) => {
        if (box.checked) {
            xp += tasks[index].xp;
            health += tasks[index].health;
            knowledge += tasks[index].knowledge;
            strength += tasks[index].strength;
            discipline += tasks[index].discipline;
        }
    });

    const level = Math.floor(xp / 100) + 1;
    const rank = getRank(level);

    // Update game state
    game.player.xp = xp;
    game.player.level = level;
    game.player.rank = rank;
    game.player.stats.health = health;
    game.player.stats.knowledge = knowledge;
    game.player.stats.strength = strength;
    game.player.stats.discipline = discipline;
    game.todayXP = xp;

    saveGame(game);
}