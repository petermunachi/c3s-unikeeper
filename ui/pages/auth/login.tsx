import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { getSession, signIn } from 'next-auth/react'
import styled from "styled-components";
import AuthHeader from "../../components/auth/header";
import AuthForm from "../../components/auth/form";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { useRouter } from "next/router";


const Login: NextPage = () => {
  const router = useRouter();

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const handleUserLogin = async () => {
    try {
      if (email === "") {
        toast.error("Email is required");
        return;
      }
      if (password === "") {
        toast.error("Password is required");
        return;
      }

      const res = await signIn('credentials', { 
        email, 
        password, 
        redirect: false 
      })
      // @ts-ignore
      if (res && res.status === 200) {
        const session = (await getSession()) as unknown as Session

        if (session && session.user) {          
          toast.success("Login successfull")
          router.push('/')
        }
        
      }      
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>UniKeeper - Login </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <MainbarWrapper>
        <AuthHeader />
        <AuthForm>
          <form>
            <h1 className="form-title">Sign In</h1>
            <div className="form-group">
              <label>Email</label>
              <input 
                className="form-control"
                type="email" 
                placeholder="johndoe@gmail.com" 
                autoComplete="off" 
                value={email}
                onChange={(e)=>setEmail(e.currentTarget.value)}
              />
            </div>
            <div className="form-group">
              <label>Password</label>
              <input 
                className="form-control" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
              />
            </div>

            <div className="d-flex justify-content-center btn-container">
              <button type="button" className="btn btn-success btn-md " onClick={handleUserLogin}>
                Sign In
              </button>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <small>
                Don't have an account? <a href="/auth/register">Sign Up</a>
              </small>
            </div>
          </form>
        </AuthForm>
      </MainbarWrapper>

    </>
  );
};
const MainbarWrapper = styled.div`
`;
export default Login;
