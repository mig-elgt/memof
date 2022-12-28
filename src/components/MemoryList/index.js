import MemoryListItem from "../MemoryListItem";
import ValidateKeyAndSendEmail from "../ValidateKeyAndSendEmail";
import { useEffect, useState, useRef } from "react";
import { getMemories } from "../../services/service.js";
import { Button, Stack } from '@chakra-ui/react'

const MemoryList = (props) => {
  const [memories, setMemoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  let refCount = useRef(1);

  useEffect(() => {
    getMemories(refCount.current, 4,"")
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
    getMemories(refCount.current,4,"")
      .then((resp) => {
	  console.log(resp)
	  if (resp.status === 200) {
	     let newMemories = [...memories]
	     newMemories.push(...resp.data.memories)
	     setMemoryList(newMemories)
	  } else {
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
 

  return (
    <div>
      <ValidateKeyAndSendEmail isModalOpen={isModalOpen} handleOnClose={handleOnClose}/>
      {memories.map((memory, i) => {
        return (
          <div key={memory.id}>
            <MemoryListItem memory={memory}/>
          </div>
        );
      })}
	<Stack direction='row' spacing={4}>
	  <Button
	    isLoading={isLoading}
	    loadingText='Loading'
	    colorScheme='teal'
	    variant='outline'
	    onClick={onLoadMoreMemories}
	  >
	  Cargar mas
	  </Button>
	</Stack>
    </div>
  );
};

export default MemoryList;
