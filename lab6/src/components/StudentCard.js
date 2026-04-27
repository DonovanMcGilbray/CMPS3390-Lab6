import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { getStanding, getLoad, hasHold, getRisk } from '../utils/logic';

export default function StudentCard({ student, onDelete }) {
  const standing = getStanding(student.gpa);
  const load = getLoad(student.units);
  const hold = hasHold(student);
  const risk = getRisk(student);
  return (
    <View style={styles.card}>
      <Text style={styles.name}>{student.name}</Text>
      <Text>ID: {student.id}</Text>
      <Text>GPA: {student.gpa}</Text>
      <Text>Major: {student.major}</Text>
      <Text>Standing: {standing}</Text>
      <Text>Load: {load}</Text>
      <Text>Risk: {risk}</Text>
      <Text>Hold: {hold ? 'YES' : 'NO'}</Text>
      <Button title="Delete" onPress={() => onDelete(student.id)} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: 10,
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10
  },
  name: {
    fontWeight: 'bold',
    fontSize: 16
  }
});