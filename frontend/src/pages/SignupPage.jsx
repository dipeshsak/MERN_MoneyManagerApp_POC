import React from "react";
import { useForm } from "react-hook-form";
import {
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Box,
  Heading,
  Text,
  Link,
  useToast
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import {signinApiCall} from '../utility/apicalls.js'


const SignupPage = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const toast = useToast();

  const onSubmit = async(data) => {
    delete data.confirmPassword
    // data['dateOfBirth']  = new Date(data.dateOfBirth);
    console.log("Signup Data:", data);

    let signinData = await signinApiCall(data)
        console.log("CHECL",signinData)
        if(signinData.status){
          navigate("/login");
          toast({
            title: "Account created successfully!",
            // description: "You have successfully signed up.",
            status: "success",
            duration: 3000, // Toast disappears after 3 seconds
            isClosable: true,
            position: "top-right",
          });
        }else{
          toast({
            title: "Something Went Wrong ! Please try again.",
            //  description: "You have successfully signed up.",
            status: "error",
            duration: 3000, // Toast disappears after 3 seconds
            isClosable: true,
            position: "top-right",
          });
        }

  };

  const validatePasswordMatch = (value) => {
    const password = watch("password");
    return value === password || "Passwords do not match";
  };

  return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh" bg="gray.100">
      <Box bg="white" p={8} borderRadius="md" boxShadow="md" width="100%" maxWidth="400px">
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Sign Up
        </Heading>
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormControl isInvalid={errors.username} mb={4}>
            <FormLabel>Username</FormLabel>
            <Input
              placeholder="Enter your username"
              {...register("username", { required: "Username is required" })}
            />
            <FormErrorMessage>{errors.username && errors.username.message}</FormErrorMessage>
          </FormControl>

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

          {/* Date of Birth Field */}
          <FormControl isInvalid={errors.dateOfBirth} mb={4}>
            <FormLabel>Date of Birth</FormLabel>
            <Input
              type="date"
              {...register("dateOfBirth", {
                required: "Date of birth is required",
              })}
            />
            <FormErrorMessage>{errors.dateOfBirth && errors.dateOfBirth.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.password} mb={4}>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              placeholder="Enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters",
                },
              })}
            />
            <FormErrorMessage>{errors.password && errors.password.message}</FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.confirmPassword} mb={6}>
            <FormLabel>Confirm Password</FormLabel>
            <Input
              type="password"
              placeholder="Confirm your password"
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: validatePasswordMatch,
              })}
            />
            <FormErrorMessage>{errors.confirmPassword && errors.confirmPassword.message}</FormErrorMessage>
          </FormControl>

          

          <Button type="submit" colorScheme="blue" width="full">
            Sign Up
          </Button>
        </form>
        <Text mt={4} textAlign="center">
          Already have an account?{" "}
          <Link href="/login" color="blue.500">
            Login
          </Link>
        </Text>
      </Box>
    </Box>
  );
};

export default SignupPage;
