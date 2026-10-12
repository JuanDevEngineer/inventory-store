import styled from "styled-components";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import {
  SearchBar,
  GenericList,
  useProductsStore,
} from "../../../index";
import { useState } from "react";
import { useCurrentCompany } from "../../../hooks/queries/useSession";
import { useProducts } from "../../../hooks/queries/useProducts";
import { useKardexEntryExitReport } from "../../../hooks/queries/useReports";

function KardexEntryExit() {
  const [stateProductList, setStateProductList] = useState(false);
  const { search, setSearch, selectProduct, selectedProduct } = useProductsStore();
  const { data: companyData } = useCurrentCompany();
  const { data } = useKardexEntryExitReport(companyData?.id, selectedProduct?.id);
  const { data: productSearchData } = useProducts(companyData?.id, search);

  const styles = StyleSheet.create({
    page: { flexDirection: "row", position: "relative" },
    section: { margin: 10, padding: 10, flexGrow: 1 },
    table: { width: "100%", margin: "auto", marginTop: 10 },
    row: {
      flexDirection: "row",
      borderBottom: 1,
      borderBottomColor: "#121212",
      height: 24,
      borderLeftColor: "#000",
      borderLeft: 1,
      textAlign: "left",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    cell: {
      flex: 1,
      textAlign: "center",

      borderLeftColor: "#000",
      justifyContent: "flex-start",
      alignItems: "center",
    },
    headerCell: {
      flex: 1,
      backgroundColor: "#dcdcdc",
      fontWeight: "bold",
      justifyContent: "flex-start",
      alignItems: "center",
      textAlign: "center",
    },
  });
  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
  const renderTableRow = (rowData, isHeader = false) => (
    <View style={styles.row} key={rowData.id}>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.name}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.description}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.type}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.quantity}

      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.date}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
    </View>
  );
  return (
    <Container>
      <SearchBar
        onClick={() => setStateProductList(!stateProductList)}
        setSearch={setSearch}
      />
      {stateProductList && (
        <GenericList onClick={(p)=>{
          selectProduct(p)
          setSearch("")
        }}
          setState={() => setStateProductList(!stateProductList)}
          data={productSearchData}
        />
      )}

      <PDFViewer className="pdfviewer">
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="landscape">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                   Kardex - entrada y salida por producto
                </Text>
                <Text>Fecha y hora del reporte: {formattedDate}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      name: "Usuario",
                      description: "Producto",
                      type:"Tipo",
                      quantity:"Cantidad",
                      date:"Fecha",
                      stock: "Stock",
                    },
                    true
                  )}
                  {data?.map((movement) => renderTableRow(movement))}
                </View>
              </View>
            </View>
          </Page>
        </Document>
      </PDFViewer>
    </Container>
  );
}
const Container = styled.div`
  width: 100%;
  height: 80vh;
display:flex;
flex-direction:column;
gap:15px;
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
export default KardexEntryExit;
