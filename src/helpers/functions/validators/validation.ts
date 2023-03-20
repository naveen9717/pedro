//verifica se uma string possui pelo menos uma letra maiuscula
export const hasUppercase = (texto: string) => /[A-Z]/.test(texto);

//verifica se uma string possui pelo menos uma letra minuscula
export const hasLowercase = (texto: string) => /[a-z]/.test(texto);

//verifica se uma string possui pelo menos um numero
export const hasNumber = (texto: string) => /[0-9]/.test(texto);

//verifica se uma string possui pelo menos um numero
export const hasSpecialCharacter = (texto: string) => /\W|_/.test(texto);

export const countDigits = (str: string) => {
  return str.replace(/[^0-9]/g, '').length;
};
