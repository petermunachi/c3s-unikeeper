import React, { ReactElement, useEffect, useState } from "react";
import { toast } from "react-toastify";
import TaskService from "../../../services/TaskService";
import { CreateTaskData, TasksRecord } from "../../../utils/types";
import Modal from "../../Modal";
import { useSession } from "next-auth/react"
import moment from 'moment-timezone';

interface IProps {
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  title: string;
  onClick: (data: CreateTaskData) => Promise<void>
  task?: TasksRecord
}

const initialCreateTaskData = {
  description: "",
  startDate: 0,
  workFrom: 0,
  workTo: 0,
}

const TaskForm = ({ setShowModal, onClick, title, task }: IProps): ReactElement => {
  
  const [formData, setFormData] = useState<CreateTaskData>(initialCreateTaskData);

  const [date, setDate] = useState<any>(new Date());
  const [workFromTimeInput, setWorkFromTimeInput] = useState('00:00')
  const [workToTimeInput, setWorkToTimeInput] = useState('00:00')

  useEffect(() => {
    if (task) {
      setDate(moment.unix(task.startDate).format("YYYY-MM-DD"))
      setWorkFromTimeInput(moment.unix(task.workFrom).format("HH:mm"))
      setWorkToTimeInput(moment.unix(task.workTo).format("HH:mm"))

      setFormData(prevState => ({
        ...prevState, 
        startDate: task.startDate,
        description: task.description,
        workFrom: task.workFrom,
        workTo: task.workTo
      }))
    }
  }, [task])
  

  enum Duration {
    workFrom,
    workTo
  }

  const handleTimeInputChange = (e: any, duration: Duration) => {
    const input = `${date} ${e.target.value}`
    const workDuration = moment(input, "YYYY-MM-DD HH:mm").unix()

    if (duration === Duration.workFrom) {
      setWorkFromTimeInput(e.target.value);
      setFormData((prevState) => ({ ...prevState, workFrom: workDuration }))
    } else {
      setWorkToTimeInput(e.target.value);
      setFormData((prevState) => ({ ...prevState, workTo: workDuration }))
    }
  }

  const handleDateInput = (e: any) => {
    setDate(e.target.value)
    const workStartDate = moment(e.target.value, "YYYY-MM-DD HH:mm").unix()

    setFormData((prevState) => ({ ...prevState, startDate: workStartDate }))

  }
  
  return (
    <Modal width="30%">
      <div className="closeContainer">
        <span className="close" onClick={() => setShowModal(false)}>
          &times;
        </span>
      </div>
      <form>
        <h1 className="modal-title">{title}</h1>
        <div className="form-group">
          <label>Date</label>
          <input 
            className="form-control" 
            type={"datetime-local"} 
            value={date}
            onChange={handleDateInput}
          />
        </div>
        <div className="form-group">
          <label>Task Done</label>
          <textarea 
            className="form-control" 
            value={formData.description}
            onChange={(e) => setFormData((prevState) => ({ ...prevState, description: e.target.value }))}
          />
        </div>
        <div className="form-group">
          <div>
            <label className="d-block">Worked From: &nbsp;</label>
          </div>
          <div className="d-flex align-items-center ">
            <input 
              className="form-control f-2" 
              type={"time"} 
              value={workFromTimeInput}
              onChange={(e) => handleTimeInputChange(e, Duration.workFrom)}
            />
            <div className="mx-3">
              <small>To</small>
            </div>
            <input 
              className="form-control f-2" 
              type={"time"} 
              value={workToTimeInput}
              onChange={(e) => handleTimeInputChange(e, Duration.workTo)}
            />
          </div>
        </div>
        <div className="form-group d-flex justify-content-end">
          <button 
            type="button" 
            className="btn btn-success btn-md"
            onClick={() => onClick(formData)}
          >
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};


export default TaskForm;
