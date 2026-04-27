Lab 6

Overview
This is a React Native app that manages student records. It allows users to add, edit, delete, and view students. It also calculates extra information like academic standing, risk level, enrollment load, and registration holds. The app includes an analytics screen that shows summary information about all students.

Features
- Add new students
- Edit existing students
- Delete students
- View a list of all students
- Search and filter students
- Sort students by name or GPA
- Automatic calculations:
  - Academic standing
  - Enrollment load
  - Risk level
  - Registration hold
- Analytics screen showing:
  - Total number of students
  - Average GPA
  - Top student
  - Number of students with holds
  - Breakdown by major and standing

Installation
1. Install dependencies:
npm install

2. Install required Expo packages:
npx expo install react-native-gesture-handler react-native-reanimated react-native-screens react-native-safe-area-context

3. Install navigation and storage:
npm install @react-navigation/native @react-navigation/bottom-tabs
npm install @react-native-async-storage/async-storage

To run the App:
npx expo start

Then scan the QR code using Expo Go or run it in an emulator.

How to Use
- Open the Students tab to see all students
- Use Add/Edit to create or update a student
- Use Delete to remove a student
- Open Analytics to see summary information

Logic Explanation
All calculations like standing, risk, and holds are done in one file (utils/logic.js). This keeps the logic consistent in all screens. Student data is stored in context so all screens use the same data. Any update to a student is shown everywhere in the app automatically.
