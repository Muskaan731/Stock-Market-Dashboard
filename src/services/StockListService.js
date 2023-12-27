import axios from 'axios';

const IEX_CLOUD_API_KEY = 'pk_3af404fd17e1494680a168c86adb9db9';

const StockListService = {
  getTop100Symbols: async () => {
    try {
      const response = await axios.get(
        `https://cloud.iexapis.com/v1/ref-data/symbols?token=${IEX_CLOUD_API_KEY}`
      );
      const sortedSymbols = response.data.sort((a, b) => b.latestPrice - a.latestPrice);
      const limitedSymbols = sortedSymbols.slice(0, 100);
      return limitedSymbols;
    } catch (error) {
      console.error('Error fetching symbols:', error);
      throw error;
    }
  },
};

export default StockListService;
