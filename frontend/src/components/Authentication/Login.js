import React,{ useState } from 'react'
import { VStack, FormControl, FormLabel, Input, InputGroup, InputRightElement, Button } from '@chakra-ui/react'
import { useToast } from '@chakra-ui/react'
import axios from "axios";
import { useHistory } from "react-router";


const Login = () => {
        const [show,setShow]=useState(false);
       
        const [email,setEmail]=useState();
        
        const [password,setPassword]=useState();
        const[loading,setLoading]=useState(false);
         const toast = useToast();
        const history=useHistory();

        const handleclick=()=>setShow(!show);
    
        // const SubmitHandler=()=>{};

        const submitHandler = async () => {
            setLoading(true);
            if (!email || !password) {
            toast({
                title: "Please Fill all the Feilds",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            return;
            }

            try {
            const config = {
                headers: {
                "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "/api/user/login",
                { email, password },
                config
            );

            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            // setUser(data);
            localStorage.setItem("userInfo", JSON.stringify(data));
            window.dispatchEvent(new Event("storage"));
            setLoading(false);
            history.push("/chats");
            } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setLoading(false);
            }
        };

  return (
   <VStack spacing='5px'>
           
           <FormControl id="email" isRequired>
               <FormLabel>Email</FormLabel>
               <Input 
               value={email}
               placeholder='Enter Your Email'
               onChange={(e)=>setEmail(e.target.value)}
               />
           </FormControl>
   
           <FormControl id="password" isRequired>
               <FormLabel>Password</FormLabel>
               <InputGroup>
                   <Input 
                   type={show? "text" : "password"}
                   placeholder='Enter Your Password'
                   value={password}
                   onChange={(e)=>setPassword(e.target.value)}
                   />
                   <InputRightElement width="4.5rem">
                   <Button h="1.75rem" size="sm" onClick={handleclick}>
                       {show ? "Hide":"Show"}
                   </Button>
                   </InputRightElement>
               </InputGroup>
           </FormControl>
   
           <Button backgroundColor="red.450" color="white" colorScheme='red'  width="50%" style={{marginTop:14}}  onClick={submitHandler} isLoading={loading} >
               Login
           </Button>

           <Button
            // variant="solid"
            // backgroundColor="red.450" 
            color="white" 
             width={["100%", "75%", "50%"]} 
            colorScheme='blue'  
             whiteSpace="normal"
            // width="50%"
             style={{marginTop:14}}
            onClick={()=>{
                setEmail("guest@example.com");
                setPassword("6767");
            }}

            
            >
            Get Guest User Credentials
           </Button>
   
       </VStack>
  )
}

export default Login
