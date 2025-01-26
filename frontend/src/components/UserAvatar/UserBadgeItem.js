// import { CloseIcon } from '@chakra-ui/icons'
// import { Badge, Box } from '@chakra-ui/react'
// import React from 'react'

// const UserBadgeItem = ({user,handleFunction}) => {
//   return (
//    <Badge
//       px={2}
//       py={1}
//       borderRadius="lg"
//       m={1}
//       mb={2}
//       variant="solid"
//       fontSize={12}
//       colorScheme="blue"
//       cursor="pointer"
//       onClick={handleFunction}
//    >
//     {user.name}
//     <CloseIcon pl={1} />
//    </Badge>
//   )
// }

// export default UserBadgeItem


import { CloseIcon } from '@chakra-ui/icons';
import { Badge } from '@chakra-ui/react';
import React from 'react';

const UserBadgeItem = ({ user, admin, handleFunction }) => {
  return (
    <Badge
      px={2}
      py={1}
      borderRadius="lg"
      m={1}
      mb={2}
      variant="solid"
      fontSize={12}
      colorScheme={user?._id === admin?._id ? "purple" : "blue"} // Highlight admin with a different color
      cursor="pointer"
      onClick={handleFunction}
    >
      {user.name}
      {user?._id === admin?._id && " (Admin)"} {/* Add admin label */}
      <CloseIcon pl={1} />
    </Badge>
  );
};

export default UserBadgeItem;
