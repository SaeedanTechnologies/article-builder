import React, { useRef, useState, useEffect } from 'react';
import { StyledChat } from '../styles';
import { AppBar, Box, Button, Drawer, IconButton, List, ListItem, TextField, Toolbar, Typography, useTheme } from '@mui/material';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import Texts from './Texts';
import EmojiPicker from 'emoji-picker-react';
import KeyboardVoiceIcon from '@mui/icons-material/KeyboardVoice';
import MenuIcon from '@mui/icons-material/Menu';
import Pusher from 'pusher-js'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getSingleChat, sendChat, sendMessageAction } from '../../../store/actions/chatActions';
import { indexMessages, storeMessage } from '../../../store/actions/messageActions';
const ListData = ['Add a friend', 'Create Group', 'Block Contact', 'Unblock', 'Report', 'Unsend Message', 'Edit Message', 'Forward Messages', 'Sharing post'];

const Chat = (props) => {
  // console.log(props.convId, "Convvv")
  const [users, setUsers] = useState({});
  const [selectedEmoji, setSelectedEmoji] = useState('');
  const [newMessage, setNewMessage] = useState('');
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  const [isEmojiPickerOpen, setIsEmojiPickerOpen] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recordingTime, setRecordingTime] = useState(0);
  const [messages, setMessages] = useState([])
  const [chat, setChat] = React.useState([])
  const userId = useSelector((state) => state.admin.user.id)
  const messagesContainerRef = useRef(null);
  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);
  // console.log(userId)
  const getIndexMessages = () => {
    dispatch(indexMessages(props.convId)).then((result) => {
      setMessages(result.data.payload.messages.data)
      console.log(result.data.payload.messages.data, "Index Messages")
    }).catch((err) => {
      console.log(err)
    });
  }
  useEffect(() => {
    getIndexMessages()
    const intervalId = setInterval(() => {
      getIndexMessages();
    }, 2000);
    return () => clearInterval(intervalId);
  }, [props.convId])
  // const getChat = () => {
  //   dispatch(getSingleChat(props.userId)).then((result) => {
  //     console.log(result)
  //   }).catch((err) => {
  //     console.log(err)
  //   });
  // }
  // React.useEffect(()=> {
  // getChat()
  // }, [])
  const audioRef = useRef(null);
  const dispatch = useDispatch()
  const allMessages = []
  useEffect(() => {
    if (isRecording) {
      startRecording();
    } else {
      stopRecording();
    }
  }, [isRecording]);
  useEffect(() => {
    Pusher.logToConsole = true;

    const pusher = new Pusher("66a996d7c63fe6a9fac5", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe(`message-44`);
    // console.log(channel);
    channel.bind("new", (data) => {
      // console.log(JSON.stringify(data), '++++++++++++++');
      console.log(data, "This is Data binding here...........")
    })
  }, [])
  // console.log(messages, '+++++++++++++++')
  const startRecording = () => {
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          const recorder = new MediaRecorder(stream);
          recorder.ondataavailable = (event) => {
            if (event.data.size > 0) {
              setAudioChunks((chunks) => [...chunks, event.data]);
            }
          };

          recorder.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
            sendMessage(props.selectedUser.id, audioBlob);
            setAudioChunks([]);
            setRecordingTime(0);
          };

          recorder.start();
          setMediaRecorder(recorder);

          const interval = setInterval(() => {
            setRecordingTime((time) => time + 1);
          }, 1000);

          return () => {
            recorder.stop();
            clearInterval(interval);
          };
        })
        .catch((error) => {
          console.error('Error accessing microphone:', error);
        });
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
      const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
      if (audioBlob) {
        sendMessage(props.selectedUser.id, audioBlob);
      }

      // Reset audioChunks and recordingTime
      setAudioChunks([]);
      setRecordingTime(0);
    }
  };

  const handleRecordButtonClick = () => {
    setIsRecording(true);
  };

  const handleEmojiButtonClick = () => {
    setIsEmojiPickerOpen(!isEmojiPickerOpen);
  };

  const handleEmojiSelect = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.emoji);
    setIsEmojiPickerOpen(false);
  };

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  const sendMessage = (userId, message) => {
    setUsers((prevUsers) => ({
      ...prevUsers,
      [userId]: [...(prevUsers[userId] || []), { text: message }],
    }));
    const formData = new FormData()
    formData.append('text', message)
    formData.append('coversation_id', props.convId)
    formData.append('type', 'text')
    // console.log(userId)
    dispatch(storeMessage(formData)).then((result) => {
      getIndexMessages()
      // console.log(result, "Store Message")
    }).catch((err) => {
      console.log(err)
    });
    setNewMessage('');
  };

  const theme = useTheme();

  // const userMessages = users[props.selectedUser.id] || [];

  return (
    <StyledChat>
      <AppBar position='static' sx={{ background: theme.palette.secondary.main, width: "100%" }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Typography fontWeight="bold" variant='h6'>
              {props.selectedUser ?
                props.selectedUser.participants[0].messageable.name :
                'Loading..'
              }
            </Typography>
            <FiberManualRecordIcon sx={{ fontSize: '15px', ml: 1, color: '#88EF01' }} />
          </Box>
          <Box>
            <IconButton onClick={handleDrawerOpen} sx={{ color: "white" }}>
              <MenuIcon />
            </IconButton>
            <Drawer
              open={isDrawerOpen}
              anchor="right"
              onClose={handleDrawerClose}
              PaperProps={{
                style: {
                  width: '250px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '50px',
                  alignItems: 'center',
                },
              }}
            >
              <List>
                {ListData.map((val, index) => (
                  <ListItem button key={index}>
                    {val}
                  </ListItem>
                ))}
              </List>
            </Drawer>
          </Box>
        </Toolbar>
      </AppBar>
      <Box ref={messagesContainerRef} sx={{ background: "white", height: "100vh", overflowY: 'auto', pb: 25 }}>
        {
          messages.map((msg, ind) => {
            // console.log(msg)
            return (
              <Texts key={ind} val={msg.body} isSent={msg.participation.messageable_id == userId ? true : false} />
            )
          })
        }
      </Box>
      <Box
        sx={{
          width: '100%',
          position: 'fixed',
          top: 'auto',
          bottom: 0,
          display: 'flex',
          alignItems: 'center',
          // justifyContent: 'space-between',

        }}
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
          {isRecording && (
            <div
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                display: 'flex',

                justifyContent: 'center',
                alignItems: 'center'

              }}
            >
              <p>Recording: {recordingTime} seconds</p>
            </div>
          )}
          <KeyboardVoiceIcon
            sx={{ fontSize: '40px', cursor: 'pointer' }}
            onClick={isRecording ? stopRecording : handleRecordButtonClick}
          >
            {isRecording ? 'Stop' : 'Record'}
          </KeyboardVoiceIcon>
        </div>
        <TextField
          fullWidth
          sx={{
            mb: 1,
            width: '50%',
            background: 'white',

          }}
          placeholder="Start Writing Here........"
          value={newMessage + selectedEmoji}
          onChange={(e) => setNewMessage(e.target.value)}
        />
        <Button
          disabled={newMessage.length < 1}
          variant='contained'
          className='bg-[#3E3A57]'
          sx={{ height: '55px', mb: 1 }}
          onClick={() => {
            if (newMessage.trim() || selectedEmoji) {
              sendMessage(props.selectedUser.id, newMessage + selectedEmoji);
            }
          }}
        >
          Send
        </Button>
        <Button

          variant='contained'
          className='bg-[#3E3A57]'
          sx={{ height: '55px', mb: 1 }}
          value={selectedEmoji}
          onClick={handleEmojiButtonClick}
        >
          😃
        </Button>

        {isEmojiPickerOpen && (
          <EmojiPicker onEmojiClick={handleEmojiSelect} />
        )}
      </Box>
    </StyledChat>
  );
};

export default Chat;