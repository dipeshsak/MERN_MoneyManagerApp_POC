import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Input, FormControl, FormLabel, FormErrorMessage, Box, Heading, Text, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

import {loginApiCall} from '../utility/apicalls.js'

const LoginPage = ({ setIsAuthenticated }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [isLoggedIn,setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(()=>{
    localStorage.clear()
  },[])

  const onSubmit = async (data) => {
    console.log("Login Data:", data);
    let loginData = await loginApiCall(data)
    console.log("CHECL",loginData)
    if(loginData.status){
      localStorage.setItem("token",loginData.token)
      localStorage.setItem("userId",loginData.user._id)

    setIsAuthenticated(true);
    setIsLoggedIn(false);
    
    navigate("/home");
    }else{
    setIsAuthenticated(false);
    setIsLoggedIn(true);
    }
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} borderRadius="md" boxShadow="md" width="100%" maxWidth="400px">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Login
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.email} mb={4}>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              placeholder="Enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
            />
            <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={6}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <Button type="submit" colorScheme="blue" width="full">
            Login
          </Button>
        </form>

        { isLoggedIn ? <Text mt={2} color="red">Invalid Email or Password </Text>: ""}

        <Text mt={4} textAlign="center">
          Don't have an account?{" "}
          <Link href="/signup" color="blue.500">
            Sign Up
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;