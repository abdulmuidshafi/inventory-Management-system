import React, { useState, useEffect, useRef } from "react";
import {
  Card, 
  Table,
  Button,
  Dropdown,
  DropdownButton,
  Form,
  FormControl,
  Alert,
  Badge, 
} from "react-bootstrap"; 
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "./PrintInvoice";

const SaleList = () => {
  const [sales, setSales] = useState([ ]);
  const [searchName, setSearchName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  // const [selectedToPrint,setSelectedToPrint] = useState("")
  // const [invoiceFormVisible, setInvoiceFormVisible] = useState("True");
  // const [selectedSale, setSelectedSale] = useState(null);
  const invoiceFormRef = useRef(null);
  //const filteredSales = filterSalesByCustomerName();
  const navigate = useNavigate();
// console.log(sales);
  useEffect(() => {
    fetchSales();
  }, []);
// console.log(selectedToPrint);
  const fetchSales = () => {
    AxiosInstance.get("/sales")
      .then((response) => response.data)
      .then((data) => {
        setSales(data);
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
      });
  };
let startIndex = (currentPage-1)*2;
let endIndex = currentPage*2
// console.log(sales);
  const filterSalesByCustomerName = () => {
    const filteredSales = sales.filter((sale) =>
      sale.customer_name.toLowerCase().includes(searchName.toLowerCase())
    );
    return filteredSales;
  };
// console.log(sales);
  const handleSearch = (e) => {
    e.preventDefault();
    const filteredSales = filterSalesByCustomerName();
    setSales(filteredSales);
  };

  const calculateTotal = (items) => {
    let total = items.reduce(
      (accumulator, item) => accumulator + item.product.price * item.quantity,
      0
    );
    return total;
  };

  const confirmPayment = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
        // Implement your logic here to confirm the payment for the given saleId
        // You can make an API call or update the payment status in the database
        try {
          AxiosInstance.post(`/sales/${saleId}/confirmsale`)
         const updatedSales = sales.map((sale) => {
          if (sale._id === saleId) {
            return { ...sale, status: "complete" };
          }
          return sale;
        });

        setSales(updatedSales); 
        } catch (error) {
          alert("unable to confirm")
        }
        
        // For example, you can update the payment status directly in the state
        
      }
    }
  };

  const returnProduct = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
        // Implement your logic here to handle returning the product for the given saleId

        // For example, you can make an API call or update the product status in the database
        try {
           AxiosInstance.post(`/sales/${saleId}/returnsale`)
           const updatedSales = sales.filter((sale) => sale._id !== saleId);
         setSales(updatedSales);
        } catch (error) {
          alert("unable to return")
        }
       
        // After handling the return, you can remove the sale from the state
        // 
      }
    }
  };
  // const printRef = useReactToPrint({
  //   content: () => document.getElementById(selectedToPrint),
  // });
  // const handlePrint = useReactToPrint({
  //   content: () => componentRef.current
  // });
  const childRef = useRef(null)
  const callChilfFunction = ()=>{
    if(childRef.current){
      childRef.current.printData()
    }
  }
  // console.log(sales);
  const handlePrintInvoice = () => {
    const invoiceContent = invoiceFormRef.current.querySelector(".invoice-content");
    printRef({ content: () => invoiceContent });
  };
  return (
    <div className="p-2">
    <Card className="mb-3 shadow-sm">
      <Card.Body>
        <div className="d-flex justify-content-between mb-3">
          <Button
            onClick={() => navigate("/sales/add")}
            variant="outline-primary"
            className="me-2"
          >
            {/*<BsPlusCircleFill />*/} Add Sale
          </Button>
          <Form onSubmit={handleSearch} className="d-flex align-items-center">
            <FormControl
              type="text"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
            />
            <Button variant="primary" type="submit">
              {/*<BsSearchFill />*/} Search
            </Button>
          </Form>
        </div>
        {showAlert && (
          <Alert variant="warning" onClose={() => setShowAlert(false)} dismissible>
            This action cannot be performed on a paid sale.
          </Alert>
        )}
        <div id="print-content">
          
        <Table hover size="sm" className="border border-striped rounded shadow-sm w-100">
        <thead>
  <tr>
    <th scope="col">ID</th>
    <th scope="col">Sale Order Time</th>
    <th scope="col">Status</th>
    <th scope="col">Seller</th>
    <th scope="col">Products</th>
    <th scope="col">Subtotal</th>
    <th scope="col">Total</th>
    <th scope="col">Customer Name</th>
    <th scope="col">Customer TIN</th>
    <th scope="col">Actions</th>
    <th scope="col">Print</th>
  </tr>
</thead>
  <tbody>
  {filterSalesByCustomerName().slice(startIndex, endIndex).map((sale, index) => (
  <tr key={sale._id} id={`printcontent${index}`}>
    <td>{index + 1}</td>
    <td>{sale.saleOrderTime}</td>
    <td>
      {sale.status === "complete" ? (
        <Badge pill bg="success">Paid</Badge>
      ) : (
        <Button
          variant="outline-primary"
          size="sm"
          onClick={() => confirmPayment(sale._id)}
        >
          Confirm Payment
        </Button>
      )}
    </td>
    <td>{sale?.seller?.name}</td>
    <td>
      <ul className="mb-0">
        {sale.items.map((item) => (
          <li key={item._id}>
            {item.product.name} - {item.quantity}
          </li>
        ))}
      </ul>
    </td>
    <td>{sale.subtotal}</td>
    <td>{calculateTotal(sale.items)}</td>
    <td>{sale.customer_name}</td>
    <td>{sale.customer_TIN}</td>
    <td>
      {sale.status !== "complete" && (
        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => returnProduct(sale._id)}
        >
          Return Product
        </Button>
      )}
    </td>
    <td>
      <div className="d-none">
<PrintInvoice key={[sale._id,sale.customer_name,Math.random(10000)]}  selectedSale={sale} ref={childRef} />
      </div>
      
      <button  className="btn-sccuss"
        onClick={callChilfFunction}
        // key={[sale._id,sale.customer_name,Math.random(10000)]}
      >
        Print
      </button>
      
      </td>
    {/* <td>
                <Button
                  variant="primary"
                  size="sm"
                  onClick={() => {
                    setSelectedSale(sale);
                    setInvoiceFormVisible(true);
                  }}
                >
                  View Invoice
                </Button>
              </td> */}
  </tr>
))}
  </tbody>
