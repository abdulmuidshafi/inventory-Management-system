import React, { useState, useEffect } from "react";
import { Card, Table, Form, Button, Pagination } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AxiosInstance from "../api/AxiosInstance";
//
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faCalendar,
  faMoneyBill,
} from "@fortawesome/free-solid-svg-icons";

const PurchaseList = () => {
  const navigate = useNavigate();
  const [purchases, setPurchases] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(2);

  useEffect(() => {
    fetchPurchases();
  }, []);

  const fetchPurchases = () => {
    AxiosInstance.get("/purchases")
      .then((response) => response.data)
      .then((data) => setPurchases(data))
      .catch((error) => console.error("Error fetching purchases:", error));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const filteredPurchases = purchases.filter((purchase) =>
      purchase.product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setPurchases(filteredPurchases);
  };

  const handleNextPage = () => {
    if (currentPage < Math.ceil(purchases.length / pageSize)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const filteredPurchasesOnPage = purchases.slice(
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
          <i className="fas fa-plus"></i> Add Purchase
        </Button>
      </Card.Header>
      <Card.Body>
        <Form onSubmit={handleSearch} className="d-flex align-items-center">
          <Form.Control
            className="d-flex align-items-center form-control-sm"
            type="text"
            placeholder="Search by product name"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: "150px", marginLeft: "auto" }}
          />
          <Button variant="primary" type="submit">
            <i className="fas fa-search"></i> Search
          </Button>
        </Form>
        <Table
          striped
          bordered
          hover
          size="sm"
          responsive
          className="my-rounded-table"
        >
          <thead className="bg-primary text-white">
            <tr>
              <th>No</th>
              <th>Product</th>
              <th>Supplier</th>
              <th>Unit Price</th>
              <th>Quantity</th>
              <th>Timestamp</th>
            </tr>
          </thead>
          <tbody>
            {filteredPurchasesOnPage.map((purchase, index) => (
              <tr
                key={purchase._id}
                className={`${index % 2 === 0 ? "bg-light" : ""}`}
              >
                <td>{index + 1}</td>
                <td>{purchase?.product?.name}</td>
                <td>
                  {/*<FontAwesomeIcon icon={faUser} />*/}
                  {purchase?.supplier?.name}
                </td>
                <td>
                  <FontAwesomeIcon icon={faMoneyBill} />
                  {purchase.unit_price}
                </td>
                <td>{purchase.quantity}</td>
                <td>
                  <FontAwesomeIcon icon={faCalendar} />
                  {purchase.createdAt}
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
          <Pagination.Item
            active={currentPage === 1}
            onClick={() => setCurrentPage(1)}
          >
            1
          </Pagination.Item>
          {/* Show additional page numbers based on page size and total purchases */}
          <Pagination.Item
            active={currentPage === 2}
            onClick={() => setCurrentPage(2)}
          >
            2
          </Pagination.Item>
          {/* ... (Generate pagination items dynamically based on calculations) ... */}
          <Pagination.Next
            disabled={currentPage === Math.ceil(purchases.length / pageSize)}
            onClick={handleNextPage}
          />
        </Pagination>
      </Card.Body>
    </Card>
  );
};

export default PurchaseList;
