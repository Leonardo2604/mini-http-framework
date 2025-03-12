export interface PasswordService {
  /**
   * Gera um hash para uma senha em texto puro
   * @param plainPassword A senha em texto puro para ser criptografada
   * @returns Uma Promise com o hash da senha
   */
  hash(plainPassword: string): Promise<string>;

  /**
   * Verifica se uma senha em texto puro corresponde a um hash
   * @param plainPassword A senha em texto puro para verificar
   * @param hashedPassword O hash armazenado da senha
   * @returns Uma Promise indicando se a senha corresponde ao hash
   */
  compare(plainPassword: string, hashedPassword: string): Promise<boolean>;
}
