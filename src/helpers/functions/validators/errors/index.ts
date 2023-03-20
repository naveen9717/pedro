import {cpfValidationField} from '../cpf';
import {countDigits} from '../validation';

export const validateFormErrors = (
  data: string[],
  values: any,
  // errors: any,
): any => {
  let errors = {};
  if (data) {
    data.forEach(d => {
      const required = errorRequiredMessage(d);
      const digits = errorLeastDigits(d);
      switch (d) {
        case 'email':
          if (!values[d]) {
            errors[d] = required;
          } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values[d])
          ) {
            errors[d] = 'Formato de email inválido.';
          }
          break;

        case 'cpf':
          const cpfErrors = cpfValidationField(values[d], true);
          if (cpfErrors !== undefined) {
            errors[d] = cpfErrors;
          }
          break;

        case 'name':
          if (!values[d]) {
            errors[d] = required;
          }
          break;
        case 'phone':
          if (!values[d]) {
            errors[d] = required;
          } else if (countDigits(values[d]) < 11) {
            errors[d] = digits;
          }
          break;
        case 'birthdate':
          if (!values[d]) {
            errors[d] = required;
          } else if (countDigits(values[d]) < 8) {
            errors[d] = digits;
          }
          break;
        case 'doc':
          if (!values[d]) {
            errors[d] = required;
          }
          break;
        case 'termoMaioridade':
          console.log('TERMO MAIORIDADE: ', values[d]);

          if (!values[d]) {
            errors[d] = required;
            console.log('TERMO MAIORIDADE DENTRO: ', errors[d]);
          }
          break;
        case 'termoAceite':
          if (!values[d]) {
            errors[d] = required;
          }
          break;
        case 'politicaPrivacidade':
          if (!values[d]) {
            errors[d] = required;
          }
          break;
        default:
          break;
      }

      // 'termoMaioridade',
      // 'termoAceite',
      // 'termoCompartilhamento',
      // 'politicaPrivacidade',
    });
  }
  return errors;
};

const errorRequiredMessage = (field: string): string | null => {
  let error = '' as string;
  switch (field) {
    case 'email':
      error = field;
      break;
    case 'name':
      error = 'nome';
      break;
    case 'phone':
      error = 'telefone';
      break;
    case 'doc':
      error = 'documento';
      break;

    case 'birthdate':
      error = 'data';
      break;
    case 'termoMaioridade':
      error = 'termo maioridade';
      break;
    case 'termoAceite':
      error = 'termo de aceite';
      break;
    case 'politicaPrivacidade':
      error = 'política de privacidade';
      break;
    default:
      break;
  }

  return error ? `O campo ${error} deve ser preenchido.` : null;
};

const errorLeastDigits = (field: string, digits?: number): string | null => {
  let error = '';
  let digit: number;
  switch (field) {
    case 'birthdate':
      error = 'data';
      digit = 8;
      break;
    case 'phone':
      error = 'telefone';
      digit = 11;
      break;

    default:
      break;
  }
  if (digits) {
    digit = digits;
  }
  return error
    ? `O campo ${error} deve conter ${digit} dígito` +
        `${digits === 1 ? '.' : 's.'}`
    : null;
};
