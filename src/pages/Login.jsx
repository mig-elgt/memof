import React, { useState } from "react";
import { login } from "../services/service";
import { useNavigate } from "react-router-dom";
import {FormControl, Input, Button, Container} from '@chakra-ui/react'
import {ArrowForwardIcon} from '@chakra-ui/icons'

export default function Login(props) {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });
  const { username, password } = form;
  const [error, setError] = useState(null);
  const navigate = useNavigate();

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
    login(creds).then((res) => {
      if (res.status === 403) {
	return setError({message: "Invalid Credentials"})
      }
      localStorage.setItem("access_token", res.token)
      navigate("/memories");
    });
  }

  return (
<Container maxW='2xl' centerContent>
          <form onSubmit={handleFormSubmission}>
              <FormControl isRequired pl="30px" pr="30px">
                  <Input id="input-username" type='text' mb="15px"
                  name="username"
                  placeholder='Username'
                  value={username}
                  onChange={handleInputChange}
                  required/>
                </FormControl>
                <FormControl isRequired pl="30px" pr="30px">
                  <Input id="input-password" type='password' mb="15px"
                  name="password"
                  placeholder='Password'
                  value={password}
                  onChange={handleInputChange}
                  required
                  />
                </FormControl>
            {error && (
              <div className="error-block">
                <p>{error.message}</p>
              </div>
            )}
            <Button className="button__submit" type="submit" colorScheme='purple'>
              Entrar
            </Button>
          </form>
</Container>
  );
}
