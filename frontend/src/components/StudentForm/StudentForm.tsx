import { FormEvent } from "react";
import { US_STATES } from "../../const/usStates";
import { IStudentFormData } from "../../types/student";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

interface StudentFormProps {
  formData: IStudentFormData;
  errors: Record<string, string>;
  isEditing: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

function StudentForm({
  formData,
  errors,
  isEditing,
  onInputChange,
  onSelectChange,
  onSubmit,
  onReset,
}: StudentFormProps) {
  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
    >
      <FormInput
        label="Student Name"
        id="name"
        name="name"
        value={formData.name}
        onChange={onInputChange}
        error={errors.name}
      />

      <FormInput
        label="Email Address"
        id="email"
        name="email"
        value={formData.email}
        onChange={onInputChange}
        error={errors.email}
      />

      <FormInput
        label="Phone Number"
        id="phone"
        name="phone"
        value={formData.phone}
        onChange={onInputChange}
        error={errors.phone}
      />

      <FormInput
        label="Graduation Year"
        id="graduation_year"
        name="graduation_year"
        type="number"
        value={formData.graduation_year}
        onChange={onInputChange}
        min={new Date().getFullYear()}
        max={9999}
        error={errors.graduation_year}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "+" || e.key === "e")
            e.preventDefault();
        }}
      />

      <FormInput
        label="GPA"
        id="gpa"
        name="gpa"
        type="number"
        value={formData.gpa}
        onChange={onInputChange}
        step="0.01"
        min="0.00"
        max="4.00"
        error={errors.gpa}
        onKeyDown={(e) => {
          if (e.key === "-" || e.key === "+" || e.key === "e")
            e.preventDefault();
        }}
      />

      <FormInput
        label="City"
        id="city"
        name="city"
        value={formData.city}
        onChange={onInputChange}
        error={errors.city}
      />

      <FormSelect
        label="State"
        id="state"
        name="state"
        value={formData.state}
        onChange={onSelectChange}
        options={US_STATES.map((state) => ({
          value: state.code,
          label: state.name,
        }))}
        error={errors.state}
      />

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
            onClick={onReset}
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default StudentForm;

// import axios from "axios";
// import { useState } from "react";
// import { z } from "zod";
// import { US_STATES } from "../../const/usStates";
// import { IStudentFormData } from "../../types/student";
// import { studentFormSchema } from "../../validation/studentForm/studentFormSchema";
// import FormInput from "../common/FormInput";
// import FormSelect from "../common/FormSelect";

// axios.defaults.baseURL = "http://localhost:3000";

// interface StudentFormProps {
//   onSubmit: (formData: IStudentFormData) => Promise<void>;
//   initialData?: IStudentFormData;
//   isEditing?: boolean;
//   onCancel?: () => void;
// }

// const StudentForm = ({
//   onSubmit,
//   initialData = {
//     name: "",
//     email: "",
//     phone: "",
//     graduation_year: "",
//     gpa: "",
//     city: "",
//     state: "",
//   },
//   isEditing = false,
//   onCancel,
// }: StudentFormProps) => {
//   const [formData, setFormData] = useState<IStudentFormData>(initialData);
//   const [errors, setErrors] = useState<Record<string, string>>({});

//   const validateForm = (): boolean => {
//     try {
//       // Convert form data to proper types for Zod validation
//       const dataToValidate = {
//         ...formData,
//         graduation_year: formData.graduation_year
//           ? Number(formData.graduation_year)
//           : undefined,
//         gpa: formData.gpa ? Number(formData.gpa) : undefined,
//       };

//       studentFormSchema.parse(dataToValidate);
//       setErrors({});
//       return true;
//     } catch (error) {
//       if (error instanceof z.ZodError) {
//         const newErrors: Record<string, string> = {};
//         error.errors.forEach((err) => {
//           if (err.path.length > 0) {
//             newErrors[err.path[0]] = err.message;
//           }
//         });
//         setErrors(newErrors);
//       }
//       return false;
//     }
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!validateForm()) return;

//     await onSubmit(formData);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;

//     setFormData((prev) => {
//       // Handle numeric fields
//       const numericFields = ["graduation_year", "gpa"];
//       if (numericFields.includes(name)) {
//         return { ...prev, [name]: value === "" ? undefined : value };
//       }
//       return { ...prev, [name]: value };
//     });

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));

//     // Clear error when user starts typing
//     if (errors[name]) {
//       setErrors((prev) => {
//         const newErrors = { ...prev };
//         delete newErrors[name];
//         return newErrors;
//       });
//     }
//   };

//   console.log("formdata: ", formData);

//   return (
//     <form
//       onSubmit={handleSubmit}
//       noValidate
//       className="mb-8 grid grid-cols-1 md:grid-cols-2 gap-4"
//     >
//       <FormInput
//         label="Student Name"
//         id="name"
//         name="name"
//         value={formData.name}
//         onChange={handleInputChange}
//         error={errors.name}
//       />

//       <FormInput
//         label="Email Address"
//         id="email"
//         name="email"
//         value={formData.email}
//         onChange={handleInputChange}
//         error={errors.email}
//       />

//       <FormInput
//         label="Phone Number"
//         id="phone"
//         name="phone"
//         value={formData.phone}
//         onChange={handleInputChange}
//         error={errors.phone}
//       />

//       <FormInput
//         label="Graduation Year"
//         id="graduation_year"
//         name="graduation_year"
//         type="number"
//         value={formData.graduation_year}
//         onChange={handleInputChange}
//         min={new Date().getFullYear()}
//         max={9999}
//         error={errors.graduation_year}
//         onKeyDown={(e) => {
//           // Prevent symbols
//           if (e.key === "-" || e.key === "+" || e.key === "e")
//             e.preventDefault();
//         }}
//       />

//       <FormInput
//         label="GPA"
//         id="gpa"
//         name="gpa"
//         type="number"
//         value={formData.gpa}
//         onChange={handleInputChange}
//         step="0.01"
//         min="0.00"
//         max="4.00"
//         error={errors.gpa}
//         onKeyDown={(e) => {
//           // Prevent symbols
//           if (e.key === "-" || e.key === "+" || e.key === "e")
//             e.preventDefault();
//         }}
//       />

//       <FormInput
//         label="City"
//         id="city"
//         name="city"
//         value={formData.city}
//         onChange={handleInputChange}
//         error={errors.city}
//       />

//       <FormSelect
//         label="State"
//         id="state"
//         name="state"
//         value={formData.state}
//         onChange={handleSelectChange}
//         options={US_STATES.map((state) => ({
//           value: state.code,
//           label: state.name,
//         }))}
//         error={errors.state}
//       />

//       <div className="md:col-span-2 flex gap-2">
//         <button
//           type="submit"
//           className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700"
//         >
//           {isEditing ? "Update Student" : "Add Student"}
//         </button>
//         {isEditing && onCancel && (
//           <button
//             type="button"
//             onClick={onCancel}
//             className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
//           >
//             Cancel
//           </button>
//         )}
//       </div>
//     </form>
//   );
// };

// export default StudentForm;
