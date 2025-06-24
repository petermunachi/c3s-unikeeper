import React, { useEffect, useLayoutEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Summary from "../components/Summary";
import TaskForm from "../components/task/form";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import TaskService from "../services/TaskService";
import { CreateTaskData } from "../utils/types";
import { toast } from "react-toastify";
import assert from "assert";
import PunchService from "../services/PunchService";
import { validateFormData } from "../utils/helpers";


const Home: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const taskService = new TaskService()
  const punchService = new PunchService()

  const [showModal, setShowModal] = useState<boolean>(false);
  const [IsPunchedOut, setIsPunchedOut] = useState<boolean>(false);

  useEffect(() => {
    if (session === null && status !== "loading" ) {
      router.push("/auth/login")
    }
  }, [session, status])

  useEffect(() => {
    (async () => {
      try {
        if (session && session.accessToken ) {
          const { response, data } = await punchService.getPunchStatus(String(session.accessToken))
          setIsPunchedOut(data.data.status)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [session, IsPunchedOut])

  const punchInAndOut = async () => {
    // Make sure user is logged in by checking the session storage
    assert(session, "session === null")
    assert(session.accessToken, "session.accessToken === null")

    try {
      if (IsPunchedOut) {
        const { response, data } = await punchService.punchIn(String(session.accessToken));
        if (data) {
          toast.success("Punch In successfully");
          setIsPunchedOut(false)
          return
        }
        if (response && response.data && response.data.error.message) {
          toast.error(`${response.data.error.message}`);
          return;
        }
      } else {
        const { response, data } = await punchService.punchOut(String(session.accessToken));
        if (data) {
          toast.success("Punch Out successfully");
          setIsPunchedOut(true)
          return
        }
        if (response && response.data && response.data.error.message) {
          toast.error(`${response.data.error.message}`);
          return;
        }
      }
    } catch (error) {
      console.log(error);
    }

  }

  const handleCreateTask = async (formData: CreateTaskData) => {
    // Make sure user is logged in by checking the session storage
    assert(session, "session === null")
    assert(session.accessToken, "session.accessToken === null")
    
    try {

      const isValidationPassed = validateFormData(formData);

      if (!isValidationPassed) {
        // Form data validation failed
        return;
      }

      const { response, data } = await taskService.createTask({ ...formData }, String(session.accessToken));
      if (data) {
        toast.success("Task created successfully");
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
        <title>UniKeeper - DAILY WORK REPORT </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar />
      <MainbarWrapper>
        <div className="">
          <Header
            headerTitle="UniKeeper"
            subTitle="Last Login at Nov 4, 2021 - Admin"
            showIcon={true}
          />
          <div className="mt-5">
            <Summary />
          </div>

          <div className="main-btn-container">
            <div className="btn-container">
              <button
                type="button"
                className={`btn btn-md btn-${
                  IsPunchedOut ? "success" : "danger"
                } mr-2`}
                onClick={punchInAndOut}
              >
                {IsPunchedOut ? "Punch In" : "Punch Out"}
              </button>
              <button
                type="button"
                className="btn btn-md btn-primary"
                onClick={() => setShowModal(true)}
              >
                Add More Task
              </button>
            </div>
          </div>
        </div>

        {showModal && (
          <TaskForm title={"Add Task"} setShowModal={setShowModal} onClick={handleCreateTask} />
        )}
      </MainbarWrapper>
    </>
  );
};
const MainbarWrapper = styled.div`
  margin: 0 10% 0 20%;
  padding-top: 5rem;

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

    .btn-container {
      flex-direction: column;
    }

    form {
      padding: 0 1rem 2rem 1rem;
    }

    .form-control {
      width: 100%;
    }

    .f-2 {
      width: 100%;
    }
    button {
      margin-bottom: 1rem;
    }
  }
`;
export default Home;
