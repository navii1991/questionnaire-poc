export interface Question  {
    platform: {
      ios: boolean,
      android: boolean,
      window: boolean
    },
    app: string,
    ui: {
      basic: boolean,
      custom: boolean,
      animated: boolean
    },
    registration: {
      otp: boolean,
      social: boolean,
      email: boolean,
      noSignup: boolean
    }
}