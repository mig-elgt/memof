import { Image, Box, Stack, VStack, Center, Text } from '@chakra-ui/react';
import Moment from 'react-moment';

const MemoryListItem = (props) => {
  return (
     <div>
	  <Stack direction='row' px={5}>
	     <VStack>
		<Text fontSize='md'><Moment format="MMM" withTitle>{props.memory.date}</Moment></Text>
	        <Text fontSize='xl'><Moment format='DD'>{props.memory.date}</Moment></Text>
	  	<Center w='3px' bg='purple.500' h='100%'>
		</Center>
	     </VStack>
	     <Stack>
	        <Box boxSize='100%'>
                  <Image src={props.memory.image_url} boxSize='100%' />
	        </Box>
	        <Text fontSize='sm'>{props.memory.title}</Text>
	     </Stack>
	  </Stack>
     </div>
  );
};

export default MemoryListItem;
