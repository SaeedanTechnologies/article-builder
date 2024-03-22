import {Box, Card, CardActions, CardContent, CardMedia, Dialog, DialogContent, DialogTitle, Divider, Grid, IconButton, Stack, TextField, Toolbar, Typography, styled } from '@mui/material'
import React, {useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router'
import { getAllPosts, likePost } from '../../../store/actions/userActions'
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import moment from 'moment';
import CommentIcon from '@mui/icons-material/Comment';
import { CloseOutlined } from '@mui/icons-material'
import SendIcon from '@mui/icons-material/Send';
import { addComment, getPostComments } from '../../../store/actions/commentsActions'
import { useSnackbar } from 'notistack'
import { RotatingLines, ThreeDots } from 'react-loader-spinner'
import {FaCommentSlash} from 'react-icons/fa'
import CommentsComp from './CommentsComp'
const StyledRoot = styled(Box)(({theme})=> ({
    minHeight:'50vh',
    // background:'#e2e2e2',
    position:'relative'
}))
const ProfilePosts = () => {
    const [posts, setPosts] = React.useState([])
    const [postData, setPostData] = React.useState([]) 
    const [open, setOpen] = React.useState(false)
    const [loading ,setLoading] = React.useState(false)
    const [comments, setComments] = React.useState([])
    const commentsContainerRef = useRef(null);
    const [commentsLoading, setCommentsLoading] = React.useState(false)
    const [postLoading , setPostLoading] = React.useState(false)
    // const [likes, setLikes] = React.useState({});
    // const [liked, setLiked] = React.useState(false)
    const [cValue , setCValue] = React.useState('')
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {enqueueSnackbar} = useSnackbar()
    const user = useSelector((state)=>state.admin.user)
    // const liked_id = useSelector((state)=>state.user.likes_id.user_id)
    // console.log(liked_id)
    const handleChange = (e) => {
        setCValue(e.target.value)
    }

    const getComments = (val) => {
      setCommentsLoading(true)
      // console.log(val)
        dispatch(getPostComments(val.id)).then((result) => {
            setComments(result.data.payload)
            setCommentsLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    }
    // React.useEffect(()=> {
    //     getComments()
    // },[])
    const handleSubmitComment = (e) => {
      setLoading(true)
        e.preventDefault()
        const body = {
            object_type:'Post',
            object_id:postData.id,
            comment:cValue
        }
        dispatch(addComment(body)).then((result) => {
          setLoading(false)  
          enqueueSnackbar(result.data.message, {
            variant:'success'
          })
          setCValue('')
          getComments(postData);
        }).catch((err) => {
            console.log(err)
        });
    }
    const getPosts = () => {
      setPostLoading(true)
        dispatch(getAllPosts()).then((result) => {
            setPosts(result.data.payload)
            setPostLoading(false)
        }).catch((err) => {
            console.log(err)
        });
    }
    React.useEffect(()=> {
        getPosts()
    },[])
    React.useEffect(() => {
      if (commentsContainerRef.current) {
        commentsContainerRef.current.scrollTop = commentsContainerRef.current.scrollHeight;
      }
    }, [comments]);
    // React.useEffect(()=> {
    // liked_id === user_id
    // console.log(likeD)
    // },[])
    const handlePostClick = (data) => {
        navigate("/user/view-post",{state:data})
    }
    const handleopen = (val) => {
        setPostData(val)
        setOpen(true)
        getComments(val)
    }
    const handleClose = () => {
        setOpen(false)
        setPostData([])
    }
    // console.log(postData)
    const handleLikeClick = (postId) => {
        // Toggle the like state for the post
        // setLikes((prevLikes) => ({
        //   ...prevLikes,
        //   [postId]: !prevLikes[postId],
        // }));
        const body = {
            object_type:'Post',
            object_id:postId,
        }
        dispatch(likePost(body)).then((result) => {
            console.log(result)
        }).catch((err) => {
            console.log(err)
        });
      };
  return (
    <StyledRoot sx={{px:15, mb:5}}>
     <Grid container spacing={2}>
            {
              postLoading ? 
              <ThreeDots 
              height="100" 
              width="100" 
              radius="9"
              color="#3e50ce" 
              ariaLabel="three-dots-loading"
              wrapperStyle={{}}
              wrapperClassName=""
              visible={true}
              /> :
                posts.map((val)=> {
                    // console.log(val)
                    const liked = val.likes.some((likedItem) => likedItem.user.id === user.id);
                    // console.log(liked)
                    const formattedDate = moment(val.created_at).format("MMMM D, YYYY");
                    return(
            <Grid item
            xs={12}
            md={6}
            lg={4}
            >
            <Card 
            sx={{cursor:'pointer',
            transition: 'transform 0.2s',
            '&:hover': {
              transform: 'scale(1.05)',
              background:'#e2e2e2'
            }
        }}
            >
            {/* <CardHeader
                avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                    R
                </Avatar>
                }
                action={
                <IconButton aria-label="settings">
                    <MoreVertIcon />
                </IconButton>
                }
                title={val.title}
                subheader={formattedDate}
            /> */}
            <CardMedia
                onClick={()=>handlePostClick(val)}
                component="img"
                style={{ height: '300px', }}
                maxHeight="194"
                image={`${process.env.REACT_APP_URL}${val.image}`}
                alt="Image"
            />
            <CardContent
            onClick={()=>handlePostClick(val)}
             style={{
                // height: '70px',
                overflow: 'hidden',
              }}
            >
                <Typography variant="body2" color="text.secondary"
                 style={{
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                  }}
                >
                    {val.title}
                </Typography>
            </CardContent>
            <CardActions disableSpacing>
            <IconButton
                    aria-label="add to favorites"
                    onClick={() => handleLikeClick(val.id)}
                  >
                    <FavoriteIcon color={liked ? 'error' : 'inherit'} />
                  </IconButton>
                <IconButton
                onClick={()=>handleopen(val)}
                >
                    <CommentIcon />
                </IconButton>
                <IconButton aria-label="share">
                <ShareIcon />
                </IconButton>
            </CardActions>
                <CardActions>
                    <Stack>
                <Typography sx={{color:'#878787', fontWeight:'bold'}}>{val.likes.length} likes</Typography>
                <Typography sx={{color:'#878787', fontWeight:'bold'}}>{val.comments.length} comments</Typography>
                    </Stack>
                </CardActions>
            </Card>
            </Grid>
                    )
                })
            }
        </Grid>
        <Dialog open={open}
        onClose={handleClose}
        sx={{
            "& .MuiDialog-container": {
              "& .MuiPaper-root": {
                width: "100%",
                maxWidth: "1200px",
                zIndex:500
              },
            },
          }}
        >
            {/* <DialogTitle>
                <IconButton sx={{float:'right'}}>
                    <CloseOutlined sx={{fontSize:'2rem'}} />
                </IconButton>
            </DialogTitle> */}
         <DialogContent>
    <Box sx={{ display: 'flex', position: 'relative', }}>
      <Box sx={{
        width: '35%',
        height: '70vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        {postData && postData.image && (
          <img
            src={`${process.env.REACT_APP_URL}${postData.image}`}
            alt="Post Image"
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
        )}
       
      </Box>
      <Box sx={{ ml: 2, borderLeft: '1px dashed grey', width:'75%', position: 'relative' }}>
      <Box 
      sx=
      {{display:'flex', 
      background:'#fff', 
      position: 'absolute', bottom: 0, right: 0, left: 0
      }}>
                <TextField
                sx={{ml:1}}
                  placeholder="Add comment"
                  variant="outlined"
                  size="small"
                  value={cValue}
                  onChange={handleChange}
                  fullWidth
                  />
                <IconButton
                  disabled={!cValue || loading}
                    onClick={handleSubmitComment}
                  >
                    {
                      loading ? 
                      <RotatingLines 
                      strokeColor="grey"
                      strokeWidth="5"
                      animationDuration="0.75"
                      width="30"
                      visible={loading}
                      /> :
                      <SendIcon />

                    }
                </IconButton>
        </Box>
        <Toolbar>
            <Typography variant='h4' fontWeight="bold" >
                {postData.title}
                </Typography> 
                <Box sx={{ml:'auto'}}>
          <IconButton onClick={handleClose}>
            <CloseOutlined sx={{fontSize:'1.75rem'}} />
          </IconButton>
        </Box>
        </Toolbar>
        <Divider />
        {
          commentsLoading ?
          <Box sx={{display:'flex', justifyContent:'center', mt:5}}> 
          <RotatingLines 
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="50"
          visible={commentsLoading}
          /> 
          </Box>
          :
        <Box sx={{
            maxHeight:'50vh',
            overflowY:'scroll'
        }}
        ref={commentsContainerRef}
        >
        {
            comments.map((val)=> {
              // console.log(val)
             
                return(
                
                  <CommentsComp val={val} postData={postData} getComments={getComments}
                  close = {()=>setOpen(false)}
                  />
)
})
}
{
  comments.length <= 0 && 
  <Box sx={{
    height:'100%',
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    mt:10
  }}> 
    <Box>
        <FaCommentSlash size={120} style={{color:'#878787'}}/>
      </Box>
      <Typography variant='h4' fontWeight="bold" color='#878787'>No Comments Found</Typography>
  
  </Box>
}
</Box>
        }
      </Box>
    </Box>
  </DialogContent>
        </Dialog>
    </StyledRoot>
  )
}

export default ProfilePosts
