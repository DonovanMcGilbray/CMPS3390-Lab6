import React, { createContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const StudentContext = createContext();

export function StudentProvider({ children }) {
  const [students, setStudents] = useState([]);
  useEffect(() => {
    loadStudents();
  }, []);
  useEffect(() => {
    AsyncStorage.setItem('students', JSON.stringify(students));
  }, [students]);
  const loadStudents = async () => {
    const data = await AsyncStorage.getItem('students');
    if (data) {
      const parsed = JSON.parse(data);
      const cleaned = parsed.map(s => ({
        ...s,
        age: Number(s.age) || 0,
        gpa: Number(s.gpa) || 0,
        units: Number(s.units) || 0,
        gradYear: Number(s.gradYear) || 0,
        unpaidDues: Number(s.unpaidDues) || 0
      }));

      setStudents(cleaned);
    }
  };
  const cleanStudent = (student) => ({
    ...student,
    age: Number(student.age) || 0,
    gpa: Number(student.gpa) || 0,
    units: Number(student.units) || 0,
    gradYear: Number(student.gradYear) || 0,
    unpaidDues: Number(student.unpaidDues) || 0
  });
  const addStudent = (student) => {
    setStudents([...students, cleanStudent(student)]);
  };
  const updateStudent = (updated) => {
    setStudents(
      students.map(s =>
        s.id === updated.id ? cleanStudent(updated) : s
      )
    );
  };
  const deleteStudent = (id) => {
    setStudents(students.filter(s => s.id !== id));
  };
  return (
    <StudentContext.Provider
      value={{
        students,
        addStudent,
        updateStudent,
        deleteStudent
      }}
    >
      {children}
    </StudentContext.Provider>
  );
}