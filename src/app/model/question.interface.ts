interface IObjectKeys {
  [key: string]: string | Platform | UI | Registration;
}
interface IObjectNestedKeys {
  [key: string]: boolean;
}

export interface Platform  extends IObjectNestedKeys{
  ios: boolean,
  android: boolean,
  window: boolean
}

export interface UI  extends IObjectNestedKeys{
  basic: boolean,
  custom: boolean,
  animated: boolean
}

export interface Registration  extends IObjectNestedKeys{
  otp: boolean,
  social: boolean,
  email: boolean,
  noSignup: boolean
}

export interface Question extends IObjectKeys  {
    platform: Platform,
    app: string,
    ui: UI,
    registration: Registration
}