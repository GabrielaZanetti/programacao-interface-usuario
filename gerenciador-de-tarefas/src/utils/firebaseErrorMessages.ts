export const getFirebaseErrorMessage = (errorCode: string): string => {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'O e-mail já está em uso. Por favor, use outro e-mail.';
    case 'auth/invalid-email':
      return 'O endereço de e-mail não é válido.';
    case 'auth/weak-password':
      return 'A senha é muito fraca. Use pelo menos 6 caracteres.';
    case 'auth/operation-not-allowed':
      return 'A criação de contas está desativada no momento.';
    case 'auth/invalid-credential':
      return 'Credenciais fornecidas são inválidas. Por favor, verifique suas informações e tente novamente.';
    default:
      return 'Ocorreu um erro inesperado. Tente novamente mais tarde.';
  }
};
