export default class User {
  // uid is the internal id, e. g. created by firebase
  constructor (public uid: string,
               public email: string,
               public displayName: string,
               public role: Role = Role.STUDENT,
               public score: number = 0,
               public settings: Settings = new Settings(),
               public enrollments: number[] = []) { }
}

enum Role {
  STUDENT = 'student',
  TEACHER = 'teacher',
  ADMIN = 'admin'
}

class Settings {
  constructor (public autoplay: boolean = false) { }
}
