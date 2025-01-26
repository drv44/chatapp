import React from 'react'
import { ChatState } from '../Context/ChatProvider'
import { Box } from '@chakra-ui/react';
import SingleChat from './SingleChat';

const ChatBox = ( {fetchAgain , setFetchAgain}) => {
  const { selectedChat }= ChatState();
  return (
    <Box display={{base:selectedChat? "flex":"none", md:"flex"}}
        alignItems="center"
        flexDir="column"
        p={3}
        // bg="rgb(240, 205, 218)"
        bg="rgb(194, 218, 218)"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderColor="blue.400"
        borderWidth="2px"
         marginBottom={2}
    >
      <SingleChat fetchAgain={fetchAgain} setFetchAgain = {setFetchAgain} />
    </Box>
  )
}

export default ChatBox
