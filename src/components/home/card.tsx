import { CardBody, CardFooter, CardRoot, Flex, Heading, Text } from "@chakra-ui/react";
import { ReactNode } from "react";
import { LuSparkles } from "react-icons/lu";

interface CardProps {
  icon: ReactNode;
  title: string;
  description: string;
  textFooter: string;
}

export function Card({ icon, title, description, textFooter }: CardProps) {
  return (
    <CardRoot w={80} _hover={{ borderColor: "yellow.500/30" }} cursor="pointer">
      <CardBody gap={2}>
        <Flex
          w={12}
          h={12}
          align="center"
          justify="center"
          bgColor="yellow.300"
          rounded="lg"
        >
          {icon}
        </Flex>

        <Heading as="h3" fontSize="xl" fontWeight="semibold">{title}</Heading>

        <Text fontSize="sm">{description}</Text>
      </CardBody>
      <CardFooter>
        <Text fontSize="sm" fontWeight="semibold">{textFooter}</Text>
      </CardFooter>
    </CardRoot>
  )
}