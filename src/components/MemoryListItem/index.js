import {
  Image,
  Box,
  Flex,
  IconButton,
  Stack,
  VStack,
  Center,
  Text,
  Circle,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Heading,
  Divider,
} from "@chakra-ui/react";
import Moment from "react-moment";

const MemoryListItem = (props) => {
  return (
    <div>
      <Stack direction="row" px={5}>
        <VStack>
          <Text fontSize="xl" fontWeight={"bold"}>
            <Moment format="MMM" withTitle>
              {props.memory.date}
            </Moment>
          </Text>
          <Text fontSize="xl">
            <Moment format="DD">{props.memory.date}</Moment>
          </Text>
          <Center w="3px" bg="purple.500" h="100%"></Center>
        </VStack>
        <Box>
          <Card maxW="md">
            <CardHeader bg="whiteAlpha.100" borderRadius="xl">
              <Box
                borderRadius="md"
                bg="purple.500"
                color="white"
                px={4}
                mb={4}
                w="100%"
              >
                <Text fontSize="md" fontWeight={"bold"} >
                  {props.memory.title}
                </Text>
              </Box>
              <Box boxSize="100%">
                <Image src={props.memory.image_url} boxSize="100%" borderRadius='md'/>
              </Box>
            </CardHeader>
          </Card>
        </Box>
      </Stack>
    </div>
  );
};

export default MemoryListItem;
