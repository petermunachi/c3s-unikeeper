import React, { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import { getSession, signIn } from 'next-auth/react'
import styled from "styled-components";
import AuthHeader from "../../components/auth/header";
import AuthForm from "../../components/auth/form";
import AuthService from "../../services/AuthService";
import { toast } from "react-toastify";
import { Session } from "next-auth";
import { AxiosResponse } from "axios";
import { SignupData } from "../../utils/types";

const initialSignupData = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  position: ""
}

const Register: NextPage = () => {
  const [formData, setFormData] = useState<SignupData>(initialSignupData);

  const authService = new AuthService()

  const handleUserLogin = async () => {
    try {
    
      for (const inputName in formData) {
        if (Object.prototype.hasOwnProperty.call(formData, inputName)) {
          const inputValue = formData[inputName as keyof SignupData];
          if (inputValue === "") {          
            toast.error(`${inputName} is required`);
            return
          }   
        }
      }

      const { response, data } = await authService.registerUser(formData);
      if (data) {
        toast.success("User created successfully");
        return
      } else if (response && response.data && response.data.error.message) {
        toast.error(`${response.data.error.message}`);
        return;
      }else {
        console.log(response);
      }     
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <Head>
        <title>UniKeeper - Register </title>
        <meta name="description" content="DAILY WORK REPORT" />
        <link rel="shortcut icon" href="/unikeeper.svg" />
        <link rel="icon" href="/logo.png" />
      </Head>

      <MainbarWrapper>
        <AuthHeader />
        <AuthForm>
          <form>
            <h1 className="form-title">Sign Up</h1>
            <div className="form-group">
              <label>First Name</label>
              <input
                className="form-control"
                type="text"
                autoComplete="off"
                value={formData.firstName}
                onChange={(e) => setFormData((prevState) => ({...prevState, firstName: e.target.value}))}
              />
            </div>
            <div className="form-group">
              <label>Last Name</label>
              <input
                className="form-control"
                type="text"
                autoComplete="off"
                value={formData.lastName}
                onChange={(e) => setFormData((prevState) => ({ ...prevState, lastName: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Email</label>
              <input
                className="form-control"
                type="email"
                autoComplete="off"
                value={formData.email}
                onChange={(e) => setFormData((prevState) => ({ ...prevState, email: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Temporary Password</label>
              <input
                className="form-control"
                type="password"
                value={formData.password}
                onChange={(e) => setFormData((prevState) => ({ ...prevState, password: e.target.value }))}
              />
            </div>
            <div className="form-group">
              <label>Position</label>
              <input
                className="form-control"
                type="text"
                autoComplete="off"
                value={formData.position}
                onChange={(e) => setFormData((prevState) => ({ ...prevState, position: e.target.value }))}
              />
            </div>

            <div className="d-flex justify-content-center btn-container">
              <button type="button" className="btn btn-success btn-md " onClick={handleUserLogin}>
                Register
              </button>
            </div>

            <div className="d-flex justify-content-center mt-3">
              <small>
                Already have an account? <a href="/auth/login">Sign In</a>
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
export default Register;
