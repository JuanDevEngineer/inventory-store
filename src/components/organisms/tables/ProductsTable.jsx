import { useState } from 'react';
import styled from 'styled-components';
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from '@tanstack/react-table';
import Swal from 'sweetalert2';
import { FaArrowsAltV } from 'react-icons/fa';
import { TableActionsContent, Pagination, useProductsStore } from '../../../index';
import { v } from '../../../styles/variables';
import { Device } from '../../../styles/breakpoints';

export function ProductsTable({
  data = [],
  setIsFormOpen,
  setDataSelect,
  setAction,
}) {
  const [, setPage] = useState(1);
  const [, setData] = useState(data);
  const [columnFilters] = useState([]);

  const { deleteProduct } = useProductsStore();
  function handleDelete(p) {
    Swal.fire({
      title: '¿Estás seguro(a)(e)?',
      text: 'Una vez eliminado, ¡no podrá recuperar este registro!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteProduct({ id: p });
      }
    });
  }
  function handleEdit(data) {
    setIsFormOpen(true);
    setDataSelect(data);
    setAction('Edit');
  }
  const columns = [
    {
      accessorKey: 'description',
      header: 'Descripcion',
      cell: (info) => <span>{info.getValue()}</span>,
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },

    {
      accessorKey: 'min_stock',
      header: 'Stock min',
      enableSorting: false,
      cell: (info) => (
        <td data-title="Stock" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: 'category',
      header: 'Categoria',
      enableSorting: false,
      cell: (info) => {
        return (
          <td data-title="Categoria" className="ContentCell">
            <ColorContent
              color={info.row.original.color}
              className="categoryContent"
            >
              {info.getValue()}
            </ColorContent>
          </td>
        );
      },

      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: 'barcode',
      header: 'Cod.barras',
      enableSorting: false,
      cell: (info) => (
        <td data-title="Cod. barras" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: 'sale_price',
      header: 'Pr. venta',
      enableSorting: false,
      cell: (info) => (
        <td data-title="Precio venta" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: 'purchase_price',
      header: 'Pr. de compra',
      enableSorting: false,
      cell: (info) => (
        <td data-title="Precio compra" className="ContentCell">
          <span>{info.getValue()}</span>
        </td>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
    {
      accessorKey: 'actions',
      header: '',
      enableSorting: false,
      cell: (info) => (
        <td data-title="Acciones" className="ContentCell">
          <TableActionsContent
            onEdit={() => handleEdit(info.row.original)}
            onDelete={() => handleDelete(info.row.original.id)}
          />
        </td>
      ),
      enableColumnFilter: true,
      filterFn: (row, columnId, filterStatuses) => {
        if (filterStatuses.length === 0) return true;
        const status = row.getValue(columnId);
        return filterStatuses.includes(status?.id);
      },
    },
  ];
  const table = useReactTable({
    data: data ?? [],
    columns,
    state: {
      columnFilters,
    },
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    columnResizeMode: 'onChange',
    meta: {
      updateData: (rowIndex, columnId, value) =>
        setData((prev) =>
          prev.map((row, index) =>
            index === rowIndex
              ? {
                  ...prev[rowIndex],
                  [columnId]: value,
                }
              : row,
          ),
        ),
    },
  });
  if (data?.length == 0) return;
  return (
    <>
      <Container>
        <table className="responsive-table">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {header.column.columnDef.header}
                    {header.column.getCanSort() && (
                      <span
                        style={{ cursor: 'pointer' }}
                        onClick={header.column.getToggleSortingHandler()}
                      >
                        <FaArrowsAltV />
                      </span>
                    )}
                    {
                      {
                        asc: ' 🔼',
                        desc: ' 🔽',
                      }[header.column.getIsSorted()]
                    }
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className={`resizer ${
                        header.column.getIsResizing() ? 'isResizing' : ''
                      }`}
                    />
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((item) => (
              <tr key={item.id}>
                {item.getVisibleCells().map((cell) => (
                  <td key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          table={table}
          goToStart={() => table.setPageIndex(0)}
          page={table.getState().pagination.pageIndex + 1}
          setPage={setPage}
          max={table.getPageCount()}
        />
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
    /* max-width: ${v.bphomer}; */
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
            background-color: rgba(78, 78, 78, 0.12);
          }
        }
      }
      th[scope='row'] {
        @media (min-width: ${v.bplisa}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        }
        @media (min-width: ${v.bpbart}) {
          background-color: transparent;
          text-align: center;
          color: ${({ theme }) => theme.text};
        }
      }
      .ContentCell {
        text-align: right;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 50px;

        border-bottom: 1px solid rgba(161, 161, 161, 0.32);
        @media (min-width: ${v.bpbart}) {
          justify-content: center;
          border-bottom: none;
        }
        .categoryContent {
          color: ${(props) => props.color};
          background-color: ${(props) => props.color};
        }
      }
      td {
        text-align: right;
        @media (min-width: ${v.bpbart}) {
          border-bottom: 1px solid rgba(161, 161, 161, 0.32);
          text-align: center;
        }
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
const ColorContent = styled.div`
  color: ${(props) => props.color};
  border-radius: 8px;
  border: 1px dashed ${(props) => props.color};
  text-align: center;
  padding: 3px;
  width: 70%;
  @media ${Device.tablet} {
    width: 100%;
  }
`;
