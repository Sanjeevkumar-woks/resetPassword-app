export class AuthService {
  static BASE_URL = "https://resetpassword-kiv9.onrender.com/auth-service/auth";
  // static BASE_URL = "http://localhost:9000/auth-service/auth";

  static async login(username, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
      credentials: "include",
    };

    try {
      const response = await fetch(`${this.BASE_URL}/login`, requestOptions);
      const data = await this.handleResponse(response);
      localStorage.setItem("user", JSON.stringify(data));
      return data;
    } catch (error) {
      throw error;
    }
  }

  static logout() {
    // clear the local storage
    localStorage.removeItem("user");
    //invalidate cookie jwt token
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${this.BASE_URL}/logout`, requestOptions);

    return true;
  }

  static async register(username, emailId, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, emailId, password }),
    };

    try {
      const response = await fetch(`${this.BASE_URL}/register`, requestOptions);
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Registration failed:", error);
      throw error;
    }
  }

  static async forgotPassword(email) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ emailId: email }),
    };

    try {
      const response = await fetch(
        `${this.BASE_URL}/forgetPassword`,
        requestOptions
      );
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Forgot password request failed:", error);
      throw error;
    }
  }

  static async resetPassword(token, password) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    };

    try {
      const response = await fetch(
        `${this.BASE_URL}/resetPassword?token=${encodeURIComponent(token)}`,
        requestOptions
      );
      return await this.handleResponse(response);
    } catch (error) {
      console.error("Reset password request failed:", error);
      throw error;
    }
  }

  static async handleResponse(response) {
    if (!response.ok) {
      const error = await response.text();
      throw new Error(
        error || "An error occurred while processing the request."
      );
    }
    return response.json();
  }
}
