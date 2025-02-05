import dummyValues from "./dummy/values.json";
import dummyUser from "./dummy/user.json";

const DUMMY_VALUES = dummyValues;
const DUMMY_USER = dummyUser;

export const backendApi = {
  /**
   * Get the total count of values
   * @returns {Promise<number>} The total number of values
   */
  valuesCount: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return DUMMY_VALUES.length;
  },

  /**
   * Get the total amount of ETH staked across all values
   * @returns {Promise<number>} The total ETH staked
   */
  totalStakedEth: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Sum up totalStaked from all values
    const total = DUMMY_VALUES.reduce(
      (sum, value) => sum + value.totalStaked,
      0
    );
    return total;
  },

  /**
   * Get the total rewards
   * @returns {Promise<number>} The total rewards
   */
  totalRewards: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 1200000; // 1.2M in rewards
  },

  /**
   * Get the total number of users who have staked on values
   * @returns {Promise<number>} The total number of contributors
   */
  totalUsers: async () => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return 100000; // 100k contributors
  },

  /**
   * Get paginated values with pagination metadata
   * @param {number} page - The page number (1-based)
   * @param {number} pageSize - Number of items per page
   * @param {string} sortBy - Field to sort by ('supporters', 'stake', 'newest', 'oldest')
   * @param {string} [address] - Optional wallet address to filter values where address has a stake
   * @returns {Promise<Object>} Object containing values array, current page and total pages
   */
  getValues: async (
    page = 1,
    pageSize = 10,
    sortBy = "stake",
    address = null
  ) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Filter values if address provided
    let filteredValues = [...DUMMY_VALUES];
    if (address) {
      const userValueIds = DUMMY_USER.values.map((value) => value.id);
      filteredValues = filteredValues.filter((value) =>
        userValueIds.includes(value.id)
      );
    }

    // Sort values
    filteredValues.sort((a, b) => {
      switch (sortBy) {
        case "supporters":
          return b.totalUsers - a.totalUsers;
        case "stake":
          return b.totalStaked - a.totalStaked;
        case "newest":
          return new Date(b.createdAt) - new Date(a.createdAt);
        case "oldest":
          return new Date(a.createdAt) - new Date(b.createdAt);
        default:
          return 0;
      }
    });

    // Calculate pagination metadata
    const totalItems = filteredValues.length;
    const totalPages = Math.ceil(totalItems / pageSize);
    const currentPage = Math.min(page, totalPages);

    // Calculate start and end indices
    const start = (currentPage - 1) * pageSize;
    const end = start + pageSize;

    // Return values with pagination metadata
    return {
      values: filteredValues.slice(start, end),
      currentPage,
      totalPages,
    };
  },

  /**
   * Get user data including their staked values
   * @param {string} address - Wallet address of the user
   * @returns {Promise<Object>} User object containing address and staked values
   */
  getUser: async (address) => {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return dummy user data from imported json
    return DUMMY_USER;
  },
};
