import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Button,
  useToast,
} from '@chakra-ui/react'
import { validatePublicKey, sendEmail } from "../../services/service.js";

const ValidateKeyAndSendEmail = (props) => {
  const initialRef = React.useRef(null)
  const finalRef = React.useRef(null)
  const [form, setForm] = useState({
    publicKey: "",
    email: "",
  });
  const toast = useToast();
  const [isValidateLoading, setIsValidateLoading] = useState(false);
  const [isEmailSending, setIsEmailSending] = useState(false);
  const { publicKey, email } = form;
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    return setForm({ ...form, [name]: value });
  }
  
  const handleValidatePublicKey = () => {
    setIsValidateLoading(true)
    validatePublicKey({key: publicKey})
       .then((resp) => {
	  setIsValidateLoading(false)
	  if (resp.status === 403) {
	     toast({ description: 'Invalid Public Key', status: 'error', position: 'top'})
	     return
	  }
	  props.handlePublicKey(resp.data.public_key)
       })
       .catch((err) => {
	  console.log(err)
	  toast({ description: 'Something went wrong', status: 'error', position: 'top'})
	  setIsValidateLoading(false)
       })
  }

  const handleSendEmail = () => {
    setIsEmailSending(true)
    sendEmail({email: email})
       .then((resp) => {
	  setIsEmailSending(false)
	  if (resp.status !== 200) {
	     toast({ description: 'Failed to send email', status: 'error', position: 'top'})
	     return
	  }
       })
       .catch((err) => {
	  console.log(err)
    	  setIsEmailSending(false)
	  toast({ description: 'Something went wrong', status: 'error', position: 'top'})
       })
  }

  return (
     <>
      <Modal
        initialFocusRef={initialRef}
        finalFocusRef={finalRef}
        isOpen={props.isModalOpen}
        onClose={props.handleOnClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Enter your Public Key</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
	    <p>In order to give more phothos, you need to enter a Public Key</p>
	    <br/>
            <FormControl>
              <FormLabel>Key</FormLabel>
              <Input type='password' name="publicKey" value={publicKey} onChange={handleInputChange} placeholder='public key' />
            </FormControl>
	    <br/>
            <Button colorScheme='purple' isLoading={isValidateLoading} loadingText='Validating' onClick={handleValidatePublicKey}>Validate</Button>
            <FormControl mt={4}>
              <FormLabel>Forgot your Public Key?</FormLabel>
              <Input name="email" value={email} onChange={handleInputChange} placeholder='email' required />
            </FormControl>
	    <br/>
            <Button colorScheme='purple' isLoading={isEmailSending} loadingText='Sending' onClick={handleSendEmail}>Send</Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={props.handleOnClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
     </>
  );
};

export default ValidateKeyAndSendEmail;
