import styled from "styled-components";
import { DateRange } from 'react-date-range';
import { Range } from 'react-date-range';
import { useState } from "react";


const SortBox = () => {
  const sevenDaysFromNow = new Date(new Date().setDate(new Date().getDate() + 6));
  
  const [showDateModal, setShowDateModal] = useState<boolean>(false)
  const [selectionRange, setSelectionRange] = useState<Range[]>([
    {
      startDate: new Date(),
      endDate: sevenDaysFromNow,
      key: 'selection'
    }
  ])
  

  return (
    <SortBoxWrapper>
      <div>
        <button className="preview-sort" type="button" onClick={() => setShowDateModal(prevState => !prevState)}>
          December 1 - 4
        </button>
      </div>
      {showDateModal && (
        <div className="preview-date-box">
          <DateRange
            editableDateInputs={true}
            onChange={item => setSelectionRange([item.selection])}
            moveRangeOnFirstSelection={false}
            showPreview={false}
            showDateDisplay={false}
            ranges={selectionRange}
          />
        </div>
      )}
    </SortBoxWrapper>
  );
};

const SortBoxWrapper = styled.div`
  position: relative;

  .preview-sort {
    width: 10rem;
    padding: 5px 10px;
    background-color: #d3d3d38a;
    text-align: center;
    outline: none;
    border: none;
  }

  .preview-date-box {
    position: absolute;
    border: 1px solid lightgray;
    left: -81px;
    z-index: 100;
    top: 51px;
  }
`;

export default SortBox;
