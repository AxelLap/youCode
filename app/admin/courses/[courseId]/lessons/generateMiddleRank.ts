export function generateMiddleRank(up?: string, down?: string): string {
  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  // const base = alphabet.length;

  // Cas: pas d’up (ajout en tout début)
  if (!up) {
    if (!down) return "m"; // liste vide
    return down[0] > "a" ? "a" : "a" + down;
  }

  // Cas: pas de down (ajout en fin)
  if (!down) {
    return up + "m"; // on rajoute une marge à la fin
  }

  let i = 0;
  while (true) {
    const upChar = up[i] || "a";
    const downChar = down[i] || "z";

    if (upChar === downChar) {
      i++;
      continue;
    }

    const upIndex = alphabet.indexOf(upChar);
    const downIndex = alphabet.indexOf(downChar);

    // Si on a un espace entre les deux
    if (downIndex - upIndex > 1) {
      const midIndex = Math.floor((upIndex + downIndex) / 2);
      return up.slice(0, i) + alphabet[midIndex];
    }

    // Sinon, on doit “descendre” d’un niveau
    return up.slice(0, i + 1) + "m";
  }
}
