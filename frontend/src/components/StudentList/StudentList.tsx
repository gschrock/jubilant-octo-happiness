import { IStudent } from "../../types/student";
import StudentCard from "../common/StudentCard";

interface StudentListProps {
  students: IStudent[];
  isLoading: boolean;
  onEdit: (student: IStudent) => void;
}

const StudentList = ({ students, isLoading, onEdit }: StudentListProps) => {
  if (isLoading && !students.length) {
    return <p>Loading students...</p>;
  }

  if (students.length === 0) {
    return <p className="text-gray-500">No students found</p>;
  }

  return (
    <div className="grid gap-4">
      {students.map((student) => (
        <StudentCard key={student.id} student={student} onEdit={onEdit} />
      ))}
    </div>
  );
};

export default StudentList;
