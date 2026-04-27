import React, { useState, useContext, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';

import { StudentContext } from '../context/StudentContext';
import InputField from '../components/InputField';
import { validateStudent } from '../utils/validation';

export default function AddEditScreen({ route, navigation }) {
  const { students, addStudent, updateStudent } = useContext(StudentContext);
  const editingStudent = route?.params?.student;
  const [student, setStudent] = useState({
    id: '',
    name: '',
    age: '',
    gpa: '',
    major: '',
    units: '',
    gradYear: '',
    unpaidDues: ''
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    if (editingStudent) {
      setStudent({
        id: editingStudent.id || '',
        name: editingStudent.name || '',
        age: String(editingStudent.age ?? ''),
        gpa: String(editingStudent.gpa ?? ''),
        major: editingStudent.major || '',
        units: String(editingStudent.units ?? ''),
        gradYear: String(editingStudent.gradYear ?? ''),
        unpaidDues: String(editingStudent.unpaidDues ?? '')
      });
    }
  }, [editingStudent]);
  const handleChange = (field, value) => {
    setStudent({ ...student, [field]: value });
  };
  const handleSubmit = () => {
    const formatted = {
      ...student,
      id: student.id.trim(),
      age: Number(student.age) || 0,
      gpa: Number(student.gpa) || 0,
      units: Number(student.units) || 0,
      gradYear: Number(student.gradYear) || 0,
      unpaidDues: Number(student.unpaidDues) || 0
    };
    const validationErrors = validateStudent(formatted, students);
    if (
      editingStudent &&
      formatted.id === editingStudent.id &&
      validationErrors.id
    ) {
      delete validationErrors.id;
    }
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (editingStudent) {
      updateStudent(formatted);
    } else {
      addStudent(formatted);
    }
    setStudent({
      id: '',
      name: '',
      age: '',
      gpa: '',
      major: '',
      units: '',
      gradYear: '',
      unpaidDues: ''
    });
    setErrors({});
    navigation?.navigate('Students');
  };
  return (
    <View style={styles.container}>
      <InputField
        placeholder="ID"
        value={student.id}
        onChangeText={v => handleChange('id', v)}
        error={errors.id}
      />
      <InputField
        placeholder="Name"
        value={student.name}
        onChangeText={v => handleChange('name', v)}
      />
      <InputField
        placeholder="Age"
        value={student.age}
        onChangeText={v => handleChange('age', v)}
        error={errors.age}
      />
      <InputField
        placeholder="GPA"
        value={student.gpa}
        onChangeText={v => handleChange('gpa', v)}
        error={errors.gpa}
      />
      <InputField
        placeholder="Major"
        value={student.major}
        onChangeText={v => handleChange('major', v)}
      />
      <InputField
        placeholder="Units"
        value={student.units}
        onChangeText={v => handleChange('units', v)}
        error={errors.units}
      />
      <InputField
        placeholder="Grad Year"
        value={student.gradYear}
        onChangeText={v => handleChange('gradYear', v)}
        error={errors.gradYear}
      />
      <InputField
        placeholder="Unpaid Dues"
        value={student.unpaidDues}
        onChangeText={v => handleChange('unpaidDues', v)}
      />
      <Button
        title={editingStudent ? "Update Student" : "Add Student"}
        onPress={handleSubmit}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  }
});