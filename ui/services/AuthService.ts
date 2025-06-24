import { SignupData } from "../utils/types"
import Service from "./Service"

export default class AuthService extends Service<any> {
  constructor() {
    super("/auth")
  }

  public registerUser(postData: SignupData) {
    return this.postRequest(`register`, postData)
  }

  // public getAssetsOfCollection(collectionAddress: string) {
  //   return this.getRequest(`collection/${collectionAddress}`)
  // }
}