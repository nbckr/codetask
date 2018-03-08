export default class User {
  score: number = 0
  settings: Settings = new Settings()

  // uid is the internal id, e. g. created by firebase
  constructor (public uid: string,
               public email: string,
               public displayName: string,
               public role: Role = Role.STUDENT) { }
}

enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

class Settings {
  constructor (public autoPlay: boolean = true,
               public autoNext: boolean = true) { }
}
