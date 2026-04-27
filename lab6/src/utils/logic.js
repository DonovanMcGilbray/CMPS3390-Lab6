export function getStanding(gpa) {
  const num = Number(gpa) || 0;
  if (num >= 3) return "Good";
  if (num >= 2) return "Probation";
  return "At Risk";
}

export function getLoad(units) {
  const num = Number(units) || 0;
  return num >= 12 ? "Full-time" : "Part-time";
}

export function hasHold(student) {
  const dues = Number(student.unpaidDues) || 0;
  return dues > 0 || getStanding(student.gpa) === "At Risk";
}

export function getRisk(student) {
  const gpa = Number(student.gpa) || 0;
  const dues = Number(student.unpaidDues) || 0;
  if (gpa < 2 || dues > 500) return "High";
  return "Low";
}