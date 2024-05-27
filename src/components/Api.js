export class Api {
  constructor({ baseUrl, headers, contentType }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._contentType = contentType;
  }

  async getInitialCards() {
    try {
      const res = await fetch(`${this._baseUrl}/cards`, {
        method: "GET",
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
  async editProfile() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: "Franco Mateo Turco",
        about: "Software Engineer",
      }),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`HTTP error! ${res.status}`);
  }
  async addNewCard(name, link) {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,

      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    const cardData = await res.json();
    console.log("New card added:", cardData);
    return cardData;
  }
  async deleteCard(cardId) {
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers,
      },
    });
  }
  async addLikes(){
    const res = await fetch(`${this._baseUrl}`)
  }
}
