export interface IUser {
  id: string;
  perfil: {
    id: string;
    nome: string;
    descricao: string;
    root: boolean;
  };
  empresaId: string;
  nome: string;
  email: string;
  ativo: boolean;
}

export interface IUsers {
  total: number;
  perPage: number;
  page: number;
  lastPage: number;
  data: IUser[];
}

export interface IUserFilters {
  role: 'admins' | 'agent' | 'lawyer' | 'service' | string;
  name: string;
  state: string;
}
