import React, { ReactElement, useEffect } from "react";
import styled from "styled-components";

interface Props {
  children: React.ReactNode;
  width?: string;
}

type WrapperProps = {
  width: string | undefined;
};

const Modal = (props: Props): ReactElement => {
  return (
    <Wrapper width={props.width}>
      <div className="modal-content">{props.children}</div>
    </Wrapper>
  );
};

const Wrapper = styled.div<WrapperProps>`
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(54, 85, 118, 0.5);

  .modal-content {
    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
    transition: 0.3s;
    background-color: white;
    margin: 8% auto; /* 15% from the top and centered */
    padding: 5px;
    z-index: 900;
    width: ${({ width }) => (width ? width : "40%")};
  }

  .closeContainer {
    text-align: right;
    margin-right: 20px;
  }

  .close {
    color: black;
    float: right;
    font-size: 28px;
    font-weight: bold;
  }

  .close:hover,
  .close:focus {
    color: #aaa;
    text-decoration: none;
    cursor: pointer;
  }

  @media only screen and (max-width: 90em) {
    display: flex;
    justify-content: center;
    align-items: center;

    .modal-content {
      background-color: white;
      margin: 15% auto; /* 15% from the top and centered */
      padding: 5px;
      width: 95%;
    }
  }
`;

export default Modal;
