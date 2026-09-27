import axiosInstance from "../utils/BaseUrl";

const API_URL = "/api/reviews";

// ================= CUSTOMER =================

// Add Review
export const createReview = async (reviewData, token) => {
  const response = await axiosInstance.post(
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
// PUBLIC API — token is not required
export const getProductReviews = async (productId) => {
  const response = await axiosInstance.get(
    `${API_URL}/product/${productId}`
  );

  return response.data;
};

// Get customer's reviews
export const getMyReviews = async (token) => {
  const response = await axiosInstance.get(
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
  const response = await axiosInstance.delete(
    `${API_URL}/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ================= FARMER =================

// Get farmer reviews
export const getMyFarmerReviews = async (token) => {
  const response = await axiosInstance.get(
    `${API_URL}/reviews`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};


// ================= ADMIN =================

// Get all reviews
export const getAllReviewsForAdmin = async (token) => {
  const response = await axiosInstance.get(
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
  const response = await axiosInstance.delete(
    `${API_URL}/admin/${reviewId}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return response.data;
};