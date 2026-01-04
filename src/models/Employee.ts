export interface Employee {
id: number;
fullName: string;
gender: 'Male' | 'Female' | 'Other' | '';
dob: string;
state: string | null;
active: boolean;
image?: string|null; 
}