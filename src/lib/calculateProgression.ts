export function calculateProgression({
  completedLessons,
  totalLessons,
}: {
  completedLessons: number;
  totalLessons: number;
}) {
  if (!totalLessons || totalLessons === 0) {
    return 0; // évite la division par zéro
  }

  const percentage = (completedLessons / totalLessons) * 100;

  // On peut arrondir à 2 décimales si tu veux
  return Math.round(percentage);
}
