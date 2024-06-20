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
      headers: {
        authorization: this._headers,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        link: link,
      }),
    });
    if (res.ok) {
      return res.json();
    }
    throw new Error(`HTTP error! ${res.status}`);
  }

  async deleteCard(cardId) {
    // siempre invocarlo pasando cardId.
    console.log(`Deleting card with ID: ${cardId}`);
    const res = await fetch(`${this._baseUrl}/cards/${cardId}`, {
      method: "DELETE",
      headers: {
        authorization: this._headers,
      },
    });
    if (!res.ok) {
      const errorMessage = await res.text();
      throw new Error(
        `Failed to delete card with id ${cardId}: ${res.status} ${res.statusText} - ${errorMessage}`
      );
    }
  }
  async addLikes(_id) {
    return fetch(`${this._baseUrl}/cards/${_id}/likes`, {
      method: "PUT",
      headers: {
        authorization: this._headers,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  async removeLike(cardId) {
    return fetch(`${this._baseUrl}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: this._headers,
      },
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error: ${res.status}`)
    );
  }
  async updateProfile(avatarUrl) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: this._headers,

        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        avatar: avatarUrl,
      }),
    }).then((res) =>
      res.ok ? res.json() : Promise.reject(`Error:${res.status}`)
    );
  }
}
