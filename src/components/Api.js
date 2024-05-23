export class Api {
  constructor(baseUrl, headers) {
    this._baseUrl = baseUrl;
    this._headers = headers;
  }
  async getInitialCards() {
    // todas las promesas son asyncronicas
    const res = await fetch(`${this._baseUrl}/cards`, {
      // se agrega await para que haya menos probabilidad de error
      headers: {
        authorization: this._headers,
      },
    });
    if (res.ok) {
      // si la respuest es positiva, lo devuelve en formato JSON (como objeto)
      console.log(res);
      return res.json(); // se devuelve porque getInitialCards es una funcion.
    }
    if (!res.ok) {
      throw new Error(`HHTP error!${res.status}`); // si la resp es negativa devuleve como error y el status
    }
  }
}
