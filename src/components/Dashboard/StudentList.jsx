import StudentCard from "./StudentCard";

function StudentList({ students }) {
  if (students.length === 0) {
    return (
      <p className="rounded-2xl bg-slate-900 p-4 text-slate-300">
        No student progress data yet.
      </p>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
     {students.map((student) => (
  <StudentCard key={student.progressId} student={student} />
))}
    </div>
  );
}

export default StudentList;