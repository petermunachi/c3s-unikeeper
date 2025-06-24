export interface SignupData {
  firstName: string
  lastName: string
  email: string
  password: string
  position: string
}

export interface CreateTaskData {
  description: string
  startDate: number
  workFrom: number
  workTo: number
  id?: string
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  position: string;
  email: string;
  password: string;
  role: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface TasksRecord {
  id: string;
  description: string;
  startDate: number;
  workFrom: number;
  workTo: number;
  user: null;
  createdAt: Date;
  updatedAt: Date;
}

export interface PunchesRecord {
  id: string;
  workFrom: number;
  workTo: number | null;
  createdAt: Date;
  updatedAt: Date;
}