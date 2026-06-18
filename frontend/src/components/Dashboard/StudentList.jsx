import StudentCard from "./StudentCard";

function StudentList({ students, onViewAnalytics, onViewChat }) {
  
  // SAFETY CHECK: If students is undefined, null, or empty, render the empty state gracefully
  if (!students || !Array.isArray(students) || students.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-white/5 bg-[#2a2f42]/30">
        <p className="text-slate-400">No student progress data yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
      {students.map((student) => (
        <StudentCard 
          key={student.progressId || student._id || Math.random()} 
          student={student} 
          onViewAnalytics={onViewAnalytics} 
          onViewChat={onViewChat}
        />
      ))}
    </div>
  );
}

export default StudentList;