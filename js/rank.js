function getRank(level) {
    if (level >= 50) return "SSS";
    if (level >= 40) return "SS";
    if (level >= 30) return "S";
    if (level >= 20) return "A";
    if (level >= 15) return "B";
    if (level >= 10) return "C";
    if (level >= 5) return "D";
    return "E";
}
