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
<<<<<<< HEAD
  Pagination,
=======
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
  const [pageSize, setPageSize] = useState(2);
  const invoiceFormRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    fetchSales();
  }, []);
=======
  const invoiceFormRef = useRef(null);
  const navigate = useNavigate();
  // console.log(sales);
  useEffect(() => {
    fetchSales();
  }, []);
  // console.log(selectedToPrint);
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  const fetchSales = () => {
    AxiosInstance.get("/sales")
      .then((response) => response.data)
      .then((data) => {
<<<<<<< HEAD
        const filteredSales = filterSalesByCustomerName(data);
        if (filteredSales.length === 0) {
          setShowAlert(true);
          navigate("/sales");
        } else {
          setShowAlert(false);
        }
        setSales(filteredSales);
=======
        setSales(data);
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
      })
      .catch((error) => {
        console.error("Error fetching sales:", error);
      });
  };
<<<<<<< HEAD

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
=======
  let startIndex = (currentPage - 1) * 2;
  let endIndex = currentPage * 2;
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
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
=======
        // Implement your logic here to confirm the payment for the given saleId
        // You can make an API call or update the payment status in the database
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
=======

        // For example, you can update the payment status directly in the state
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
      }
    }
  };

  const returnProduct = (saleId) => {
    const sale = sales.find((sale) => sale._id === saleId);
    if (sale) {
      if (sale.status === "complete") {
        setShowAlert(true);
      } else {
<<<<<<< HEAD
=======
        // Implement your logic here to handle returning the product for the given saleId

        // For example, you can make an API call or update the product status in the database
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
        try {
          AxiosInstance.post(`/sales/${saleId}/returnsale`);
          const updatedSales = sales.filter((sale) => sale._id !== saleId);
          setSales(updatedSales);
        } catch (error) {
          alert("unable to return");
        }
<<<<<<< HEAD
      }
    }
  };
=======

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
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  const childRef = useRef(null);
  const callChilfFunction = () => {
    if (childRef.current) {
      childRef.current.printData();
    }
  };
<<<<<<< HEAD
=======
  // console.log(sales);
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
  const handlePrintInvoice = () => {
    const invoiceContent =
      invoiceFormRef.current.querySelector(".invoice-content");
    printRef({ content: () => invoiceContent });
  };
<<<<<<< HEAD


=======
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
              Add Sale
=======
              {/*<BsPlusCircleFill />*/} Add Sale
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
            </Button>
            <Form onSubmit={handleSearch} className="d-flex align-items-center">
              <FormControl
                type="text"
                value={searchName}
                onChange={(e) => setSearchName(e.target.value)}
              />
              <Button variant="primary" type="submit">
<<<<<<< HEAD
                Search
=======
                {/*<BsSearchFill />*/} Search
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
              </Button>
            </Form>
          </div>
          {showAlert && (
            <Alert
              variant="warning"
              onClose={() => setShowAlert(false)}
              dismissible
            >
<<<<<<< HEAD
              No customer found with that name. Redirecting back to sales list.
=======
              This action cannot be performed on a paid sale.
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
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
<<<<<<< HEAD
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
=======
                {filterSalesByCustomerName()
                  .slice(startIndex, endIndex)
                  .map((sale, index) => (
                    <tr key={sale._id} id={`printcontent${index}`}>
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
            <button
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              pre
            </button>
            <button
              disabled={currentPage === Math.ceil(sales.length / 2)}
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              next
            </button>
>>>>>>> fb44f3c374b42f5e8dde268f5719bfc6da22ed68
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default SaleList;
