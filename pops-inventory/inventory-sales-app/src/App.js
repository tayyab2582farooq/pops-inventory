
import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [newSale, setNewSale] = useState({ product: "", quantity: "" });

  const apiBase = "https://sheetdb.io/api/v1/mljaguoaudovz";

  const fetchProducts = async () => {
    const res = await fetch(`${apiBase}/search?sheet=Products`);
    const data = await res.json();
    setProducts(data);
  };

  const fetchSales = async () => {
    const res = await fetch(`${apiBase}?sheet=Sales`);
    const data = await res.json();
    setSales(data);
  };

  useEffect(() => {
    fetchProducts();
    fetchSales();
  }, []);

  const handleSaleSubmit = async (e) => {
    e.preventDefault();
    if (!newSale.product || !newSale.quantity) return;

    await fetch(`${apiBase}?sheet=Sales`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: [newSale],
      }),
    });

    setNewSale({ product: "", quantity: "" });
    fetchSales();
  };

  return (
    <div className="App">
      <h1>Inventory & Sales Management</h1>
      <div className="section">
        <h2>Products</h2>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Cost</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.stock}</td>
                <td>{p.price}</td>
                <td>{p.cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section">
        <h2>Sales</h2>
        <form onSubmit={handleSaleSubmit}>
          <input
            type="text"
            placeholder="Product"
            value={newSale.product}
            onChange={(e) => setNewSale({ ...newSale, product: e.target.value })}
          />
          <input
            type="number"
            placeholder="Quantity"
            value={newSale.quantity}
            onChange={(e) => setNewSale({ ...newSale, quantity: e.target.value })}
          />
          <button type="submit">Add Sale</button>
        </form>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
            </tr>
          </thead>
          <tbody>
            {sales.map((s, i) => (
              <tr key={i}>
                <td>{s.product}</td>
                <td>{s.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
