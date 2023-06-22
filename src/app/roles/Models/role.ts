export interface Role {
  id?: number;
  role: string;
  privileges: privilige[];
}

export interface privilige {
  id: number;
  name: string;
}
