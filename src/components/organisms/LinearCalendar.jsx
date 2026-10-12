import styled from "styled-components";
import { MdOutlineNavigateNext, MdArrowBackIos } from "react-icons/md";
import { useEffect } from "react";
import { useOperations } from "../../index";
const months = [
  "Enero",
  "Febrero",
  "Marzo",
  "Abril",
  "Mayo",
  "Junio",
  "Julio",
  "Agosto",
  "Septiembre",
  "Octubre",
  "Noviembre",
  "Diciembre",
];

let date = new Date(),
  currYear = date.getFullYear(),
  currMonth = date.getMonth();
export function LinearCalendar({
  value,
  setValue,
  setDateFormat
 
}) {
  const { categoryColor,setMonth ,setYear} = useOperations();
  function initCalendar() {
    setValue(months[currMonth] + currYear);
    let month = "";
    if (currMonth + 1 < 10) {
      month = "0" + (currMonth + 1);
    } else {
      month = currMonth + 1;
    }
    let dateFormat = month + "/" + currYear;
    setMonth(month);
    setYear(currYear);
    setDateFormat(dateFormat);
  }
  function goForward() {
    currMonth += 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    initCalendar();
  }
  function goBack() {
    currMonth -= 1;
    if (currMonth < 0 || currMonth > 11) {
      date = new Date(currYear, currMonth, new Date().getDate());
      currYear = date.getFullYear();
      currMonth = date.getMonth();
    } else {
      date = new Date();
    }
    initCalendar();
  }

  useEffect(() => {
    initCalendar();
    // runs once on mount; initCalendar is recreated on every render
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <Container className="wrapper" $colortext={categoryColor}>
      <header>
       
        <div className="subcontainer">
          <span onClick={goBack} className="back">
            <MdArrowBackIos />
          </span>
          <section className="contentValue">
            <p>{value.toString()}</p>
          </section>

          <span onClick={goForward} className="forward">
            <MdOutlineNavigateNext />
          </span>
        </div>
      </header>
    </Container>
  );
}
const Container = styled.div`
  width: 450px;
  border-radius: 10px;
  height: 100%;
  display: flex;
  justify-content: center;
  header {
    display: flex;
    align-items: center;
    padding: 25px 30px 10px;
    justify-content: space-between;
    height: 100%;

    .subcontainer {
     
      display: flex;
      color: ${(props) => props.$colortext};
      align-items: center;
      justify-content: center;
     
      .contentValue {
        border: 2px solid ${(props) => props.$colortext};
        border-radius: 30px;
        text-align: center;
        display: flex;
        align-items: center;
        padding: 10px;
      }
      .back {
        cursor: pointer;
        margin-left: 20px;
        svg {
          width: 30px;
          height: 30px;
        }
      }
      .forward {
        cursor: pointer;
          margin-right:20px;
        svg {
          width: 45px;
          height: 45px;
        }
      }
    }
    .current-date {
      font-size: 1.45rem;
      font-weight: 500;
    }
  }
`;
