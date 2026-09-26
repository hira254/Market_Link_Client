import axios from "axios";

const API_URL = "http://localhost:4000/api/reviews";

// Add Review
export const createReview = async (reviewData, token) => {
  const response = await axios.post(
    API_URL,
    reviewData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get reviews of a product
export const getProductReviews = async (productId, token) => {
  const response = await axios.get(
    `${API_URL}/product/${productId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Get customer's reviews
export const getMyReviews = async (token) => {
  const response = await axios.get(
    `${API_URL}/my`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Delete customer's review
export const deleteReview = async (reviewId, token) => {
  const response = await axios.delete(
    `${API_URL}/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Farmer reviews
export const getMyFarmerReviews = async (token) => {
  const response = await axios.get(
    `${API_URL}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Admin reviews
export const getAllReviewsForAdmin = async (token) => {
  const response = await axios.get(
    `${API_URL}/admin`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};

// Admin delete review
export const adminDeleteReview = async (reviewId, token) => {
  const response = await axios.delete(
    `${API_URL}/admin/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};