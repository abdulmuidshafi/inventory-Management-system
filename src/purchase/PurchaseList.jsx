import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faCalendar, faMoneyBill, faSearch, faCar, faProcedures } from "@fortawesome/free-solid-svg-icons";
import { format } from "date-fns";
const PurchaseList = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [currentPage, setCurrentPage] = useState(2);
  const [pageSize, setPageSize] = useState(2);
  const [filteredPurchasesOnPage, setFilteredPurchasesOnPage] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = async () => {
    try {
      const response = await AxiosInstance.get("/purchases");
      const data = response.data;
      setPurchases(data);
      setFilteredPurchasesOnPage(data);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    }
  };

  const handleSearch = () => {
    const filteredPurchases = purchases.filter((purchase) =>
      purchase?.product?.name.toLowerCase().includes(searchName.toLowerCase())
    );
    setFilteredPurchasesOnPage(filteredPurchases);
    setCurrentPage(1);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(filteredPurchasesOnPage.length / pageSize)) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  const handleInputChange = (e) => {
    setSearchName(e.target.value);
    handleSearch();
  };

  const purchasesOnPage = filteredPurchasesOnPage.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <Card className="my-3 shadow-sm">
      <Card.Header>
        <h5 className="mb-0">Purchase List</h5>
        <Button
          variant="primary"
          size="sm"
          className="float-right"
          onClick={() => navigate("/purchase/add")}
        >
          <FontAwesomeIcon icon={faUser} /> Add Purchase
        </Button>
      </Card.Header>
      <Card.Body>
      

<div className="d-flex align-items-center mb-3">
  <Form className="mr-2">
    <Form.Control
      className="form-control-sm"
      type="text"
      placeholder="Search by product name"
      value={searchName}
      onChange={handleInputChange}
    />
  </Form>
  <Button variant="primary" onClick={handleSearch}>
    <FontAwesomeIcon icon={faSearch} /> Search
  </Button>
</div>

        <Table striped bordered hover size="sm" responsive className="my-rounded-table">
          <thead className="bg-primary text-white">
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Date Purchase</th>
            </tr>
          </thead>
          <tbody>
            {purchasesOnPage.map((purchase, index) => (
              <tr key={purchase._id} className={index % 2 === 0 ? "bg-light" : ""}>
                <td>{(currentPage - 1) * pageSize + index + 1}</td>
                <td> {purchase?.product?.name}</td>
                <td>
                  <FontAwesomeIcon icon={faCar} /> {purchase?.supplier?.name}
                </td>
                <td>
                  <FontAwesomeIcon icon={faMoneyBill} /> {purchase.unit_price}
                </td>
                <td>{purchase.quantity}</td>
         
                <td><FontAwesomeIcon icon={faCalendar} />  {format( purchase.createdAt, "HH:mm/MM/dd/yyyy")}</td>
              </tr>
            ))}
          </tbody>
        </Table>
        {filteredPurchasesOnPage.length > pageSize && (
          <Pagination className="mt-3">
            <Pagination.Prev disabled={currentPage === 1} onClick={handlePreviousPage} />
            <Pagination.Item active={currentPage === 1} onClick={() => setCurrentPage(1)}>
              1
            </Pagination.Item>
            {Array.from(
              { length: Math.ceil(filteredPurchasesOnPage.length / pageSize) - 1 },
              (_, index) => (
                <Pagination.Item
                  key={index + 2}
                  active={currentPage === index + 2}
                  onClick={() => setCurrentPage(index + 2)}
                >
                  {index + 2}
                </Pagination.Item>
              )
            )}
            <Pagination.Next
              disabled={
                currentPage === Math.ceil(filteredPurchasesOnPage.length / pageSize)
              }
              onClick={handleNextPage}
            />
          </Pagination>
        )}
      </Card.Body>
    </Card>
  );
};

export default PurchaseList;