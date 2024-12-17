export type ProcessType = {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
};

export type Process = {
  id: number;
  name: string;
  creator_user: {
    id: number;
    name: string;
  };
  owner_user: {
    id: number;
    name: string;
  };
  value: string;
  first_holder_person: {
    id: number;
    full_name: string;
  };
  second_holder_person: {
    id: number;
    full_name: string;
  };
  process_type: {
    id: number;
    name: string;
  };
  process_status: {
    id: number;
    name: string;
  };
  status: string;
  is_deleted: boolean;
  createdAt: string;
  updatedAt: string;
};

export type ProcessStatus = {
  id: number;
  name: string;
  process_type: number;
  order: number;
  state: number;
  createdAt: string;
  updatedAt: string;
};

export type ProcessRequest = {
  name: string;
  creator_user: number;
  owner_user: number;
  value: number;
  first_holder_person: number;
  second_holder_person?: number;
  process_type: number;
  process_status: number;
  status: string;
  is_deleted: boolean;
};

export type MaritalStatus = {
  id: number;
  name: string;
};

export type ProfessionalStatus = {
  id: number;
  name: string;
};

export type Person = {
  id: number;
  full_name: string;
  first_name: string;
  last_name: string;
  mobile: string;
  phone: string;
  nif: string;
  niss: string;
  email: string;
  birth_date: string;
  marital_status: MaritalStatus;
  professional_status: ProfessionalStatus;
  createdAt: string;
  updatedAt: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  phone: string;
  status: number;
  createdAt: string;
  updatedAt: string;
};
