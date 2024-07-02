export class Api {
  constructor({ baseUrl, headers, contentType }) {
    this._baseUrl = baseUrl;
    this._headers = headers;
    this._contentType = contentType;
  }

  _processResponse = (res) => {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Error: ${res.status}`);
  };

  async getInitialCards() {
    const res = await fetch(`${this._baseUrl}/cards`, {
      method: "GET",
      headers: {
        authorization: this._headers,
      },
    });

    return this._processResponse(res); // si pasa el error, devuelve la respuesta como JSON (objeto)
  }
  async getUserInfo() {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "GET",
      headers: {
        authorization: this._headers,
      },
    });

    return this._processResponse(res);
  }
  async editProfile(name, about) {
    const res = await fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: this._headers,
        "Content-Type": this._contentType,
      },
      body: JSON.stringify({
        name: name,
        about: about,
      }),
    });
    return this._processResponse(res);
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
    return this._processResponse(res);
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
    // // if (!res.ok) {
    // //   const errorMessage = await res.text();
    // //   // throw new Error(
    // //   //   `Failed to delete card with id ${cardId}: ${res.status} ${res.statusText} - ${errorMessage}`
    // //   // );
    // }
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
