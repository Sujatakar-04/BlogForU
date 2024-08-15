import React, { useContext } from 'react'
import { useState,useEffect } from 'react'
import { useLocation,useNavigate,useParams } from 'react-router-dom'
import { Box,styled,FormControl,InputBase,Button,TextareaAutosize} from '@mui/material'
import {AddCircle as Add} from '@mui/icons-material'
import { DataContext } from '../../context/DataProvider'
import { API } from '../../service/api'



const Container=styled(Box)`
  margin:50px 100px
`

const Image=styled('img')({
    width:'100%',
    height:'50vh',
    objectFit:'cover'
});

const StyledFormControl=styled(FormControl)`
  margin-top:10px;
  display:flex;
  flex-direction:row;
`;

const InputTextFeild=styled(InputBase)`
  flex:1; 
  margin:0 30px;
  font-size: 25px;
`;

const TextArea=styled(TextareaAutosize)`
  width:100%;
  margin-top:50px;
  font-size:18px;
  border:none;
  &:focus-visible{
    outline:none;
  }
`;

const initialPost={
  title:'',
  description:'',
  picture:'',
  username:'',
  categories:'',
  createdDate: new Date()
}

const Update = () => {

  const [post,setPost]=useState(initialPost);
  const [file,setFile]=useState('');

  const location=useLocation();
  const navigate=useNavigate();

  const { account} =useContext(DataContext);
  
  const url=post.picture ? post.picture : 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8bGFwdG9wJTIwc2V0dXB8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80';

  const {id}=useParams();

  useEffect(()=>{
    const fetchData=async ()=>{
        let response=await API.getPostById(id);
        if(response.isSuccess){
            setPost(response.data);
        }
    }
    fetchData();
  },[])

  useEffect(()=>{
    const getImage=async ()=>{
          if(file){
            const data=new FormData();
            data.append("name",file.name);
            data.append("file",file);

            //API Call
            const response=await API.uploadFile(data);
            post.picture=response.data;
          }
        }
          getImage();
          post.categories=location.search?.split('=')[1] || 'All';
          post.username=account.username;
  },[file]);

  const handelChange=(e)=>{
    // console.log(e.target.name,e.target.value);
    setPost({...post,[e.target.name]:e.target.value});
  }

  const updateBlogPost =async()=>{
    let response=await API.updatePost(post);
    if(response.isSuccess){
      navigate(`/details/${id}`);
    }
  }


  return (

    <Container>
      <Image src={url} alt="banner" />
      <StyledFormControl>
          <label htmlFor='fileInput'>
            <Add fontSize='large' color='action'/>
          </label>
          <input 
                type='file'
                id='fileInput' 
                style={{display:'none'}}
                onChange={(e)=>setFile(e.target.files[0])}
              />
          <InputTextFeild placeholder='Title' value={post.title} onChange={(e)=>handelChange(e)} name='title'/>
          <Button variant='contained' onClick={()=>updateBlogPost()}>Update</Button>
      </StyledFormControl>
      <TextArea 
        minRows={5}
        placeholder='Tell your story.....'
        onChange={(e)=>handelChange(e)}
        name='description'
        value={post.description}
      />
    </Container>
  )
}

export default Update