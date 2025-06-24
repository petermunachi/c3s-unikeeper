import styled from "styled-components";

const Summary = () => {
  return (
    <SummaryWrapper>
      <div className="container-fluid">
        <h1 className="title">My Summary</h1>
        <div className="row align-items-center">
          <div className="col-md-4">
            <h3>Logged Pass Week</h3>
            <h4>10 h 1 m</h4>
          </div>
          <div className="col-md-4 add-border">
            <h3>Logged This Month</h3>
            <h4>32 h 55 m</h4>
          </div>
          <div className="col-md-4 add-border">
            <h3>Logged Total</h3>
            <h4>270 h 42 m</h4>
          </div>
        </div>
      </div>
    </SummaryWrapper>
  );
};

const SummaryWrapper = styled.div`
  .title {
    font-size: 0.8rem;
    color: #b3bac1;
  }

  .row {
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    padding: 0.5rem 0;
  }

  .col-md-4 {
    padding: 1rem .8rem;
  }

  .add-border {
    border-left: 1px solid lightgray
  }

  h3 {
    font-size: 0.8rem;
  }

  h4 {
    font-size: 1rem;
    color: #b3bac1;
  }
`;

export default Summary;
