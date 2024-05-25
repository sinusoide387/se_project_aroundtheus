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

      return await res.json(); // si pasa el error, devuelve la respuesta como JASON (objeto)
    } catch (err) {
      // y sino devuelve un error
      console.error("I got an error:", err.message);
      throw err;
    }
  }
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._headers,
      },
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`HTTP error! ${res.status}`);
  }
}
