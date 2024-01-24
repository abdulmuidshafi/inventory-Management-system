import React from 'react';
import { Table } from 'react-bootstrap';

function renderItemsTable({ items }) {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>Product</th>
          <th>Quantity</th>
          <th>Unit Price</th>
          <th>Total</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {items.map((item, index) => (
          <tr key={index}>
            <td>{item.product}</td>
            <td>{item.quantity}</td>
            <td>{item.unitPrice}</td>
            <td>{item.totalPrice}</td>
            <td>
              {/* Assuming a handleRemoveItem function exists in the parent component */}
              <button onClick={() => handleRemoveItem(index)}>Remove</button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default renderItemsTable;
