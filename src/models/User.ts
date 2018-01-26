export default class User {

  // id is the internal id, e. g. created by firebase
  constructor (public id: string, public email: string, public name: string) { }

}
