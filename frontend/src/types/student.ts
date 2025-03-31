export interface IStudent {
  id?: number;
  name: string;
  email: string;
  graduation_year: string;
  phone: string;
  gpa: string;
  city: string;
  state: string;
  latitude?: string;
  longitude?: string;
  created_at: Date;
  updated_at?: Date;
}

export interface IStudentFormData
  extends Omit<
    IStudent,
    "id" | "created_at" | "updated_at" | "latitude" | "longitude"
  > {}
