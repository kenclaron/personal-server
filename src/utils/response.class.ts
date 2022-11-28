export class ResponseForm {
  static Error = class {
    static create(status: number, message: string = "") {
      return { status, message };
    }
  };
}

export default ResponseForm;
