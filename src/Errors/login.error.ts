class LoginError extends Error {
  public status: number;
  
  constructor(message: string) {
    super(message);
    this.name = 'LoginError';
    this.status = 400;
  }
}

export default LoginError;