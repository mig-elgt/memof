import React, { useState } from "react";
import { login } from "../services/service";
import { useNavigate } from "react-router-dom";
import {FormControl, Input, Button, Wrap, VStack, useToast} from '@chakra-ui/react'

export default function Login(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [isLogIn, setIsLogIn] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  function handleInputChange(event) {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }

  function handleFormSubmission(event) {
    event.preventDefault();
    const creds = {
	    user: username,
      	    pass: password,
    };
    setIsLogIn(true)
    login(creds).then((res) => {
      setIsLogIn(false)
      if (res.status === 403) {
	toast({ description: 'Invalid Credentials', status: 'error'})
	return
      }
      localStorage.setItem("access_token", res.data.token)
      navigate("/memories");
    }).catch((err) => {
	console.log(err)
	toast({ description: 'Something went wrong', status: 'error'})
        setIsLogIn(false)
    });
  }

  return (
	  <Wrap justify='center' px="20px">
	  <VStack>
		  <form onSubmit={handleFormSubmission}>
		      <FormControl isRequired >
			  <Input id="input-username" type='text' mb="15px"
			  name="username"
			  placeholder='Username'
			  value={username}
			  onChange={handleInputChange}
			  required/>
			</FormControl>
			<FormControl isRequired>
			  <Input id="input-password" type='password' mb="15px"
			  name="password"
			  placeholder='Password'
			  value={password}
			  onChange={handleInputChange}
			  required
			  />

		    <Button isLoading={isLogIn} className="button__submit" type="submit" colorScheme='purple'>
		      Log In
		    </Button>
			</FormControl>
		  </form>
	     </VStack>
	  </Wrap>
  );
}
