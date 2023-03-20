import {requiredField} from '../generic';

export const cpfValidationField = (cpf: string, required: boolean) => {
  const cpfReceived = cpf?.replace(/[^\d]+/g, '');
  const requiredTest = requiredField(cpfReceived, required);
  if (requiredTest) {
    return requiredTest;
  }

  if (cpfReceived?.length < 11) {
    return 'Campo CPF deve conter 11 dígitos';
  }

  if (
    cpfReceived === '00000000000' ||
    cpfReceived === '11111111111' ||
    cpfReceived === '22222222222' ||
    cpfReceived === '33333333333' ||
    cpfReceived === '44444444444' ||
    cpfReceived === '55555555555' ||
    cpfReceived === '66666666666' ||
    cpfReceived === '77777777777' ||
    cpfReceived === '88888888888' ||
    cpfReceived === '99999999999'
  ) {
    return 'CPF inválido';
  }

  // First digit validation
  let add = 0;
  for (let i = 0; i < 9; i++)
    add += parseInt(cpfReceived?.charAt(i)) * (10 - i);
  let rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpfReceived.charAt(9))) return 'CPF inválido';

  // Second digit validation
  add = 0;
  for (let i = 0; i < 10; i++)
    add += parseInt(cpfReceived.charAt(i)) * (11 - i);
  rev = 11 - (add % 11);
  if (rev == 10 || rev == 11) rev = 0;
  if (rev != parseInt(cpfReceived.charAt(10))) return 'CPF inválido';

  return undefined;
};
