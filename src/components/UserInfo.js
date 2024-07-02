export class UserInfo {
  constructor({ nameSelector, jobSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._job = document.querySelector(jobSelector);
    this._avatar = document.querySelector(avatarSelector);
  }
  getUserInfo() {
    // metodo que toma el contenido en texto del selector
    return {
      name: this._name.textContent,
      job: this._job.textContent,
    };
  }

  setUserInfo(name, job) {
    //funcion que hace display de los parametros que paso. usar estos en la intiantiation
    if (!this._name || !this._job) {
      console.error("Name or job element is not found.");
      return;
    }
    this._name.textContent = name;
    this._job.textContent = job;
  }

  setAvatar(avatar) {
    if (!this._avatar) {
      console.error("Name or job element is not found.");
      return;
    }
    this._avatar.src = avatar;
  }
}
