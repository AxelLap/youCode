interface Enrollment {
  userId: string;
  id: string;
  createdAt: Date;
  courseId: string;
  canceledAt: Date | null;
}

interface ChartPoint {
  date: string; // format "MM-DD"
  count: number;
}

/**
 * Retourne un tableau des 30 derniers jours avec le nombre d'inscriptions par jour
 */
export function getLast30DaysStats(data: Enrollment[]): ChartPoint[] {
  const now = new Date();
  const startDate = new Date();
  startDate.setDate(now.getDate() - 29); // Inclut aujourd’hui

  // Crée une map date (YYYY-MM-DD) -> count
  const countsByDate = new Map<string, number>();

  for (const item of data) {
    const created = new Date(item.createdAt);
    if (created >= startDate && created <= now) {
      const key = created.toISOString().split("T")[0]; // format YYYY-MM-DD
      countsByDate.set(key, (countsByDate.get(key) ?? 0) + 1);
    }
  }

  // Génère les 30 derniers jours (même ceux sans données)
  const result: ChartPoint[] = [];
  for (let i = 0; i < 30; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    const key = date.toISOString().split("T")[0];

    // Affichage simplifié "MM-DD"
    const label = `${String(date.getMonth() + 1).padStart(2, "0")}-${String(
      date.getDate()
    ).padStart(2, "0")}`;

    result.push({
      date: label,
      count: countsByDate.get(key) ?? 0,
    });
  }

  return result;
}
