import MemoryListItem from "../MemoryListItem";
import { useEffect, useState } from "react";
import { getMemories } from "../../services/service.js";
import { Button, Stack } from '@chakra-ui/react'

const MemoryList = (props) => {
  const [memories, setMemoryList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    getMemories(1,4,"")
      .then((resp) => {
	  setMemoryList(resp.memories)
      })
      .catch((err) => console.log(err))
  }, []);

  const onLoadMoreMemories = (e) => {
    setIsLoading(true)
    getMemories(2,4,"")
      .then((resp) => {
	  let newMemories = [...memories]
	  newMemories.push(...resp.memories)
	  setMemoryList(newMemories)
    	  setIsLoading(false)
      })
      .catch((err) => { 
    	 setIsLoading(false)
	 console.log(err)
      })
  }

  return (
    <div>
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
