import { useState, useMemo } from "react";
import { IStudent } from "../../types/student";
import StudentCard from "../common/StudentCard";

interface StudentListProps {
  students: IStudent[];
  isLoading: boolean;
  onEdit: (student: IStudent) => void;
}

const StudentList = ({ students, isLoading, onEdit }: StudentListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<{
    key: "name";
    direction: "asc" | "desc";
  } | null>(null);

  const processedStudents = useMemo(() => {
    let result = [...students];

    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (student) =>
          student.name.toLowerCase().includes(term) ||
          student.email.toLowerCase().includes(term)
      );
    }

    if (sortConfig !== null) {
      result.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }

    return result;
  }, [students, searchTerm, sortConfig]);

  const toggleSort = () => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: "name", direction });
  };

  if (isLoading && !students.length) {
    return <p>Loading students...</p>;
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <input
          type="text"
          placeholder="Search by name or email..."
          className="w-full p-2 border rounded"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-2 top-2 text-gray-500"
          >
            ✕
          </button>
        )}
      </div>

      <button
        onClick={toggleSort}
        className="px-3 py-1 bg-gray-100 rounded text-sm"
      >
        Sort by Name {sortConfig?.direction === "asc" ? "↑" : "↓"}
      </button>

      {processedStudents.length === 0 ? (
        <p className="text-gray-500">No matching students found</p>
      ) : (
        <div className="grid gap-4">
          {processedStudents.map((student) => (
            <StudentCard key={student.id} student={student} onEdit={onEdit} />
          ))}
        </div>
      )}
    </div>
  );
};

export default StudentList;
