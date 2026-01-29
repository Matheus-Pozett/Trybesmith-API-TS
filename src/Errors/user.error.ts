class UserError extends Error {
  public status: number;
  
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'UserError';
    this.status = status || 400;
  }
}

export default UserError;