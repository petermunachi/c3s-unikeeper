import React, { useEffect, useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Summary from "../components/Summary";
import TaskForm from "../components/task/form";
import { useSession } from "next-auth/react"
import { useRouter } from "next/router";
import { User } from "../utils/types";
import UserService from "../services/UserService";
import Link from "next/link";
import assert from "assert";
import { toast } from "react-toastify";


const Admin: NextPage = () => {
  const { data: session, status } = useSession()
  const router = useRouter();
  const userService = new UserService()

  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    if (session === null && status !== "loading") {
      router.push("/auth/login")
    }
    //@ts-ignore
    // if (session &&  session.user.role !== "admin") {
    //   router.push("/auth/login")
    // }
  }, [session, status])

  useEffect(() => {
    (async () => {
      try {
        if (session && session.accessToken) {
          const { response, data } = await userService.getAllUsers(String(session.accessToken));
          setUsers(data.data)
        }
      } catch (error) {
        console.log(error);
      }
    })()
  }, [session])

  const deactivateUser = async(user: string) => {
    // Make sure user is logged in by checking the session storage
    assert(session, "session === null")
    assert(session.accessToken, "session.accessToken === null")

    try {
      const { response, data } = await userService.deactivateUser(user, String(session.accessToken));
      if (data.data) {
        toast.success("User deactivated successfully")
        window.location.reload();
      }
      
    } catch (error) {
      console.log(error);
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

          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>S/N</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Position</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={index}>
                    <td>{index + 1}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.email}</td>
                    <td>{user.position}</td>
                    {/* <td>
                      <Link href={`/task?userEmail=${user.email}`}>
                        <a className="btn btn-md btn-info">Explore</a>
                      </Link>
                    </td> */}
                    <td>
                      <button 
                        type="button" 
                        className="btn btn-md btn-danger"
                        onClick={() => deactivateUser(user.email)}
                      >Delete</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

    
        </div>

      </MainbarWrapper>
    </>
  );
};
const MainbarWrapper = styled.div`
  margin: 0 10% 0 20%;
  padding-top: 5rem;

  .table-container {
    margin-top: 5rem;
    width: 80%;
    display: flex;
    justify-content: center;
  }

  table {
    width: 100%;
  }

  @media (max-width: 768px) {
    margin: 0 5%;

    .f-2 {
      width: 100%;
    }
  }
`;
export default Admin;
