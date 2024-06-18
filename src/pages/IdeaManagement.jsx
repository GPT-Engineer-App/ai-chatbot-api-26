import React, { useState, useEffect } from "react";
import { Container, Box, Text, VStack, Heading } from "@chakra-ui/react";
import axios from "axios";

const IdeaManagement = () => {
  const [ideas, setIdeas] = useState([]);

  useEffect(() => {
    const fetchIdeas = async () => {
      try {
        const response = await axios.get("/api/ideas");
        setIdeas(response.data);
      } catch (error) {
        console.error("Error fetching ideas:", error);
      }
    };

    fetchIdeas();
  }, []);

  return (
    <Container maxW="container.lg" mt={10}>
      <Heading as="h1" size="xl" mb={6}>Idea Management Tool</Heading>
      <VStack spacing={4} align="stretch">
        {ideas.map((idea, index) => (
          <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
            <Text fontSize="xl" fontWeight="bold">{idea.name}</Text>
            <Text>Type of Business: {idea.typeOfBusiness}</Text>
            <Text>Monetization: {idea.monetization}</Text>
            <Text>Domain: {idea.domain}</Text>
          </Box>
        ))}
      </VStack>
    </Container>
  );
};

export default IdeaManagement;