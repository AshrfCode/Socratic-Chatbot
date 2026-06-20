import StudentCard from "./StudentCard";

function StudentList({ students, onViewAnalytics, onViewChat }) {
  
  if (!students || !Array.isArray(students) || students.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-2xl border border-slate-200 bg-slate-50 dark:border-white/5 dark:bg-[#2a2f42]/30">
        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No student progress data yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-6 md:grid-cols-2 lg:grid-cols-3">
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