import React, { useState, useEffect } from "react";

const AddProduct = () => {
  const [imageUpload, setImageUpload] = useState(null);
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadMessage, setUploadMessage] = useState("");
  const [token, setToken] = useState("");

  // Token retrieval
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      // Handle authentication flow (e.g., redirect to login page)
      // console.error("Authentication token not found.");
    } else {
      setToken(storedToken);
    }
  }, []);

  const handleFileChange = (e) => {
    // Update imageUpload state with the selected file
    setImageUpload(e.target.files[0]);
  };

  const handleDescriptionChange = (e) => {
    // Update description state with the entered value
    setDescription(e.target.value);
  };

  const addProduct = async (e) => {
    e.preventDefault();
    setUploading(true);
    setUploadMessage("");

    try {
      if (!imageUpload) {
        throw new Error("Please select a file.");
      }

      const formData = new FormData();
      formData.append("image", imageUpload); // Use "imageUpload" key for the image file
      formData.append("caption", description); // Use "caption" key for the description

      const requestOptions = {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      };

      const response = await fetch(
        "https://prashilexports.onrender.com/photoupload",
        requestOptions
      );

      if (!response.ok) {
        const errorMessage = await response.text(); // Get error message from server response
        throw new Error(
          `Server responded with status ${response.status}: ${errorMessage}`
        );
      }

      const data = await response.json();
      setUploadMessage(data.message || "Upload successful");

      // Assuming data structure remains the same
      // console.log("Uploaded Image URL:", data.data.image.url);
      // console.log("Caption:", data.data.caption);
    } catch (error) {
      console.error("Error:", error.message);
      setUploadMessage(error.message || "An error occurred during upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="mb-4">Add Product</h1>
      <form onSubmit={addProduct}>
        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
          
            type="file"
            className="form-control"
            id="productImage"
            accept="image/*"
            onChange={handleFileChange}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="caption" className="form-label">
            Caption
          </label>
          <textarea
            className="form-control"
            id="caption"
            value={description}
            onChange={handleDescriptionChange}
            required
          ></textarea>
        </div>
        <button type="submit" className="btn btn-primary" disabled={uploading}>
          {uploading ? "Uploading..." : "Add Product"}
        </button>
      </form>
      {uploadMessage && <p>{uploadMessage}</p>}
      {imageUpload && (
        <div>
          <p>Uploaded Image: {imageUpload.name}</p>
          <img src={URL.createObjectURL(imageUpload)} alt="Uploaded Product" width='280' height='200'/>
        </div>
      )}
      <p>Description: {description}</p>
    </div>
  );
};

export default AddProduct;
