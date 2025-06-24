import { CreateTaskData, SignupData } from "../utils/types"
import Service from "./Service"

export default class TaskService extends Service<any> {
  constructor() {
    super("/task");
  }

  public updateTask(
    postData: CreateTaskData,
    taskId: string,
    accessToken: string
  ) {
    return this.postRequest(`update-task/${taskId}`, postData, accessToken);
  }

  public createTask(postData: CreateTaskData, accessToken: string) {
    return this.postRequest(`create-task`, postData, accessToken);
  }

  public getUserTasks(accessToken: string, userId: string) {
    return this.getRequest(`user/${userId}`, accessToken);
  }
}