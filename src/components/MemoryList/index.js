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
	  console.log(resp)
	  setMemoryList(resp.memories)
      })
      .catch((err) => console.log(err))
  }, []);

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
	  >
	    Load More
	  </Button>
	</Stack>
    </div>
  );
};

export default MemoryList;
