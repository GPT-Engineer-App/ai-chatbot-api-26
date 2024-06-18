import React, { useState } from "react";
import { Container, VStack, Input, Button, Text, Box, useColorMode, IconButton } from "@chakra-ui/react";
import { FaSun, FaMoon, FaPaperPlane } from "react-icons/fa";
import axios from "axios";

const IdeaManagementTool = ({ ideas }) => (
  <Box width="100%" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
    {ideas.map((idea, index) => (
      <Box key={index} mb={4}>
        <Text fontWeight="bold">{idea.name}</Text>
        <Text>Type of Business: {idea.type}</Text>
        <Text>Monetization: {idea.monetization}</Text>
        <Text>Domain: {idea.domain}</Text>
      </Box>
    ))}
  </Box>
);

const Index = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [ideas, setIdeas] = useState([]);
  const { colorMode, toggleColorMode } = useColorMode();

  const handleSendMessage = async () => {
    if (input.trim() === "") return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("https://api.publicapis.org/entries", { query: input });
      const botMessage = { sender: "bot", text: response.data.entries[0].Description };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      const errorMessage = { sender: "bot", text: "Sorry, something went wrong. Please try again." };
      setMessages([...messages, userMessage, errorMessage]);
    }

    setInput("");
  };

  return (
    <Container centerContent maxW="container.md" height="100vh" display="flex" flexDirection="column" justifyContent="center" alignItems="center">
      <IconButton
        aria-label="Toggle dark mode"
        icon={colorMode === "light" ? <FaMoon /> : <FaSun />}
        onClick={toggleColorMode}
        alignSelf="flex-end"
        mb={4}
      />
      <VStack spacing={4} width="100%">
        <Box width="100%" height="60vh" overflowY="auto" p={4} border="1px solid" borderColor="gray.200" borderRadius="md">
          {messages.map((message, index) => (
            <Box key={index} alignSelf={message.sender === "user" ? "flex-end" : "flex-start"} mb={2}>
              <Text bg={message.sender === "user" ? "blue.500" : "gray.500"} color="white" p={2} borderRadius="md">
                {message.text}
              </Text>
            </Box>
          ))}
        </Box>
        <Input
          placeholder="Describe your idea"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
        />
        <Button rightIcon={<FaPaperPlane />} colorScheme="blue" onClick={handleSendMessage}>
          Send
        </Button>
        <IdeaManagementTool ideas={ideas} />
      </VStack>
    </Container>
  );
};

export default Index;