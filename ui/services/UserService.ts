import { CreateTaskData, SignupData } from "../utils/types"
import Service from "./Service"

export default class UserService extends Service<any> {
  constructor() {
    super("/user")
  }

  public deactivateUser(userEmail: string, accessToken: string) {
    return this.postRequest(`deactivate/${userEmail}`, {}, accessToken)
  }

  public getAllUsers(accessToken: string) {
    return this.getRequest(`allUsers`, accessToken)
  }
}