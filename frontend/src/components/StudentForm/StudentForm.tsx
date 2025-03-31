import { FormEvent } from "react";
import { US_STATES } from "../../const/usStates";
import { IStudentFormData } from "../../types/student";
import FormInput from "../common/FormInput";
import FormSelect from "../common/FormSelect";

interface StudentFormProps {
  formData: IStudentFormData;
  errors: Record<string, string>;
  isEditing: boolean;
  isLoading: boolean;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSelectChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  onSubmit: (e: FormEvent) => void;
  onReset: () => void;
}

function StudentForm({
  formData,
  errors,
  isEditing,
  isLoading,
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
      {isLoading && (
        <div className="absolute inset-0 bg-white bg-opacity-50 z-10"></div>
      )}
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
