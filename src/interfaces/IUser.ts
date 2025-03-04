interface IUser {
  password: FormDataEntryValue | null | string,
  email: FormDataEntryValue | null | string,
  username?: FormDataEntryValue | null | string
}

export type {IUser}