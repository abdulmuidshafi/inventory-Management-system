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
  Pagination,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { useReactToPrint } from "react-to-print";
import PrintInvoice from "./PrintInvoice";

const SaleList = () => {
  const [sales, setSales] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);
  const invoiceFormRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSales();
  }, []);
  const fetchSales = () => {
    AxiosInstance.get("/sales")
      .then((response) => response.data)
      .then((data) => {
        const filteredSales = filterSalesByCustomerName(data);
        if (filteredSales.length === 0) {
          setShowAlert(true);
          navigate("/sales");
        } else {
          setShowAlert(false);
        }
        setSales(filteredSales);
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
      });
  };

  const filterSalesByCustomerName = (data) => {
    return data.filter((sale) =>
      sale.customer_name.toLowerCase().includes(searchName.toLowerCase())
    );
  };
  const handleNextPage = () => {
    if (currentPage < Math.ceil(sales.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredSalesOnPage = sales.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );
  // console.log(sales);
  const handleSearch = (e) => {
    e.preventDefault();
    fetchSales();
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
        try {
          AxiosInstance.post(`/sales/${saleId}/confirmsale`);
          const updatedSales = sales.map((sale) => {
            if (sale._id === saleId) {
              return { ...sale, status: "complete" };
            }
            return sale;
          });

          setSales(updatedSales);
        } catch (error) {
          alert("unable to confirm");
        }
      }
    }
  };

  const returnProduct = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
        try {
          AxiosInstance.post(`/sales/${saleId}/returnsale`);
          const updatedSales = sales.filter((sale) => sale._id !== saleId);
          setSales(updatedSales);
        } catch (error) {
          alert("unable to return");
        }
      }
    }
  };
  const childRef = useRef(null);
  const callChilfFunction = () => {
    if (childRef.current) {
      childRef.current.printData();
    }
  };
  const handlePrintInvoice = () => {
    const invoiceContent =
      invoiceFormRef.current.querySelector(".invoice-content");
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
              className="me-2 text-nowrap"
            >
              Add Sale
            </Button>
            <Form onSubmit={handleSearch} className="d-flex align-items-center">
              <FormControl
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button variant="primary" type="submit">
                Search
              </Button>
            </Form>
          </div>
          {showAlert && (
            <Alert
              variant="warning"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              No customer found with that name. Redirecting back to sales list.
            </Alert>
          )}
          <div id="print-content">
            <Table
              hover
              size="sm"
              responsive
              className="border border-striped rounded shadow-sm w-100"
            >
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
                {filteredSalesOnPage.map((sale, index) => (
                  <tr
                    key={sale._id}
                    id={`printcontent${index}`}
                    style={index % 2 ? { backgroundColor: "#f5f5f5" } : null}
                  >
                    <td>{index + 1}</td>
                    <td>{sale.saleOrderTime}</td>
                    <td>
                      {sale.status === "complete" ? (
                        <Badge pill bg="success">
                          Paid
                        </Badge>
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
                    <td>{sale?.subtotal}</td>
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
                        <PrintInvoice
                          key={[
                            sale._id,
                            sale.customer_name,
                            Math.random(10000),
                          ]}
                          selectedSale={sale}
                          ref={childRef}
                        />
                      </div>
                      <button
                        className="btn-sccuss"
                        onClick={callChilfFunction}
                        // key={[sale._id,sale.customer_name,Math.random(10000)]}
                      >
                        Print
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <Pagination className="mt-3">
              <Pagination.Prev
                disabled={currentPage === 1}
                onClick={handlePreviousPage}
              />
              {/* Dynamically generate page numbers based on calculations */}
              {Array.from({ length: Math.ceil(sales.length / pageSize) }).map(
                (_, index) => (
                  <Pagination.Item
                    key={index + 1}
                    active={currentPage === index + 1}
                    onClick={() => setCurrentPage(index + 1)}
                  >
                    {index + 1}
                  </Pagination.Item>
                )
              )}
              <Pagination.Next
                disabled={currentPage === Math.ceil(sales.length / pageSize)}
                onClick={handleNextPage}
              />
            </Pagination>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SaleList;
