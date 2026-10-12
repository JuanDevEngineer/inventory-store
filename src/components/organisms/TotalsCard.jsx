import styled from "styled-components";
import { v, BtnCircular } from "../../index";
import { useCurrentUser } from "../../hooks/queries/useSession";
export function TotalsCard({ color, total, title, icon }) {
  const { data: userData } = useCurrentUser();
  return (
    <Container>
      <div className="textsContent">
        <section>
          <span className="title">{title}</span>
          <b>{<v.iconArrowDown />}</b>
        </section>
        <span className="total">
          {userData?.currency} {total}
        </span>
      </div>
      <div className="iconContent">
        <BtnCircular
          height="50px"
          width="50px"
          bgcolor={color}
          fontsize="25px"
          icon={icon}
          textcolor="#ffffff"
          translatex="-45px"
          translatey="-15px"
         
        />
      </div>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  align-items: center;
  background-color: ${({ theme }) => theme.bg};
  border-radius: 25px;
  padding: 20px;
  width: 100%;
  justify-content: space-between;
  .textsContent {
    display: flex;
    flex-direction: column;
    .title {
      font-size: 14px;
    }
    .total {
      font-size: 22px;
      font-weight: 500;
    }
    section{
      display:flex;
      gap:10px;
      display:flex;
      align-items:center;
    }
  }
  .iconContent {
    display: flex;
  }
`;
