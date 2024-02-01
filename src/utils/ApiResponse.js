class ApiResponse {
  constructor(statusCode, data, error, _message) {
    this.statusCode = statusCode;
    this.data = data;
    this.error = error;
    this.message = _message || "Success";
    this.success = statusCode >= 200 && statusCode < 300;
  }
}

export {ApiResponse}