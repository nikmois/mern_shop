import styled from "styled-components";

const Container = styled.div`
    height: 35px;
    background-color: #45c1f1;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 17px;
    font-weight: 600;
    @media screen and (max-width: 1150px) {
      font-size: 15px;
      height: 30px;
    }
    @media screen and (max-width: 900px) {
      font-size: 12px;
      height: 25px;
    }
`;

const Announcement = () => {
  return (
    <Container>
      Super Pakkumine! Tasuta kohaletoimetamine tellimustele üle 35€
    </Container>
  )
}

export default Announcement
