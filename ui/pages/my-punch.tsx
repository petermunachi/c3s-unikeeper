import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import SortBox from "../components/SortBox";
import PunchService from "../services/PunchService";
import { PunchesRecord } from "../utils/types";
import NotFound from "../components/NotFound";
import moment from 'moment';
import { timeDiffCalc } from "../utils/helpers";
import { toast } from "react-toastify";

const MyPunch: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const punchService = new PunchService()

  const [punches, setPunches] = useState<PunchesRecord[]>([])

  useEffect(() => {
    if (session === null && status !== "loading") {
      router.push("/auth/login")
    }
  }, [session, status])

  useEffect(() => {
    (async () => {
      try {
        if (session && session.accessToken) {
          const { response, data } = await punchService.getUserPunches(String(session.accessToken));          
          setPunches(data.data)
        }
      } catch (error: any) {
        console.log(error);
        toast.error(error.message)
      }
    })()
  }, [session])

  return (
    <>
      <Head>
        <title> My Punches | UniKeeper </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>
      <Sidebar />
      <MainbarWrapper>
        <div className="">
          <div className="sort-container">
            <Header
              headerTitle="My Punches"
              showIcon={false}
            />
            <SortBox />
          </div>
          <div>
            {
              punches.length !== 0 ? (
                <table className="table">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">In</th>
                      <th scope="col">Out</th>
                      <th scope="col">Hours</th>
                    </tr>
                  </thead>
                  <tbody>
                    {punches.map((punch, index) => (
                      <tr key={index}>
                        <td>{moment(punch.createdAt).format("MMM DD YYYY")}</td>
                        <td>{moment.unix(Number(punch.workFrom)).format("hh:mm A")}</td>
                        <td>{punch.workTo ? moment.unix(Number(punch.workTo)).format("hh:mm A") : "NULL"}</td>
                        <td>{punch.workTo ? timeDiffCalc(punch.workTo, punch.workFrom): "NULL"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>                
              ) : <NotFound title={"No punches found"} />
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
export default MyPunch;
