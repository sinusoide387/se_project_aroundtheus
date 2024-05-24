export class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        headers: {
          authorization: this._headers,
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      return await res.json(); // Return the parsed JSON
    } catch (err) {
      console.error("I got an error:", err.message);
      throw err; // Re-throw the error for further handling
    }
  }
}
