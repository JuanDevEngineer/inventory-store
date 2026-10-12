import styled from "styled-components";
import { TableActionsContent, Pagination, useTransactionsStore } from "../../../index";
import Swal from "sweetalert2";
import { v } from "../../../styles/variables";
import { useState } from "react";
export function TransactionsTable({
  data,
  setIsFormOpen,
  setDataSelect,
  setAction,
}) {
  const [page, setPage] = useState(1);
  const [perPage] = useState(10);
  const { deleteTransaction } = useTransactionsStore();
  if (data == null) {
    return;
  }
  const mx = data.length / perPage;
  const max = mx < 1 ? 1 : mx;

  function handleDelete(p) {
    Swal.fire({
      title: "¿Estás seguro(a)(e)?",
      text: "Una vez eliminado, ¡no podrá recuperar este registro!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminar",
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteTransaction({ id: p.id });
      }
    });
  }
  function handleEdit(data) {
    setIsFormOpen(true);
    setDataSelect(data);
    setAction("Edit");
  }
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            <tr>
              <th scope="col">Situacion</th>
              <th scope="col">Fecha</th>
              <th scope="col">Descripcion</th>
              <th scope="col">Categoria</th>
              <th scope="col">Cuenta</th>
              <th scope="col">Valor</th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {data.map(item => {
              return (
                <tr key={item.id}>
                  <th scope="row">
                    <StatusIndicator
                      $bgcolor={item.status == "1" ? "#69e673" : "#b3b3b3"}
                    ></StatusIndicator>
                  </th>
                  <td  data-title="Fecha" >{item.date}</td>
                  <td data-title="Descripcion" >
                    {item.description}
                  </td>
                  <td data-title="Categoria" >{item.category}</td>
                  <td data-title="Cuenta">{item.account}</td>
                  <td data-title="Monto">{item.valueWithCurrency}</td>
                  <td data-title="Acciones" >
                    <TableActionsContent
                      onEdit={() => handleEdit(item)}
                      onDelete={() => handleDelete(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        <Pagination page={page} setPage={setPage} max={max} />
      </Container>
    </>
  );
}
const Container = styled.div`
  position: relative;

  margin: 5% 3%;
  @media (min-width: ${v.bpbart}) {
    margin: 2%;
  }
  @media (min-width: ${v.bphomer}) {
    margin: 2em auto;
    max-width: ${v.bphomer};
  }
  .responsive-table {
    width: 100%;
    margin-bottom: 1.5em;
    border-spacing: 0;
    @media (min-width: ${v.bpbart}) {
      font-size: 0.9em;
    }
    @media (min-width: ${v.bpmarge}) {
      font-size: 1em;
    }
    thead {
      position: absolute;

      padding: 0;
      border: 0;
      height: 1px;
      width: 1px;
      overflow: hidden;
      @media (min-width: ${v.bpbart}) {
        position: relative;
        height: auto;
        width: auto;
        overflow: auto;
      }
      th {
        border-bottom: 2px solid rgba(115, 115, 115, 0.32);
        font-weight: normal;
        text-align: center;
        color: ${({ theme }) => theme.text};
        &:first-of-type {
          text-align: center;
        }
      }
    }
    tbody,
    tr,
    th,
    td {
      display: block;
      padding: 0;
      text-align: left;
      white-space: normal;
    }
    tr {
      @media (min-width: ${v.bpbart}) {
        display: table-row;
      }
    }

    th,
    td {
      padding: 0.5em;
      vertical-align: middle;
      @media (min-width: ${v.bplisa}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bpbart}) {
        display: table-cell;
        padding: 0.5em;
      }
      @media (min-width: ${v.bpmarge}) {
        padding: 0.75em 0.5em;
      }
      @media (min-width: ${v.bphomer}) {
        padding: 0.75em;
      }
    }
    tbody {
      @media (min-width: ${v.bpbart}) {
        display: table-row-group;
      }
      tr {
        margin-bottom: 1em;
        @media (min-width: ${v.bpbart}) {
          display: table-row;
          border-width: 1px;
        }
        &:last-of-type {
          margin-bottom: 0;
        }
        &:nth-of-type(even) {
          @media (min-width: ${v.bpbart}) {
            background-color: rgba(151, 151, 151, 0.12);
          }
        }
      }
      th[scope="row"] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .Colordiv {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 80px;
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
        
      }
      td[data-type="currency"] {
        font-weight:600;
      }
      td[data-title]:before {
        content: attr(data-title);
        float: left;
        font-size: 0.8em;
        @media (min-width: ${v.bplisa}) {
          font-size: 0.9em;
        }
        @media (min-width: ${v.bpbart}) {
          content: none;
        }
      }
    }
  }
`;
const StatusIndicator = styled.div`
  display: flex;
  justify-content: center;
  &::before {
    content: "";
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${(props) => props.$bgcolor};
  }
`;
