import React from 'react'
import ScrollableFeed from 'react-scrollable-feed'
import { ChatState } from '../Context/ChatProvider'
import { isLastMessage, isSameSender, isSameSenderMargin, isSameUser } from '../config/ChatLogic';
import { Avatar, Tooltip } from '@chakra-ui/react';
const ScrollableChat = ( {messages} ) => {
    const { user } = ChatState();
  return (
    <ScrollableFeed>
      {messages &&
       messages.map((m,i) => (
        <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages,m,i,user._id) ||
              isLastMessage (messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>

            )}

            <span
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#ADD8E6" :  "rgba(175, 225, 177, 0.92)"
                }`,
               
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
                marginLeft: isSameSenderMargin(messages,m,i,user._id),
                marginTop: isSameUser(messages,m,i,user._id)?3:10,
              }}
            >
                {m.content}
            </span>
        </div>
    ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat
