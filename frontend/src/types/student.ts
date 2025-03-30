export interface IStudent {
  id?: number;
  name: string;
  email: string;
  graduation_year?: number;
  phone: string;
  gpa?: number;
  city: string;
  state: string;
  latitude?: number;
  longitude?: number;
  created_at: Date;
  updated_at?: Date;
}

export interface IStudentFormData
  extends Omit<IStudent, "id" | "created_at" | "updated_at"> {}
