import { Avatar, Box, Button, Drawer, DrawerBody, DrawerContent, DrawerHeader, DrawerOverlay, Input, Menu, MenuButton, MenuDivider, MenuItem, MenuList, Spinner, Text, Tooltip, useDisclosure, useToast } from '@chakra-ui/react';
import React, { useState } from 'react'
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { ChatState } from '../../Context/ChatProvider';
import ProfileModel from './ProfileModel';
import { useHistory } from "react-router-dom";
import axios from 'axios';
import ChatLoading from '../ChatLoading';
import UserListItem from '../UserAvatar/UserListItem';
import { getSender } from '../../config/ChatLogic';
import NotificationBadge from  "react-notification-badge";
import {Effect} from  "react-notification-badge";

const SideDrawer = () => {
    const [search,setSearch] = useState("");
    const [searchResult,setSearchResult] = useState([]);
    const [loading,setLoading] = useState(false);
    const [loadingChat,setLoadingChat] = useState();

    const {user, setSelectedChat , chats,setChats , notification,setNotification} = ChatState();
    const history = useHistory();
    const toast = useToast();

     const { isOpen , onOpen, onClose } = useDisclosure();

    const logoutHandler = () => {
        localStorage.removeItem("userInfo");
        history.push("/");
    };

    const handleSearch = async() =>{
        if(!search){
            toast({
                title:"Please Enter something in Search",
                status:"warning",
                duration:3000,
                isClosable:true,
                position:"top-left"
            })
            return;
        }

        try {
            setLoading(true);

            const config = {
                headers:{
                    Authorization:`Bearer ${user.token}`,
                },
            };

            const { data } = await axios.get(`/api/user?search=${search}`,config);

            if (data.length === 0) {
                toast({
                    title: "No users found",
                    status: "info",
                    duration: 3000,
                    isClosable: true,
                    position: "top-left",
                });
            } else {
                setSearchResult(data);
            }
            // setSearchResult(data);
        } catch (error) {
            toast({
                title:"Error Occured",
                description:"Failed to Load the Search Results",
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom-left",
            })
        }
        setLoading(false);
    }

    const accessChat = async (userId)=>{
        try {
            setLoadingChat(true);
            const config = {
                headers:{
                    "Content-type":"application/json",
                    Authorization:`Bearer ${user.token}`,
                }
            };

            const { data } = await axios.post("/api/chat",{ userId },config);
            
             if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
            setSelectedChat(data);
            setLoadingChat(false);
            onClose();

        } catch (error) {
            toast({
                title:"Error fetching the chat",
                description:error.message,
                status:"error",
                duration:3000,
                isClosable:true,
                position:"bottom-left",
            })
        }
    }

  return <>
    <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="pink.200"
        w="100%"
        p="5px 10px 5px 10px"
        borderWidth="5px"
    >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
           <Button variant="ghost" onClick={onOpen} backgroundColor="gray.100" _hover={{
                backgroundColor: "blue.500" , 
                }} border="2px" borderColor="blue.400">
                     <i className="fas fa-search"></i>
                    <Text
                         display={{ base: "none", md: "flex" }} 
                        px="4"
                    >
                        Search User
                    </Text>
           </Button>
        </Tooltip>

                <Text fontSize={['2xl', '3xl', '4xl']} 
                fontFamily="cursive" color="blue.900">
                    Chit Chat
                </Text>
           

        <div>
            <Menu>
                 <MenuButton p={1}>
                     {/* <NotificationBadge
                        count={notification?.length}
                        effect={Effect.SCALE}
                    /> */}
                    <NotificationBadge
                        count={notification?.length || 0} 
                        effect={Effect.SCALE} 
                    />
                    <BellIcon fontSize={['xl', '2xl', '3xl']} />
                </MenuButton>
                <MenuList pl={2}>
                    {notification.length === 0 && "No New Messages"}
                    {notification?.map((notif)=>(
                        <MenuItem 
                        key={notif._id}
                        onClick={()=>{
                            setSelectedChat(notif.chat);
                            setNotification(notification.filter((n)=>n!==notif));
                        }}
                        >
                            {notif.chat.isGroupChat
                              ? `New Message in ${notif.chat.chatName}`
                              : `New Message from ${getSender(user,notif.chat.users)}`}
                        </MenuItem>
                    ))}
                </MenuList>
            </Menu>
            <Menu>
                <MenuButton as={Button} rightIcon={<ChevronDownIcon/>} 
                            _hover={{
                            backgroundColor: "blue.500",}} borderWidth="2px" borderColor="blue.400" >
                    <Avatar size='sm' cursor="pointer" name={user.name} src={user.pic} />
                </MenuButton>
                <MenuList>
                    <ProfileModel user={user}>
                       <MenuItem>My Profile</MenuItem>{" "}
                    </ProfileModel>
                    <MenuDivider/>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
            </Menu>
        </div>
    </Box>


    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
            <DrawerOverlay/>
            <DrawerContent backgroundColor="rgb(209, 222, 228)" >
                <DrawerHeader borderBottomWidth="3px" color="blue.900" fontSize="3xl" pr={4}  >Search Users</DrawerHeader>
                <DrawerBody>
                    <Box display="flex" pb={2} >
                        <Input
                            placeholder="Search by name or email"
                            mr={1}
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                        <Button 
                            backgroundColor="blue.400"
                            _hover={{
                                backgroundColor: "blue.700",
                                color: "white" 
                                }} 
                                onClick={handleSearch}
                        >Go</Button>

                    </Box>
                    {loading ? <ChatLoading/>:
                    (
                        searchResult?.map(user=>(
                            <UserListItem
                            key={user._id}
                            user={user}
                            handleFunction={()=>accessChat(user._id)}
                            />
                        ))
                    )
                    }
                    {loadingChat && <Spinner ml="auto" display="flex" />}
                </DrawerBody>

            </DrawerContent>

    </Drawer>
  </>
}

export default SideDrawer
