// import { Box, Button, Tooltip , Text, Menu, MenuButton, MenuList, MenuItem, MenuDivider, useDisclosure} from '@chakra-ui/react';
// // import { useToast } from '@chakra-ui/react'
// // import { MenuButton,NotificationBadge,BellIcon } from '@chakra-ui/react';
// import { Avatar } from '@chakra-ui/react'
// import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
// import React, { useState } from 'react'
// import { ChatState } from '../../Context/ChatProvider';
// import ProfileModel from './ProfileModel';
// import { useHistory } from 'react-router-dom';



// const SideDrawer = () => {
//     const [search,setSearch]= useState("");
//     const [searchResult,setSearchResult]=useState([]);
//     const [loading,setLoading]=useState(false);
//     const [loadingChat,setLoadingChat]=useState();
//     // const toast = useToast();
//     // const {user,setSelectectChat}

//     //  const {
//     //     user,
//     //     setSelectedChat,
//     //     notification,
//     //     setNotification,
//     //     chats,
//     //     setChats,
//     // } = ChatState();

//    const { isOpen, onOpen, onClose } = useDisclosure();
//     const { user } = ChatState();
//     const history= useHistory();
   

//       const logoutHandler = () => {
//         localStorage.removeItem("userInfo");
//         history.push("/");
//     };

    
   
//   return <>
//     <Box
//         display="flex"
//         justifyContent="space-between"
//         alignItems="center"
//         bg="gray.300"
//         w="100%"
//         p="5px 10px 5px 10px"
//         borderWidth="5px"
//     >
//         <Tooltip  label="Search Users to chat" hasArrow placement="bottom-end">
//             <Button variant="ghost" onClick={onOpen} backgroundColor="gray.400" _hover={{
//             backgroundColor: "blue.500", 
//             // Change to your desired blue color
//             }}  border="2px" borderColor="blue.400"> 

//                 <i className="fas fa-search"></i>
//               <Text 
//                 display={{ base: "none", md: "flex" }} 
//                     px="4"
//                 >
//                     Search User
//                </Text>
               
//             </Button>
//         </Tooltip>

//         <Text fontSize="2xl" fontFamily="Work sans">
//           Chit-Chat
//         </Text>

//         <div>
//            <Menu>
//             <MenuButton p={1}>
//                 <BellIcon fontSize="3xl" m={1} />
//             </MenuButton>
//             {/* menulist */}
//            </Menu>
//            <Menu>
//             <MenuButton 
//             as={Button}
//             rightIcon= {<ChevronDownIcon/>}

//             _hover={{
//             backgroundColor: "gray.400",}}
//             >
//                <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
//             </MenuButton>
//             <MenuList>
//                 <ProfileModel user={user}>
//                   {/* <MenuItem>My Profile</MenuItem> */}
//                   <MenuItem>My Profile</MenuItem>{" "}
//                 </ProfileModel>
//                 <MenuDivider/>
//                 <MenuItem onClick={logoutHandler}>Logout</MenuItem>
//             </MenuList>
//            </Menu>

//         </div>
//     </Box>

   
//   </>
// }

// export default SideDrawer

// <************side drawer end****************>

