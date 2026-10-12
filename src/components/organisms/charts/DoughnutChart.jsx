import styled from "styled-components";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);
export function DoughnutChart({ chartData, data,title }) {
  const style ={
    width:"400px"
  }
  return (
    <Container>
      <section >
        <Doughnut data={chartData} style={style}/>
      </section>
      <section>
        <h2>{title} por categoria</h2>
        {data.map((item, index) => {
          return (
            <ContentCards key={index}>
              <div className="descriptionContent">
                <span>{item.icon}</span>
                <span className="description">{item.description}</span>
              </div>
              <span>{item.total}</span>
            </ContentCards>
          );
        })}
      </section>
    </Container>
  );
}
const Container = styled.div`
display:flex;
flex-wrap:wrap;
justify-content:center;
align-items:center;
gap:18px;

`;
const ContentCards = styled.div`
display:flex;
justify-content:space-between;
.descriptionContent{
    display:flex;
    gap:10px;
}
`;
