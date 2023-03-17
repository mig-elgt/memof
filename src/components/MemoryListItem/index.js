import {
  Image,
  Box,
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
        <Stack>
          <Card maxW="sm">
            <CardBody>
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                alt="Green double couch with wooden legs"
                borderRadius="lg"
              />
              <Stack mt="6" spacing="3">
                <Heading size="md">Living room Sofa</Heading>
                <Text>
                  This sofa is perfect for modern tropical spaces, baroque
                  inspired spaces, earthy toned spaces and for people who love a
                  chic design with a sprinkle of vintage design.
                </Text>
              </Stack>
            </CardBody>
          </Card>
          <Box borderRadius="md" bg="purple.500" color="white" px={4}>
            <Text fontSize="md" fontWeight={"bold"}>
              {props.memory.title}
            </Text>
          </Box>
          <Box boxSize="100%">
            <Image src={props.memory.image_url} boxSize="100%" />
          </Box>
        </Stack>
      </Stack>
    </div>
  );
};

export default MemoryListItem;
