import { Button, HStack, Icon, Text, Link as ChakraLink } from "@chakra-ui/react";
import { LuCar } from "react-icons/lu";
import { ColorModeButton } from "./ui/color-mode";
import NextLink from "next/link";

export function Header() {
  return (
    <HStack as="header" position="fixed" left={0} right={0} top={0} zIndex={50} bg="blackAlpha.800/90">
      <HStack as="nav" w="full" alignItems="center" justify="space-between" px={6} py={4}>
        <ChakraLink colorPalette="yellow" alignItems="center" gap={2} asChild>
          <NextLink href="/">
            <Icon w={7} h={7}>
              <LuCar />
            </Icon>

            <Text fontSize="xl" fontWeight="bold">AutoShine</Text>
          </NextLink>
        </ChakraLink>

        <HStack alignItems="center" gap={8}>
          <ChakraLink asChild>
            <NextLink href="/">
              Inicio
            </NextLink>
          </ChakraLink>

          <ChakraLink asChild>
            <NextLink href="/#servicos">
              Serviços
            </NextLink>
          </ChakraLink>

          <ChakraLink asChild>
            <NextLink href="/agendar">
              Agendar
            </NextLink>
          </ChakraLink>

          <ColorModeButton rounded="lg" />

          <Button rounded="lg">Acessar</Button>
        </HStack>
      </HStack>
    </HStack>
  )
}