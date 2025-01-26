import React, { useEffect } from 'react'
import { Box, Container } from '@chakra-ui/react'
import { Tab,TabList,TabPanel,TabPanels,Tabs } from '@chakra-ui/react'
import Login from '../components/Authentication/Login';
import SignUp from '../components/Authentication/Signup';
import { useHistory } from "react-router-dom";


const HomePage = () => {

    const history = useHistory();

    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("userInfo"));

        if(user) history.push("/chats");
    }, [history]);

  return (
   <Container maxW="xl" centerContent>
    <Box
        display="flex"
        justifyContent="center"
        p={1}
        bg={"blue.700"}
        opacity={0.9} 
        w="100%"
        m="24px 0 15px 0"
        borderRadius="lg"
        borderColor="blue.500"
        borderWidth="1px"
        textAlign="center"
        fontSize="4xl"
        color="white"
        fontFamily="work"
    >
    Chit-Chat
    </Box>
    <Box bg={"blue.700"}
        opacity={0.9} 
        w="100%" p={4}
        borderRadius="lg" 
        borderWidth="1px" 
        borderColor="blue.600" 
        color="white"
            marginBottom="15px"
         boxShadow="dark-lg">
        <Tabs variant='soft-rounded' >
        <TabList mb="1em">
            <Tab width="50%" color="white">Login</Tab>
            <Tab width="50%" color="white">Sign Up</Tab>
        </TabList>
        <TabPanels>
            <TabPanel>
                 <Login/>
            </TabPanel>
            <TabPanel>
                <SignUp/>
            </TabPanel>
        </TabPanels>
        </Tabs>
    </Box>


   </Container>
  )
}

export default HomePage
