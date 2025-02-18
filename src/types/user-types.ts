export interface UserType {
  _id: string;
  firstName: string;
  lastName: string;
  age?: number;
  gender?: string;
  emailId: string;
  about?: string;
  designation?: string;
  experience?: number;
  company?: string;
  photoUrl?: string;
  skills?: string[];
  createdAt?: string;
  updatedAt?: string;
  __v?: number;
}