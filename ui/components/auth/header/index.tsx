
import Image from "next/image";
import styled from "styled-components";

const AuthHeader = () => {
  return (
    <HeaderWrapper>
      <div className="text-container">
        <h1>UniKeeper</h1>
      </div> 
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  background-color: #3863a3;
  height: 30vh;
  display: flex;
  align-items: center;
  justify-content: center;
  
  .text-container h1 {
    color: white;
    font-size: 1rem;
    text-transform: uppercase;
  }

`;

export default AuthHeader;
