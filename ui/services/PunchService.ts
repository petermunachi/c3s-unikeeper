import Service from "./Service"

export default class PunchService extends Service<any> {
  constructor() {
    super("/punch")
  }

  public punchIn(accessToken: string) {
    return this.postRequest(`user/punch-in`, {}, accessToken)
  }

  public punchOut(accessToken: string) {
    return this.postRequest(`user/punch-out`, {}, accessToken)
  }

  public getPunchStatus(accessToken: string) {
    return this.getRequest(`status`, accessToken)
  }

  public getUserPunches(accessToken: string) {
    return this.getRequest(`user/punch`, accessToken)
  }
}