import {
  dateReqFormat,
  dateString,
  dateTransform,
} from '../../../helpers/functions/datas';
import {
  IObjectKeys,
  UserDataCreateUpdateSend,
  UserInstEmailCpfResponse,
} from '../../userDataInstall/userDataInstallData';
import {
  RegistrationFormData,
  RegistrationInitialData,
  RegistrationTypeData,
} from './registrationData';

const makeRegistrationFields = (
  type: RegistrationTypeData,
  step: number,
  userEmail: string,
  dataUser: UserInstEmailCpfResponse,
): [RegistrationFormData[], RegistrationInitialData] => {
  let data;
  let initialData;
  const firstStep = [email, cpf(step, type)];
  const complete = [
    email,
    cpf(step, type),
    name(type),
    phone(type),
    birthdate(type),
    doc(type),
    share,
    privacy,
    notUnderAge,
    accept,
  ];
  const simple = [
    email,
    cpf(step, type),
    name(type),
    phone(type),
    share,
    privacy,
    notUnderAge,
    accept,
  ];

  if (type === 'migrated') {
    data = complete;
    initialData = makeRegistrationInitialData(
      complete,
      userEmail,
      dataUser?.cpf,
      dataUser?.nomeCompleto,
      dataUser?.numeroCelular,
      dataUser?.dataNascimento,
      dataUser.documentoIdentificacao.numero,
      // null,
      // null,
      // null,
      // dataUser.telefone,
      // dataUser.dataNascimento,
      // datauser.documento,
    );
  } else if (
    (type === 'instalation' || type === 'notInstalation') &&
    step === 0
  ) {
    data = firstStep;
    initialData = makeRegistrationInitialData(
      firstStep,
      userEmail,
      dataUser.cpf,
    );
  } else if (type === 'instalation') {
    data = complete;

    initialData = makeRegistrationInitialData(
      complete,
      userEmail,
      dataUser.cpf,
    );
  } else {
    data = simple;
    initialData = makeRegistrationInitialData(simple, userEmail, dataUser.cpf);
  }

  return [data, initialData];
};

const makeRegistrationInitialData = (
  data: RegistrationFormData[],
  email: string,
  cpf: string,
  name?: string,
  phone?: string,
  birthdate?: string,
  doc?: string,
): RegistrationInitialData => {
  let initialData: IObjectKeys & RegistrationInitialData = {};

  data.forEach(i => {
    if (i.name === 'email') {
      initialData[i.name] = email;
    } else if (i.name === 'cpf' && cpf && cpf) {
      initialData[i.name] = cpf.replace(/\./g, '').replace(/-/g, '') as string;
    } else if (i.name === 'name' && name && name) {
      initialData[i.name] = name;
    } else if (i.name === 'phone' && phone && phone) {
      initialData[i.name] = phone.replace(/[^\d]+/g, '');
      console.log('Phone: ', initialData[i.name]);
    } else if (i.name === 'birthdate' && birthdate && birthdate) {
      initialData[i.name] = dateString(
        new Date(birthdate),
        'dd-mm-yyyy',
        'none',
      );
      // const date = dateReqFormat(new Date(birthdate));
      console.log('DATE: ', initialData[i.name]);
    } else if (i.name === 'doc' && doc && doc) {
      initialData[i.name] = doc;
    } else {
      initialData[i.name] = '';
    }
  });
  return initialData;
};

const email = {
  name: 'email',
  placeholder: '',
  editable: false,
};

const cpf = (
  step: number,
  type: RegistrationTypeData,
): RegistrationFormData => {
  return {
    name: 'cpf',
    dataType: 'cpf',
    placeholder: 'Digite seu CPF',
    editable: step === 0 && type !== 'migrated' ? true : false,
  };
};

const name = (type: RegistrationTypeData): RegistrationFormData => {
  return {
    name: 'name',
    placeholder: 'Nome completo',
    editable: type !== 'migrated' ? true : false,
  };
};

