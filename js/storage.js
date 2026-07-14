function saveGame(data) {
    localStorage.setItem("lifeRPG", JSON.stringify(data));
}

function loadGame() {
    const saved = localStorage.getItem("lifeRPG");

    if (saved) {
        const data = JSON.parse(saved);

        // Ensure all expected properties exist (migration safety)
        if (!data.player) data.player = { name: "Gowri Shankar", level: 1, xp: 0, rank: "E", stats: { health: 0, knowledge: 0, strength: 0, discipline: 0 } };
        if (!data.player.stats) data.player.stats = { health: 0, knowledge: 0, strength: 0, discipline: 0 };
        if (data.streak === undefined) data.streak = 0;
        if (data.bestStreak === undefined) data.bestStreak = 0;
        if (!data.completed) data.completed = [];
        if (!data.history) data.history = {};
        if (!data.achievements) data.achievements = [];
        if (data.todayXP === undefined) data.todayXP = 0;
        if (!data.date) data.date = "";

        return data;
    }

    return {
        player: {
            name: "Gowri Shankar",
            level: 1,
            xp: 0,
            rank: "E",
            stats: {
                health: 0,
                knowledge: 0,
                strength: 0,
                discipline: 0
            }
        },
        streak: 0,
        bestStreak: 0,
        completed: [],
        history: {},
        achievements: [],
        todayXP: 0,
        date: ""
    };
}
