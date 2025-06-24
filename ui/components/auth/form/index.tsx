import React, { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
}

const AuthForm = (props: Props): ReactElement => {
  return (
    <Wrapper>
      {props.children}
    </Wrapper>
  );
};

const Wrapper = styled.div`
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  transition: 0.3s;
  background-color: white;
  margin: 8% auto; /* 15% from the top and centered */
  z-index: 900;
  width: 30%;
  margin-top: -5rem;

  .form-title {
    font-size: 1.3rem;
    color: #3863a3;
    text-align: center;
  }

  .btn-container {
    margin-top: 2rem;
  }

  .main-btn-container {
    margin-top: 7rem;
  }

  form {
    padding: 4rem 2rem;
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

  .btn-md {
    padding: 0.7rem 1rem;
  }

  @media only screen and (max-width: 90em) {
    background-color: white;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 5px;
    width: 95%;
  
  }
`;

export default AuthForm;
