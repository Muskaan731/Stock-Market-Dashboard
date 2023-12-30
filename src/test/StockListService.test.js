import axios from 'axios';
import StockListService from './StockListService';

jest.mock('axios');

const mockData = [
  { symbol: 'AAPL', latestPrice: 150 },
  { symbol: 'GOOGL', latestPrice: 2500 },
];

describe('StockListService', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('fetches successfully data from an API', async () => {
    axios.get.mockResolvedValue({ data: mockData });

    const symbols = await StockListService.getTop100Symbols();

    expect(symbols).toEqual(mockData);
    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(
      `https://cloud.iexapis.com/v1/ref-data/symbols?token=${StockListService.IEX_CLOUD_API_KEY}`
    );
  });

  it('handles errors during API fetch', async () => {
    const errorMessage = 'Network Error';
    axios.get.mockRejectedValue(new Error(errorMessage));

    await expect(StockListService.getTop100Symbols()).rejects.toThrow(errorMessage);
    expect(axios.get).toHaveBeenCalledTimes(1);
  });

});