</Table>
<button disabled={currentPage === 1} onClick={()=>setCurrentPage(currentPage -1)}>pre</button>
<button disabled={currentPage ===Math.ceil(  sales.length/2)} onClick={()=>setCurrentPage(currentPage +1)}>next</button>
          {/* <DropdownButton as={Button} title="Export data" className="mt-3">
            <Dropdown.Item onClick={printRef}>Print to PDF</Dropdown.Item>
            <Dropdown.Item href="#">Export to Excel</Dropdown.Item>
            <Dropdown.Item href="#">Export to CSV</Dropdown.Item>
          </DropdownButton> */}
            {/* {invoiceFormVisible && ( */}
       {/* <Card className="mt-3">
          <Card.Header>Invoice</Card.Header>
          <Card.Body>
            <div className="invoice-content" ref={invoiceFormRef}>
            
              {selectedSale && (
                <>
                  <h5>Invoice Number: {selectedSale._id}</h5>
                  <p>Customer Name: {selectedSale.customer_name}</p>
                  <p>Customer TIN: {selectedSale.customer_TIN}</p>
                  <p>Sale Order Time: {selectedSale.saleOrderTime}</p>
                  <ul>
                    {selectedSale.items.map((item) => (
                      <li key={item._id}>
                        {item.product.name} - {item.quantity} - ${item.product.price}
                      </li>
                    ))}
                  </ul>
                  <p>Subtotal: ${selectedSale.subtotal}</p>
                  <p>Total: ${calculateTotal(selectedSale.items)}</p>
                  <Button variant="success" onClick={handlePrintInvoice}>
                    Print Invoice
                  </Button>
                </>
              )}
                          </div>
          </Card.Body>
        </Card>*/}
      {/* )} */}
     
        </div>
      </Card.Body>
    </Card>
  </div>

  );
};

export default SaleList;
