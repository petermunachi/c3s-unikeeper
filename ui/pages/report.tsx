import React, { useEffect, useLayoutEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import SortBox from "../components/SortBox";
import Chart from "../components/chart";
import TaskService from "../services/TaskService";
import { TasksRecord } from "../utils/types";


const Report: NextPage = () => {

  const { data: session, status } = useSession()

  const router = useRouter();

  const taskService = new TaskService()

  const [tasks, setTasks] = useState<TasksRecord[]>([])

  let userEmail = "";
  if (status === "authenticated" && session && session.user && session.user.email) {
    userEmail = session.user.email
  }

  useEffect(() => {
    if (session === null && status !== "loading") {
      router.push("/auth/login")
    }
  }, [session, status])

  useEffect(() => {
    (async () => {
      try {
        if (session && session.accessToken && session.user && session.user.email) {
          const { response, data } = await taskService.getUserTasks(String(session.accessToken), session.user.email!);
          setTasks(data.data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [session])

  return (
    <>
      <Head>
        <title> Report | UniKeeper </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar />
      <MainbarWrapper>
        <div className="sort-container">
          <Header
            headerTitle="Report"
            showIcon={false}
          />
          <SortBox />
        </div>
         <div>
          <Chart />
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

  @media (max-width: 768px) {
    margin: 0 5%;

    .f-2 {
      width: 100%;
    }
  }

`;
export default Report;
