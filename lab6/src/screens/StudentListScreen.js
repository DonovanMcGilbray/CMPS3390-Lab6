import React, { useContext, useState, useMemo } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  Button,
  StyleSheet
} from 'react-native';
import { StudentContext } from '../context/StudentContext';
import StudentCard from '../components/StudentCard';

export default function StudentListScreen() {
  const { students, deleteStudent } = useContext(StudentContext);
  const [search, setSearch] = useState('');
  const [sortOption, setSortOption] = useState('gpa');
  const [filterMajor, setFilterMajor] = useState('');
  const processedStudents = useMemo(() => {
    let data = [...students];
    data = data.filter(s =>
      s.name.toLowerCase().includes(search.toLowerCase())
    );
    if (filterMajor) {
      data = data.filter(s => s.major === filterMajor);
    }
    if (sortOption === 'gpa') {
      data.sort((a, b) => b.gpa - a.gpa);
    } else if (sortOption === 'name') {
      data.sort((a, b) => a.name.localeCompare(b.name));
    }
    return data;
  }, [students, search, sortOption, filterMajor]);
  const renderItem = ({ item }) => (
    <StudentCard student={item} onDelete={deleteStudent} />
  );
  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Search by name..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
      />
      <TextInput
        placeholder="Filter by major (e.g. CS)"
        value={filterMajor}
        onChangeText={setFilterMajor}
        style={styles.input}
      />
      <View style={styles.sortContainer}>
        <Button title="Sort by GPA" onPress={() => setSortOption('gpa')} />
        <Button title="Sort by Name" onPress={() => setSortOption('name')} />
      </View>
      <FlatList
        data={processedStudents}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={<Text>No students found</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  input: {
    borderWidth: 1,
    padding: 8,
    marginBottom: 10,
    borderRadius: 5
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  }
});