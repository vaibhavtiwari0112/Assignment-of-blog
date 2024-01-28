import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import toast from "react-hot-toast";

const CreateBlog = () => {
  const id = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });

  // input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // form
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post("/api/v1/blog/create-blog", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
      else{
        toast.error("Blog not created");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width="50%"
        borderRadius={10}
        padding={4}
        margin="auto"
        boxShadow="10px 10px 20px #ccc"
        display="flex"
        flexDirection="column"
        marginTop="30px"
        backgroundColor="#fff"
      >
        <Typography
          variant="h2"
          textAlign="center"
          fontWeight="bold"
          color="#2196f3"
          mb={3}
        >
          Create A Post
        </Typography>
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", mb: 1 }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          multiline
          rows={4}
          required
        />
        <InputLabel sx={{ fontSize: "20px", fontWeight: "bold", mt: 2 }}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
        />
        <Button
          type="submit"
          color="primary"
          variant="contained"
          mt={3}
          sx={{ alignSelf: "flex-end" }}
        >
          SUBMIT
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlog;
