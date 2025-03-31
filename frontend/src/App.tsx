import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { IStudent, IStudentFormData } from "./types/student";
import { studentFormSchema } from "./validation/studentForm/studentFormSchema";
import StudentList from "./components/StudentList/StudentList";
import StudentForm from "./components/StudentForm/StudentForm";

axios.defaults.baseURL = "http://localhost:3000";

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [formData, setFormData] = useState<IStudentFormData>({
    name: "",
    email: "",
    phone: "",
    graduation_year: "",
    gpa: "",
    city: "",
    state: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [currentStudentId, setCurrentStudentId] = useState<number | null>(null);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const response = await axios.get<IStudent[]>("/api/students");
      setStudents(response.data);
    } catch (error) {
      console.error("Error fetching students:", error);
    }
  };

  const validateForm = (): boolean => {
    try {
      // Convert form data to proper types for Zod validation
      const dataToValidate = {
        ...formData,
        graduation_year: formData.graduation_year
          ? Number(formData.graduation_year)
          : undefined,
        gpa: formData.gpa ? Number(formData.gpa) : undefined,
      };

      studentFormSchema.parse(dataToValidate);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          if (err.path.length > 0) {
            newErrors[err.path[0]] = err.message;
          }
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      // Prepare data with proper types
      const submissionData = {
        ...formData,
        graduation_year: Number(formData.graduation_year),
        gpa: Number(formData.gpa),
      };

      if (isEditing && currentStudentId) {
        await axios.put(`/api/students/${currentStudentId}`, submissionData);
      } else {
        await axios.post<IStudent>("/api/students/", submissionData);
      }

      resetForm();
      fetchStudents();
    } catch (error) {
      console.error("Error saving student:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: "",
      email: "",
      phone: "",
      graduation_year: "",
      gpa: "",
      city: "",
      state: "",
    });
    setErrors({});
    setIsEditing(false);
    setCurrentStudentId(null);
  };

  const handleEdit = (student: IStudent) => {
    setFormData({
      name: student.name,
      email: student.email,
      phone: student.phone,
      graduation_year: student.graduation_year,
      gpa: student.gpa,
      city: student.city,
      state: student.state,
    });
    setIsEditing(true);
    setCurrentStudentId(student.id!);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Handle numeric fields
      const numericFields = ["graduation_year", "gpa"];
      if (numericFields.includes(name)) {
        return { ...prev, [name]: value === "" ? undefined : value };
      }
      return { ...prev, [name]: value };
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>

      <StudentForm
        formData={formData}
        errors={errors}
        isEditing={isEditing}
        onInputChange={handleInputChange}
        onSelectChange={handleSelectChange}
        onSubmit={handleSubmit}
        onReset={resetForm}
      />

      <h2 className="text-xl font-semibold mb-4">Student List</h2>
      <StudentList students={students} onEdit={handleEdit} />
    </div>
  );
}

export default App;
