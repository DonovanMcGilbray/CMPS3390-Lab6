export function validateStudent(student, students) {
  let errors = {};
  if (student.gpa < 0 || student.gpa > 4)
    errors.gpa = "Invalid GPA";
  if (student.age < 16 || student.age > 100)
    errors.age = "Invalid age";
  if (students.some(s => s.id === student.id))
    errors.id = "ID must be unique";
  if (student.units < 0 || student.units > 25)
    errors.units = "Invalid units";
  if (student.gradYear < 2020 || student.gradYear > 2100)
    errors.gradYear = "Invalid year";
  return errors;
}