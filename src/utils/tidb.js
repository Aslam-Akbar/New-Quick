const API_BASE_URL = "https://ap-southeast-1.data.tidbcloud.com/api/v1beta/app/dataapp-KNjJdbVy/endpoint";

/**
 * Generic fetch wrapper for TiDB API
 * @param {string} endpoint - The API endpoint path (e.g., "/login")
 * @param {Object} options - Fetch options (method, headers, body, etc.)
 * @returns {Promise<any>} - The JSON response
 */
export const fetchTiDB = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultHeaders = {
    "Content-Type": "application/json",
  };

  const config = {
    ...options,
    headers: {
      ...defaultHeaders,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, config);
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("TiDB API Request Failed:", error);
    throw error;
  }
};

export const loginUser = async (email, password) => {
  // Assuming the endpoint expects a POST request with email and password
  // Adjust the endpoint path '/login' if the user provides a specific one later
  return fetchTiDB("/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
};
