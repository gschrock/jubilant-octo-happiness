import { useState, useEffect } from "react";
import axios from "axios";
import { z } from "zod";
import { IStudent, IStudentFormData } from "./types/student";

axios.defaults.baseURL = "http://localhost:3000";

const US_STATES = [
  { code: "AL", name: "Alabama" },
  { code: "AK", name: "Alaska" },
  { code: "AZ", name: "Arizona" },
  { code: "AR", name: "Arkansas" },
  { code: "CA", name: "California" },
  { code: "CO", name: "Colorado" },
  { code: "CT", name: "Connecticut" },
  { code: "DE", name: "Delaware" },
  { code: "FL", name: "Florida" },
  { code: "GA", name: "Georgia" },
  { code: "HI", name: "Hawaii" },
  { code: "ID", name: "Idaho" },
  { code: "IL", name: "Illinois" },
  { code: "IN", name: "Indiana" },
  { code: "IA", name: "Iowa" },
  { code: "KS", name: "Kansas" },
  { code: "KY", name: "Kentucky" },
  { code: "LA", name: "Louisiana" },
  { code: "ME", name: "Maine" },
  { code: "MD", name: "Maryland" },
  { code: "MA", name: "Massachusetts" },
  { code: "MI", name: "Michigan" },
  { code: "MN", name: "Minnesota" },
  { code: "MS", name: "Mississippi" },
  { code: "MO", name: "Missouri" },
  { code: "MT", name: "Montana" },
  { code: "NE", name: "Nebraska" },
  { code: "NV", name: "Nevada" },
  { code: "NH", name: "New Hampshire" },
  { code: "NJ", name: "New Jersey" },
  { code: "NM", name: "New Mexico" },
  { code: "NY", name: "New York" },
  { code: "NC", name: "North Carolina" },
  { code: "ND", name: "North Dakota" },
  { code: "OH", name: "Ohio" },
  { code: "OK", name: "Oklahoma" },
  { code: "OR", name: "Oregon" },
  { code: "PA", name: "Pennsylvania" },
  { code: "RI", name: "Rhode Island" },
  { code: "SC", name: "South Carolina" },
  { code: "SD", name: "South Dakota" },
  { code: "TN", name: "Tennessee" },
  { code: "TX", name: "Texas" },
  { code: "UT", name: "Utah" },
  { code: "VT", name: "Vermont" },
  { code: "VA", name: "Virginia" },
  { code: "WA", name: "Washington" },
  { code: "WV", name: "West Virginia" },
  { code: "WI", name: "Wisconsin" },
  { code: "WY", name: "Wyoming" },
];

const studentFormSchema = z.object({
  name: z.string().min(1, "Required"),
  email: z.string().email("Invalid email format").min(1, "Required"),
  phone: z
    .string()
    .min(1, "Phone is required")
    .regex(
      /^[\d\s().-]+$/,
      "Phone must contain only numbers and valid phone characters"
    )
    /**
     * @note
     * Yes, would be good to align on those formats and validate for them.
     * Keeping loose for now.
     */
    .min(10, "Phone must be in a valid format"),
  graduation_year: z
    .number()
    .int("Must be a whole number")
    .min(new Date().getFullYear(), "Year cannot be in the past")
    .max(
      new Date().getFullYear() + 5,
      "Year cannot be more than 5 years in the future"
    ),
  gpa: z
    .number()
    .min(0, "GPA cannot be negative")
    .max(4.0, "GPA cannot exceed 4.0"),
  city: z.string().min(1, "Required"),
  state: z.string().min(1, "Required"),
});

function App() {
  const [students, setStudents] = useState<IStudent[]>([]);
  const [formData, setFormData] = useState<IStudentFormData>({
    // name: "",
    // email: "",
    // phone: "",
    // graduation_year: undefined,
    // gpa: undefined,
    // city: "",
    // state: "",
    // latitude: undefined,
    // longitude: undefined,
    /**
     * Mock data
     */
    name: "Test name",
    email: "test@mock.com",
    phone: "9999999999",
    graduation_year: 2026,
    gpa: 3.6,
    city: "Place",
    state: "ID",
    latitude: 90,
    longitude: 180,
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
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
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
        gpa: formData.gpa ? Number(formData.gpa) : undefined,
        latitude: formData.latitude ? Number(formData.latitude) : undefined,
        longitude: formData.longitude ? Number(formData.longitude) : undefined,
      };

      if (isEditing && currentStudentId) {
        await axios.put(`/api/students/${currentStudentId}`, submissionData);
      } else {
        await axios.post<IStudent>("/api/students", submissionData);
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
      // Handle numeric fields
      const numericFields = ["graduation_year", "gpa", "latitude", "longitude"];
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
            Student Name
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
            Email Address
          </label>
          <input
            type="text"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className={`mt-1 block w-full rounded-md ${
              errors.email ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
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
            Phone Number
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
            Graduation Year
          </label>
          <input
            type="number"
            id="graduation_year"
            name="graduation_year"
            value={formData.graduation_year}
            onChange={handleInputChange}
            min={new Date().getFullYear()}
            max={9999}
            className={`mt-1 block w-full rounded-md ${
              errors.graduation_year ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
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
            GPA
          </label>
          <input
            type="number"
            id="gpa"
            name="gpa"
            value={formData.gpa}
            onChange={handleInputChange}
            step="0.01"
            min="0.00"
            max="4.00"
            className={`mt-1 block w-full rounded-md ${
              errors.gpa ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
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
          <select
            id="state"
            name="state"
            value={formData.state}
            onChange={(e) =>
              setFormData({ ...formData, state: e.target.value })
            }
            className={`mt-1 block w-full rounded-md ${
              errors.state ? "border-red-500" : "border-gray-300"
            } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
          >
            <option value="">Select a state</option>
            {US_STATES.map((state) => (
              <option key={state.code} value={state.code}>
                {state.name}
              </option>
            ))}
          </select>
          {errors.state && (
            <p className="mt-1 text-sm text-red-600">{errors.state}</p>
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
