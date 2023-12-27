import axios from 'axios';

const IEX_CLOUD_API_KEY = 'pk_3af404fd17e1494680a168c86adb9db9';

const StockMarketService = {
  getStockData: async (symbol) => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/v1/stock/${symbol}/quote?token=${IEX_CLOUD_API_KEY}`
      );
      return response.data;
    } catch (error) {
      console.error('Error fetching stock data:', error);
      throw error;
    }
  },

  getHistoricalData: async (symbol) => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/v1/stock/${symbol}/chart/1m?token=${IEX_CLOUD_API_KEY}`
      );

      const historicalData = response.data.map((data) => ({
        date: data.date,
        close: data.close,
      }));

      return historicalData;
    } catch (error) {
      console.error('Error fetching historical data:', error);
      throw error;
    }
  },
};

export default StockMarketService;
