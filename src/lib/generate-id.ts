function generateRandomId(length: number) {
  const chars = "0123456789azertyuiopqsdfghjklmwxcvbn";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export function generateCourseId() {
  return "crid" + generateRandomId(22);
}

export function generateLessonId() {
  return "lrid" + generateRandomId(22);
}
