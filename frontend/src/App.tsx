import { useState, useEffect } from "react";
import axios from "axios";
import { IStudent } from "./types/student";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [name, setName] = useState("");

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post("/api/students", { name });
      setName("");
      fetchStudents();
    } catch (error) {
      console.error("Error creating student:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
        >
          Add Student
        </button>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        <div className="grid gap-4">
          {students.map((student) => (
            <div key={student.id} className="border p-4 rounded-md shadow-sm">
              <p className="font-medium">{student.name}</p>
              <p className="text-sm text-gray-500">
                Created: {new Date(student.created_at).toLocaleDateString()}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
