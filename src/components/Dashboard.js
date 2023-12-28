// Dashboard.js
import React, { useState, useEffect } from 'react';
import StockListService from '../services/StockListService';
import StockMarketService from '../services/StockMarketService';
import StockChart from './StockChart';
import './Dashboard.css';

const Dashboard = ({ isDarkTheme, showSearchInput }) => {
  const [stock, setStock] = useState([]);
  const [selectedStock, setSelectedStock] = useState(null);
  const [historicalData, setHistoricalData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  useEffect(() => {
    const fetchStockData = async () => {
      try {
        const stockData = await StockListService.getTop100Symbols();
        setStock(stockData);
      } catch (error) {
        console.error('Error fetching stock names:', error);
      }
    };

    fetchStockData();
  }, []);

  const handleStockClick = async (symbol) => {
    try {
      const stockData = await StockMarketService.getStockData(symbol);
      const historicalData = await StockMarketService.getHistoricalData(symbol);
      setSelectedStock(stockData);
      setHistoricalData(historicalData);
    } catch (error) {
      console.error('Error fetching stock data:', error);
    }
  };

  const handleSearchInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSortClick = () => {
    const sortedStock = [...stock].sort((a, b) => {
      const priceA = a.latestPrice;
      const priceB = b.latestPrice;

      if (sortOrder === 'asc') {
        return priceB - priceA; // Sort in descending order
      } else {
        return priceA - priceB; // Sort in ascending order
      }
    });

    setStock(sortedStock);
    setSortOrder((prevOrder) => (prevOrder === 'asc' ? 'desc' : 'asc'));
  };

  const filteredStocks = stock.filter((stockItem) =>
    stockItem.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={`dashboard-container ${isDarkTheme ? 'dark-theme' : ''}`}>
      <div className="stock-list">
        <h3>Top 100 Stocks</h3>
        {showSearchInput && (
          <input
            className="searchStocks"
            type="text"
            placeholder="Search stocks..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
        )}
        <button
          className={`sortBtn ${filteredStocks.length > 0 ? '' : 'hidden'}`}
          onClick={handleSortClick}
        >
          Sort
        </button>
        <div className="stock-cards">
          {filteredStocks.map((stockItem, index) => (
            <div
              key={index}
              className="stock-card"
              onClick={() => handleStockClick(stockItem.symbol)}
            >
              <p className="stock-name">{stockItem.name}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="selected-stock">
        {selectedStock && (
          <div className="stock-details">
            <h3>Selected Stock</h3>
            <p className="stock-name">{selectedStock.companyName}</p>
            <p>Symbol: {selectedStock.symbol}</p>
            <p>Latest Price: ${selectedStock.latestPrice}</p>
          </div>
        )}
        {historicalData.length > 0 && (
          <div className="stock-chart">
            <h3>Stock Chart</h3>
            <StockChart historicalData={historicalData} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
