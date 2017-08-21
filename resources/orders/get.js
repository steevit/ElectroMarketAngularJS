if (me === undefined || me.username != "admin") {
cancel("Brak autoryzacji", 401);
}