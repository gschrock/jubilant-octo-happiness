import { IStudent } from "../../types/student";

interface StudentCardProps {
  student: IStudent;
  onEdit: (student: IStudent) => void;
}

const StudentCard = ({ student, onEdit }: StudentCardProps) => {
  return (
    <div className="border p-4 rounded-md shadow-sm grid grid-cols-1 md:grid-cols-2 gap-2">
      <div>
        <p className="font-medium">{student.name}</p>
        <p className="text-sm">{student.email}</p>
        <p className="text-sm">Phone: {student.phone}</p>
        <p className="text-sm">Grad Year: {student.graduation_year}</p>
        <p className="text-sm">GPA: {student.gpa}</p>
        {(student.city || student.state) && (
          <p className="text-sm">
            Location: {[student.city, student.state].filter(Boolean).join(", ")}
          </p>
        )}
        {(student.latitude || student.longitude) && (
          <p className="text-sm text-gray-500">
            Coordinates: {student.latitude}, {student.longitude}
          </p>
        )}
      </div>
      <div className="flex justify-end gap-2">
        <button
          onClick={() => onEdit(student)}
          className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
        >
          Edit
        </button>
      </div>
    </div>
  );
};

export default StudentCard;
