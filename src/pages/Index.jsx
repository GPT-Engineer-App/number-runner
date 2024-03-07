import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, VStack, useToast, Heading, Text } from "@chakra-ui/react";

const Index = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState("");
  const toast = useToast();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://backengine-2ujs.fly.dev/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setAccessToken(data.accessToken);
      setIsLoggedIn(true);
      toast({
        title: "Login Successful",
        description: "You have successfully logged in.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: "Login Failed",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };

  if (isLoggedIn) {
    return (
      <VStack spacing={4} align="center" justify="center" height="100vh">
        <Heading>Welcome</Heading>
        <Text>Your access token is: {accessToken}</Text>
      </VStack>
    );
  }

  return (
    <Box width="100vw" height="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={8} maxWidth="500px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <form onSubmit={handleLogin}>
          <VStack spacing={4}>
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Button type="submit" colorScheme="blue" width="full">
              Login
            </Button>
          </VStack>
        </form>
      </Box>
    </Box>
  );
};

export default Index;
