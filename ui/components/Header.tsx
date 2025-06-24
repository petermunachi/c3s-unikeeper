
import { ReactElement } from "react";
import styled from "styled-components";

interface Props {
  headerTitle: string;
  subTitle?: string;
  showIcon: boolean
}


const Header = ({ headerTitle, subTitle, showIcon }: Props): ReactElement => {
  return (
    <HeaderWrapper>
      <div className="container-fluid">
        <div className="flexbox">
          <div className="">
            <div className="right-container">
              {showIcon && (
                <div className="img-container">
                  <i className="bi bi-archive"></i>
                </div>
              )}
              <div className="text-container">
                <h1>{headerTitle}</h1>
                {subTitle && <small>{subTitle}</small>}
              </div>
            </div>
          </div>

        </div>
      </div>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`

  .flexbox {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .right-container {
    display: flex;
    align-items: center;
  }

  .img-container {
    background-color: #c2c7cd;
    border-radius: 100%;
    padding: .8rem 1rem;
    margin-right: 1rem;
  }

  .text-container h1 {
    font-size: 1.3rem;
    line-height: .8;
    text-transform: uppercase
  }

  .text-container small {
    font-size: .8rem;
    color: #b3bac1;
  }

  
`;

export default Header;
