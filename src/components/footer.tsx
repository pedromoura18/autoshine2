import { Icon, Text, VStack, Link as ChakraLink } from "@chakra-ui/react";
import { LuCar } from "react-icons/lu";
import NextLink from "next/link";

export function Footer() {
  return (
    <VStack as="footer" borderTopWidth={1} py={12}>
      <ChakraLink colorPalette="yellow" alignItems="center" gap={2} asChild>
        <NextLink href="/">
          <Icon w={7} h={7}>
            <LuCar />
          </Icon>

          <Text fontSize="xl" fontWeight="bold">AutoShine</Text>
        </NextLink>
      </ChakraLink>

      <Text fontSize="sm">© 2026 AutoShine Estética Automotiva. Todos os direitos reservados.</Text>
    </VStack>
  )
}