const phone = (type: RegistrationTypeData): RegistrationFormData => {
  return {
    name: 'phone',
    placeholder: 'Celular',
    dataType: 'phone',
    editable: type !== 'migrated' ? true : false,
  };
};

// const phone: RegistrationFormData = {
//   name: 'phone',
//   placeholder: 'Celular',
//   dataType: 'phone',
// };
const birthdate = (type: RegistrationTypeData): RegistrationFormData => {
  return {
    name: 'birthdate',
    placeholder: 'Data de nascimento',
    dataType: 'date',
    editable: type !== 'migrated' ? true : false,
  };
};
// const birthdate: RegistrationFormData = {
//   name: 'birthdate',
//   placeholder: 'Data de nascimento',
//   dataType: 'date',
// };

const doc = (type: RegistrationTypeData): RegistrationFormData => {
  return {
    name: 'doc',
    placeholder: 'Insira seu documento',
    editable: type !== 'migrated' ? true : false,
  };
};
// const doc: RegistrationFormData = {
//   name: 'doc',
//   placeholder: 'Insira seu documento',
// };

const share: RegistrationFormData = {
  name: 'termoCompartilhamento',
  fieldType: 'radio',
};

const privacy: RegistrationFormData = {
  name: 'politicaPrivacidade',
  fieldType: 'radio',
};

const notUnderAge: RegistrationFormData = {
  name: 'termoMaioridade',
  fieldType: 'radio',
};

const accept: RegistrationFormData = {
  name: 'termoAceite',
  fieldType: 'radio',
};

const makeRegistrationParamsData = (
  step: number,
  regType: RegistrationTypeData,
  values: RegistrationInitialData,
): RegistrationInitialData => {
  let data: RegistrationInitialData = {};
  data.email = values.email;
  data.cpf = values.cpf;
  if (regType === 'migrated' || step === 1) {
    data.name = values.name;
    data.phone = values.phone;
    data.politicaPrivacidade = values.politicaPrivacidade;
    data.termoAceite = values.termoAceite;
    data.termoCompartilhamento = values.termoCompartilhamento;
    data.termoMaioridade = values.termoMaioridade;
    if (regType === 'migrated' || regType === 'instalation') {
      data.birthdate = values.birthdate;
      data.doc = values.doc;
    }
  }
  return data;
};

const makeRegistrationUpdateCreateUserData = (
  values: RegistrationInitialData,
  idB2c: string,
  ip: string,
  id?: string | undefined,
  type?: 'update' | 'create',
): UserDataCreateUpdateSend => {
  let data: UserDataCreateUpdateSend = {
    idB2c: idB2c ? idB2c : '',
    nomeCompleto: values?.name as string,
    cpf: values?.cpf?.replace(/\./g, '').replace(/-/g, '') as string,
    dataNascimento: values?.birthdate ? values?.birthdate : '',
    email: values?.email as string,
    emailB2C: values?.email as string,
    numeroCelular: values?.phone?.replace(/[^\d]+/g, '') as string,
    providerAutenticacao: '',
    apelido: '',
    numeroTelefone: values?.phone?.replace(/[^\d]+/g, '') as string,
    documentoIdentificacao: {
      tipoDocumentoIdentificacaoId: idB2c,
      numero: values?.doc ? values?.doc : '',
      orgaoExpedidor: '',
      ufOrgaoExpedidor: '',
    },
    termos: {
      versaoTermoAceite: values?.termoAceite as unknown as number,
      versaoPoliticaPrivacidade:
        values?.politicaPrivacidade as unknown as number,
      versaoTermoMaioridade: values?.termoMaioridade as unknown as number,
      versaoTermoCompartilhamento:
        values?.termoCompartilhamento as unknown as number,
      ip: ip,
    },
  };
  if (type === 'update') {
    data.id = id;
  }
  return data;
};

export const RegistrationFactory = {
  makeRegistrationFields,
  makeRegistrationInitialData,
  makeRegistrationParamsData,
  makeRegistrationUpdateCreateUserData,
};
