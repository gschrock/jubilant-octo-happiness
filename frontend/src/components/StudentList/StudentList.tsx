import { IStudent } from "../../types/student";
import StudentCard from "../common/StudentCard";

interface StudentListProps {
  students: IStudent[];
  onEdit: (student: IStudent) => void;
}

const StudentList = ({ students, onEdit }: StudentListProps) => {
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
