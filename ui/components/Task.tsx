
import styled from "styled-components";
import { CreateTaskData, TasksRecord } from "../utils/types";
import TaskForm from "./task/form";
import moment from 'moment';
import { timeDiffCalc } from "../utils/helpers";


interface IProps {
  task: TasksRecord
  onClick: (formData: CreateTaskData) => Promise<void>
  showModal: boolean
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Task = ({ task, onClick, setShowModal, showModal }: IProps) => {

  const showEditTaskModal = () => {
    setShowModal(true)
  }

  const handleEditTask = async (formData: CreateTaskData) => {
    await onClick({...formData, id: task.id})
  }

  const workFrom = moment.unix(Number(task.workFrom)).format("hh:mm A") 
  const workTo = moment.unix(Number(task.workTo)).format("hh:mm A") 
  const startDate = moment.unix(Number(task.startDate)).format("MMM DD") 
  const trackedDiff = timeDiffCalc(task.workTo, task.workFrom)
  

  return (
    <>
      <TaskWrapper>
        <div className="top-section">
          <small><span>{startDate}</span> &nbsp; - &nbsp; Tracked {trackedDiff}</small>
        </div>
        <div className="bottom-section">
          <div className="bottom-section-top">
            <h3 className="time-range">{`${workFrom} — ${workTo}`}</h3>
            <h3 className="work-title">{task.description}</h3>
          </div>
          <div className="btn-container">
            <button type="button" onClick={showEditTaskModal} className="btn btn-info btn-warning">Edit</button>
          </div>
        </div>
      </TaskWrapper>
      {showModal && (
        <TaskForm task={task} title={"Edit Task"} setShowModal={setShowModal} onClick={handleEditTask} />
      )}
    </>
   
  );
};

const TaskWrapper = styled.div`
  width: 100%;
  margin: 3rem 0;
  .top-section {
    font-size: 14px;
  }
  
  .top-section span {
    font-weight: 500;
  }

  .bottom-section {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.5rem 1rem 1.5rem 0;
  }

  .bottom-section-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .time-range {
    font-size: 14px;
    font-weight: 500;
  }
  
  .work-title {
    margin-left: 2rem;
    font-size: 16px;
    font-weight: 500;
  }
  
  
`;

export default Task;
