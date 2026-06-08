import StudentCard from "./StudentCard";

function StudentList({ students }) {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
      {students.map((student) => (
        <StudentCard key={student.name} student={student} />
      ))}
    </div>
  );
}

export default StudentList;