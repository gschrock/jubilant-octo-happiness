interface FormInputProps {
  label: string;
  id: string;
  name: string;
  value: string | number | undefined;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  type?: string;
  min?: number | string;
  max?: number | string;
  step?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

const FormInput = ({
  label,
  id,
  name,
  value,
  onChange,
  error,
  type = "text",
  min,
  max,
  step,
  onKeyDown,
}: FormInputProps) => {
  return (
    <div className="mb-4">
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        min={min}
        max={max}
        step={step}
        onKeyDown={onKeyDown}
        className={`mt-1 block w-full rounded-md ${
          error ? "border-red-500" : "border-gray-300"
        } shadow-sm focus:border-indigo-500 focus:ring-indigo-500`}
      />
      {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FormInput;
