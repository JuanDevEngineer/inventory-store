import styled from "styled-components";
import { Document, Page, Text, View, StyleSheet, PDFViewer } from "@react-pdf/renderer";
import { useCurrentCompany } from "../../../hooks/queries/useSession";
import { useValuedInventoryReport } from "../../../hooks/queries/useReports";

function ValuedInventory() {
  const { data: companyData } = useCurrentCompany();
  const { data, isLoading, error } = useValuedInventoryReport(companyData?.id);
  if (isLoading) {
    return <span>cargando</span>;
  }
  if (error) {
    return <span>Error {error.message}</span>;
  }
 // Calculate the grand total
 const grandTotal = data?.reduce((acc, item) => acc + item.total, 0) || 0;

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
        {rowData.description}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.stock}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.purchase_price}
      </Text>
      <Text style={[styles.cell, isHeader && styles.headerCell]}>
        {rowData.total}
      </Text>
    </View>
  );
  return (
    <Container>
      <PDFViewer className="pdfviewer">
        <Document title="Reporte de stock todos">
          <Page size="A4" orientation="portrait">
            <View style={styles.page}>
              <View style={styles.section}>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Inventario valorado
                </Text>
                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: "ultrabold",
                    marginBottom: 10,
                  }}
                >
                  Total: {grandTotal}
                </Text>
                <Text>Fecha y hora del reporte: {formattedDate}</Text>
                <View style={styles.table}>
                  {renderTableRow(
                    {
                      description: "Producto",
                      stock: "Stock",
                       purchase_price:"Precio",
                      total:"Total"
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
  .pdfviewer {
    width: 100%;
    height: 100%;
  }
`;
export default ValuedInventory;
