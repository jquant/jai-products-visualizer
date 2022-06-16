import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { useCookies } from 'react-cookie';

import { Container, Flex, Text, Select, Button } from '@chakra-ui/react';
import { FiLogOut, FiShoppingCart } from 'react-icons/fi';

import { useLocale } from '@shared/hooks/useLocale';

export function Header() {
  const router = useRouter();
  const [, , removeCookie] = useCookies();

  const { currentLocale } = useLocale();

  function handleChangeLocale(newLocale: string) {
    router.push({ pathname: router.pathname }, router.asPath, {
      locale: newLocale,
    });
  }

  function handleSignOut() {
    removeCookie('client_session', {
      path: '/',
    });
    router.push('/');
  }

  return (
    <Flex as="header" p="6">
      <Container maxW="container.lg" mx="auto">
        <Flex
          direction={{
            base: 'column',
            md: 'row',
          }}
          alignItems="center"
          width="full"
          justifyContent="space-between"
          gridGap="4"
        >
          <Link href="/products" passHref>
            <Flex gap={4} cursor="pointer">
              <Image
                src="/images/jai_logo.png"
                width={40}
                height={20}
                objectFit="contain"
                alt="Jai Logo"
              />
              <Text as="a" fontSize="md" fontWeight="bold">
                Jai Store
              </Text>
            </Flex>
          </Link>

          <Flex alignItems="center" gridGap={2}>
            <Select
              fontSize="md"
              fontWeight="500"
              variant="unstyled"
              value={currentLocale}
              width="fit-content"
              onChange={(e) => handleChangeLocale(e.target.value)}
            >
              <option value="default">🇺🇸 English, US</option>
              <option value="pt-BR">🇧🇷 Português, BR</option>
            </Select>
            <Button variant="ghost" onClick={() => handleSignOut()}>
              <FiLogOut />
            </Button>
          </Flex>
        </Flex>
      </Container>
    </Flex>
  );
}
