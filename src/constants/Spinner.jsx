import {PulseLoader} from 'react-spinners';
import styled from 'styled-components';

const Spinner=()=>{
    return (
        <SpinnerWrapper>
            <PulseLoader color="blue" margin={5} size={15}></PulseLoader>
        </SpinnerWrapper>
    )
}

export default Spinner;

const SpinnerWrapper=styled.div`
    width:100vw;
    height:100vw;
    margin-top:500px;
    display:flex;
    z-index:999;
    flex-direction:column;
    align-items:center;
    justify-contents:center;
    
`;