export interface CreateUser {
    execute(email: string, password: string, username: string): Promise<{ uid: string; authToken: string }>;
}
  