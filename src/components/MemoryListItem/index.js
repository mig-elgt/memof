import { Image, Box } from '@chakra-ui/react'

const MemoryListItem = (props) => {
  return (
     <div>
	  <span>{props.memory.date}</span>
	  <br/>
	  <span>{props.memory.title}</span>
	  <Box boxSize='100%'>
   		<Image src={props.memory.image_url} boxSize='100%' />
          </Box>
     </div>
  );
};

export default MemoryListItem;
