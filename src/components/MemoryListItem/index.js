import { Image, Box } from '@chakra-ui/react'

const MemoryListItem = (props) => {
  return (
     <div>
	  <span>{props.memory.date}</span>
	  <br/>
	  <span>{props.memory.title}</span>
	  <Box boxSize='sm'>
   		<Image src={props.memory.image_url} boxSize='100%' />
          </Box>
     </div>
  );
};

export default MemoryListItem;
