import { ViewIcon } from '@chakra-ui/icons';
import { Button, IconButton, Image, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useDisclosure } from '@chakra-ui/react'
import React from 'react'

const ProfileModel = ({user,children}) => {
    const { isOpen , onOpen, onClose } = useDisclosure();

  return (
    <>
      {children?(
        <span onClick={onOpen}>{children}</span>
      ):(
        <IconButton
        display={{base:"flex"}}
        icon={<ViewIcon/>}
        onClick={onOpen}        
        />
      )}

      <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent h="350px" w="450px" backgroundColor="gray.100">
          <ModalHeader
            fontSize="38px"
            fontFamily="Work"
            display="flex"
            justifyContent="center"
            padding={1}
          >
            {user?.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-around"
          >
            <Image
              borderRadius="50%"
              boxSize="150px"
              src={user?.pic}
              alt={user?.name}
            />
            <Text
              fontSize={{ base: "28px", md: "30px" }}
              fontFamily="Work sans"
              pt={2}
            >
              Email: {user?.email}
            </Text>
          </ModalBody>
          <ModalFooter>
            <Button 
            //    p={2}
                backgroundColor="blue.300"
                _hover={{
                backgroundColor: "gray.400", 
                }}  border="2px" borderColor="blue.400"  
                onClick={onClose} 
                >
                Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default ProfileModel
