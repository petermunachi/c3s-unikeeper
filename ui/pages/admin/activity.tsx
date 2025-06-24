import React, { useEffect, useLayoutEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../../components/Header";
import Sidebar from "../../components/Sidebar";
import styled from "styled-components";
import Summary from "../../components/Summary";
import TaskForm from "../../components/task/form";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import SortBox from "../../components/SortBox";
import Task from "../../components/Task";
import TaskService from "../../services/TaskService";
import { CreateTaskData, TasksRecord } from "../../utils/types";
import assert from "assert";
import { validateFormData } from "../../utils/helpers";
import { toast } from "react-toastify";


const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const taskService = new TaskService()

  const [showModal, setShowModal] = useState<boolean>(false);
  const [tasks, setTasks] = useState<TasksRecord[]>([])

  useEffect(() => {
    if (session === null && status !== "loading") {
      router.push("/auth/login")
    }
  }, [session, status])

  useEffect(() => {
    (async () => {
      try {
        if (session && session.accessToken && session.user && session.user.email) {
          const { response, data } = await taskService.getUserTasks(String(session.accessToken), session.user.email);
          console.log({ response, data });
          setTasks(data.data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [session, showModal])

  const handleEditTask = async (formData: CreateTaskData) => {
    // Make sure user is logged in by checking the session storage
    assert(session, "session === null")
    assert(session.accessToken, "session.accessToken === null")
    assert(formData.id, "formData.id === undefined")

    try {

      const isValidationPassed = validateFormData(formData);

      if (!isValidationPassed) {
        // Form data validation failed
        return;
      }

      const { response, data } = await taskService.updateTask({ ...formData, id: undefined }, formData.id, String(session.accessToken));
      if (data) {
        toast.success("Task updated successfully");
      } else if (response && response.data && response.data.error.message) {
        toast.error(`${response.data.error.message}`);
      } else {
        console.log(response);
      }

      setShowModal(false);

    } catch (error) {
      console.log(error);
      setShowModal(false)
    }
  }

  return (
    <>
      <Head>
        <title> Task | UniKeeper </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar />
      <MainbarWrapper>
        <div className="">
          <div className="sort-container">
            <Header
              headerTitle="Task"
              showIcon={false}
            />
            <SortBox />
          </div>
          <div>
            {
              tasks.map((task, index) => (
                <Task
                  task={task}
                  onClick={handleEditTask}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />
              ))
            }
          </div>
        </div>
      </MainbarWrapper>
    </>
  );
};
const MainbarWrapper = styled.div`
  margin: 0 10% 0 20%;
  padding-top: 5rem;
  
  .sort-container {
    display: flex;
    justify-content: space-between;
    margin-bottom: 5rem;
  }

  .btn-container {
    display: flex;
  }

  .main-btn-container {
    margin-top: 7rem;
  }

  .mr-2 {
    margin-right: 1rem;
  }
  .btn-md {
    padding: 0.7rem 1rem;
  }

  .modal-title {
    font-size: 1.3rem;
    color: #b3bac1;
  }

  form {
    padding: 0 2rem 2rem 2rem;
  }

  .form-group {
    margin-top: 1rem;
  }

  .form-control {
    width: 90%;
  }
  .f-2 {
    width: 20%;
  }

  @media (max-width: 768px) {
    margin: 0 5%;

    .f-2 {
      width: 100%;
    }
  }
`;
export default Home;
