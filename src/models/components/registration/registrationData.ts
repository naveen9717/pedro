import {DataInputType} from '../input/inputData';

export type RegistrationTypeData =
  | 'migrated'
  | 'instalation'
  | 'notInstalation'
  | null;

export type RegistrationFormData = {
  name: string;
  placeholder?: string;
  dataType?: DataInputType;
  editable?: boolean;
  fieldType?: 'radio' | 'input' | null;
};

export type RegistrationInitialData = {
  email?: string;
  cpf?: string;
  name?: string;
  phone?: string;
  birthdate?: string;
  doc?: string;
  politicaPrivacidade?: boolean;
  termoAceite?: boolean;
  termoMaioridade?: boolean;
  termoCompartilhamento?: boolean;
};
