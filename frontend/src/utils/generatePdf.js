import jsPDF from "jspdf";
import "jspdf-autotable";
const generatePDF = ({ jsonData }) => {
  const doc = new jsPDF();
  // console.log("JSON DATA FROM PDF: ", jsonData);
  // Add Title
  // Title Styling
  doc.setFontSize(22);
  doc.setTextColor(54, 162, 235); // Lighter blue color for the title
  doc.text("Bill Summary", 14, 20);

  //   // Bill Information Section Styling
  doc.setFontSize(12);
  doc.setTextColor(60); // Dark gray for text

  // Add Bill Information
  doc.setFontSize(12);
  doc.text(`Bill Date: ${jsonData.bill_date}`, 14, 30);
  doc.text(`Bill Time: ${jsonData.bill_time}`, 14, 40);
  doc.text(`Customer Phone: ${jsonData.customer_phoneNumber}`, 14, 50);

  // Check if there’s data and if it has products
  if (jsonData.products) {
    const products = jsonData.products;

    // Prepare the data for the table
    const tableData = products.map((product, index) => [
      index + 1,
      product.product_name,
      product.unique_id,
      `Rs:  ${product.cost_price}`, // Add currency symbol
      product.quantity || 1, // Use quantity if available
    ]);

    // Custom Table Styling
    doc.autoTable({
      head: [["#", "Product Name", "Unique ID", "Cost Price", "Quantity"]],
      body: tableData,
      startY: 60,
      headStyles: { fillColor: [54, 162, 235] }, // Lighter blue header
      alternateRowStyles: { fillColor: [245, 251, 255] }, // Very light gray rows
      margin: { left: 14, right: 14 },
      styles: {
        fontSize: 10,
        cellPadding: 3,
        textColor: 30,
        lineColor: [220, 220, 220],
        lineWidth: 0.1,
      },
    });

    //     // Total amount styling
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text(
      `Total Bill: Rs ${jsonData.total_amount}`,
      14,
      doc.lastAutoTable.finalY + 15
    );
    doc.setFont("helvetica", "normal");
  }

  // Save the PDF locally
  doc.save("BillSummary.pdf");
};
export default generatePDF;
