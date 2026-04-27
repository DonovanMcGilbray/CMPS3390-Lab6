import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StudentContext } from '../context/StudentContext';
import { getStanding, hasHold } from '../utils/logic';

export default function AnalyticsScreen() {
  const { students } = useContext(StudentContext);
  const cleanStudents = students.map(s => ({
    ...s,
    gpa: Number(s.gpa) || 0,
    units: Number(s.units) || 0,
    unpaidDues: Number(s.unpaidDues) || 0,
    major: s.major || 'Unknown'
  }));
  const total = cleanStudents.length;
  const avgGpa =
    total === 0
      ? 0
      : (
          cleanStudents.reduce((sum, s) => sum + s.gpa, 0) / total
        ).toFixed(2);
  const highest =
    cleanStudents.length === 0
      ? null
      : cleanStudents.reduce((prev, curr) =>
          curr.gpa > prev.gpa ? curr : prev
        );
  const standingCounts = cleanStudents.reduce((acc, s) => {
    const standing = getStanding(s.gpa);
    acc[standing] = (acc[standing] || 0) + 1;
    return acc;
  }, {});
  const holdCount = cleanStudents.filter(s => hasHold(s)).length;
  const byMajor = cleanStudents.reduce((acc, s) => {
    acc[s.major] = (acc[s.major] || 0) + 1;
    return acc;
  }, {});
  return (
    <View style={styles.container}>
      <Text>Total Students: {total}</Text>
      <Text>Average GPA: {avgGpa}</Text>
      <Text>Top Student: {highest ? highest.name : 'N/A'}</Text>
      <Text>Students with Holds: {holdCount}</Text>
      <Text style={styles.section}>Standing Distribution:</Text>
      {Object.entries(standingCounts).map(([key, value]) => (
        <Text key={key}>
          {key}: {value}
        </Text>
      ))}
      <Text style={styles.section}>By Major:</Text>
      {Object.entries(byMajor).map(([key, value]) => (
        <Text key={key}>
          {key}: {value}
        </Text>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10
  },
  section: {
    marginTop: 10,
    fontWeight: 'bold'
  }
});