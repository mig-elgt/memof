import MemoryListItem from "../MemoryListItem";
import ValidateKeyAndSendEmail from "../ValidateKeyAndSendEmail";
import { useEffect, useState, useRef } from "react";
import { getMemories } from "../../services/service.js";
import { Button, VStack, Wrap, Text, Icon } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";

const MemoryList = (props) => {
  const [memories, setMemoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [publicKey, setPublicKey] = useState("");
  const navigate = useNavigate();

  let refCount = useRef(1);

  useEffect(() => { 
    if (localStorage.getItem("access_token") === null) {
      navigate("/");
      return
    }
    getMemories(refCount.current, 4,publicKey)
      .then((resp) => {
	  if (resp.status === 200) {
	     setMemoryList(resp.data.memories)
	  }
      })
      .catch((err) => console.log(err))
  }, []);

  const onLoadMoreMemories = (e) => {
    refCount.current++;
    setIsLoading(true)
    getMemories(refCount.current,4,publicKey)
      .then((resp) => {
	  console.log(resp)
	  if (resp.status === 200) {
	     let newMemories = [...memories]
	     newMemories.push(...resp.data.memories)
	     setMemoryList(newMemories)
	  } else {
             refCount.current--;
	     setIsModalOpen(true)
	  }
    	  setIsLoading(false)
      })
      .catch((err) => { 
	 console.log(err)
    	 setIsLoading(false)
      })
  }

  const handleOnClose = () => {
    setIsModalOpen(false)
  };

  const handlePublicKey = (key) => {
    console.log("got public key", key)
    setIsModalOpen(false)
    setPublicKey(key)
  };
 

  return (
    <div>
      <ValidateKeyAndSendEmail isModalOpen={isModalOpen} handleOnClose={handleOnClose} handlePublicKey={handlePublicKey}/>
      <Wrap justify='center' pt={5} pb={5}>
      <VStack >
      <Text fontSize='2xl'>
	  Chaparrita 
	  <Icon viewBox='0 0 512 512' color='red.500' mx={2}>
		  <path
		    fill='currentColor'
		    d='M462.3 62.6C407.5 15.9 326 24.3 275.7 76.2L256 96.5l-19.7-20.3C186.1 24.3 104.5 15.9 49.7 62.6c-62.8 53.6-66.1 149.8-9.9 207.9l193.5 199.8c12.5 12.9 32.8 12.9 45.3 0l193.5-199.8c56.3-58.1 53-154.3-9.8-207.9z'
		  />
		</Icon>
	  & Chaparrito</Text>
      <Text fontSize='2xl'>Our Memories</Text>
      {memories.map((memory, i) => {
        return (
          <div key={memory.id}>
            <MemoryListItem memory={memory}/>
          </div>
        );
      })}
	  <Button
	    isLoading={isLoading}
	    loadingText='Loading'
	    colorScheme='purple'
	    onClick={onLoadMoreMemories}
	  >
	  Load more
	  </Button>
      </VStack>
      </Wrap>
    </div>
  );
};

export default MemoryList;
