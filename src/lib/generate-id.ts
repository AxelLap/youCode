function generateRandomId(length: number) {
  const chars = "0123456789azertyuiopqsdfghjklmwxcvbn";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += chars[Math.floor(Math.random() * chars.length)];
  }
  return result;
}

export default function generateCourseId() {
  return "cmcvis" + generateRandomId(22);
}
