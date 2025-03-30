import { useState, useEffect } from "react";
import axios from "axios";
import { IStudent, IStudentFormData } from "./types/student";

axios.defaults.baseURL = "http://localhost:3000";

/**
 * @todo
 * move validation functions to a utils,
 * use validation library and standardize UX more
 */
const validateEmail = (email: string) =>
  /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
const validatePhone = (phone: string) => /^\d{10}$/.test(phone);
const validateGPA = (gpa: number) => gpa >= 0 && gpa <= 4.0;
const validateYear = (year: number) => {
  const currentYear = new Date().getFullYear();
  return year >= currentYear && year <= currentYear + 5;
};

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [formData, setFormData] = useState<IStudentFormData>({
    name: "",
    email: "",
    phone: "",
    graduation_year: undefined,
    gpa: undefined,
    city: "",
    state: "",
    latitude: undefined,
    longitude: undefined,
    /**
     * Mock data
     */
    // name: "Test name",
    // email: "test@mock.com",
    // phone: "9999999999",
    // graduation_year: 2026,
    // gpa: 3.6,
    // city: "Place",
    // state: "ID",
    // latitude: 90,
    // longitude: 180,
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
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!formData.phone.trim()) {
      newErrors.phone = "Phone is required";
    } else if (!validatePhone(formData.phone)) {
      newErrors.phone = "Phone must be 10 digits";
    }
    if (!formData.graduation_year || !validateYear(formData.graduation_year)) {
      newErrors.graduation_year = "Invalid graduation year";
    }
    if (!formData.gpa || !validateGPA(formData.gpa)) {
      newErrors.gpa = "GPA must be between 0 and 4.0";
    }
    /**
     * @todo
     * include more robust validation for:
     * city, state, lat, long
     */

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      if (isEditing && currentStudentId) {
        await axios.put(`/api/students/${currentStudentId}`, formData);
      } else {
        await axios.post<IStudent>("/api/students", formData);
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
      graduation_year: undefined,
      gpa: undefined,
      city: "",
      state: "",
      latitude: undefined,
      longitude: undefined,
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
      latitude: student.latitude,
      longitude: student.longitude,
    });
    setIsEditing(true);
    setCurrentStudentId(student.id!);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      // Convert strings to numbers for numeric value fields
      const numericFields = ["graduation_year", "gpa", "latitude", "longitude"];
      if (numericFields.includes(name)) {
        return { ...prev, [name]: value === "" ? 0 : Number(value) };
      }
      return { ...prev, [name]: value };
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Student Management System</h1>

      <form
        onSubmit={handleSubmit}
        className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
      >
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Student Name*
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md ${
              errors.name ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.name && (
            <p className="mt-1 text-sm text-red-600">{errors.name}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700"
          >
            Email Address*
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-600">{errors.email}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700"
          >
            Phone Number* (10 digits)
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleInputChange}
            pattern="[0-9]{10}"
            className={`mt-1 block w-full rounded-md ${
              errors.phone ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.phone && (
            <p className="mt-1 text-sm text-red-600">{errors.phone}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="graduation_year"
            className="block text-sm font-medium text-gray-700"
          >
            Graduation Year*
          </label>
          <input
            type="number"
            id="graduation_year"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleInputChange}
            min={new Date().getFullYear()}
            max={new Date().getFullYear() + 5}
            className={`mt-1 block w-full rounded-md ${
              errors.graduation_year ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.graduation_year && (
            <p className="mt-1 text-sm text-red-600">
              {errors.graduation_year}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="gpa"
            className="block text-sm font-medium text-gray-700"
          >
            GPA (0.0 - 4.0)
          </label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={formData.gpa}
            onChange={handleInputChange}
            step="0.1"
            min="0"
            max="4.0"
            className={`mt-1 block w-full rounded-md ${
              errors.gpa ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.gpa && (
            <p className="mt-1 text-sm text-red-600">{errors.gpa}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="city"
            className="block text-sm font-medium text-gray-700"
          >
            City
          </label>
          <input
            type="text"
            id="city"
            name="city"
            value={formData.city}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md ${
              errors.city ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.city && (
            <p className="mt-1 text-sm text-red-600">{errors.city}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="state"
            className="block text-sm font-medium text-gray-700"
          >
            State
          </label>
          <input
            type="text"
            id="state"
            name="state"
            value={formData.state}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md ${
              errors.state ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="latitude"
            className="block text-sm font-medium text-gray-700"
          >
            Latitude
          </label>
          <input
            type="number"
            id="latitude"
            name="latitude"
            value={formData.latitude}
            onChange={handleInputChange}
            step="0.000001"
            className={`mt-1 block w-full rounded-md ${
              errors.latitude ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.latitude && (
            <p className="mt-1 text-sm text-red-600">{errors.latitude}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="longitude"
            className="block text-sm font-medium text-gray-700"
          >
            Longitude
          </label>
          <input
            type="number"
            id="longitude"
            name="longitude"
            value={formData.longitude}
            onChange={handleInputChange}
            step="0.000001"
            className={`mt-1 block w-full rounded-md ${
              errors.longitude ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
            required
          />
          {errors.longitude && (
            <p className="mt-1 text-sm text-red-600">{errors.longitude}</p>
          )}
        </div>

        <div className="md:col-span-2 flex gap-2">
          <button
            type="submit"
            className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
          >
            {isEditing ? "Update Student" : "Add Student"}
          </button>
          {isEditing && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      <div>
        <h2 className="text-xl font-semibold mb-4">Student List</h2>
        {students.length === 0 ? (
          <p className="text-gray-500">No students found</p>
        ) : (
          <div className="grid gap-4">
            {students.map((student) => (
              <div
                key={student.id}
                className="border p-4 rounded-md shadow-sm grid grid-cols-1 md:grid-cols-2 gap-2"
              >
                <div>
                  <p className="font-medium">{student.name}</p>
                  <p className="text-sm">{student.email}</p>
                  <p className="text-sm">Phone: {student.phone}</p>
                  <p className="text-sm">
                    Grad Year: {student.graduation_year}
                  </p>
                  <p className="text-sm">GPA: {student.gpa}</p>
                  {(student.city || student.state) && (
                    <p className="text-sm">
                      Location:{" "}
                      {[student.city, student.state].filter(Boolean).join(", ")}
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
                    onClick={() => handleEdit(student)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600 text-sm"
                  >
                    Edit
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
