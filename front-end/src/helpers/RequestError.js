class RequestError {
  constructor({ message, status, statusText }) {
    this.message = message;
    this.status = status;
    this.statusText = statusText;
  }
}

export default RequestError;
