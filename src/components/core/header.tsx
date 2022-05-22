import Link from 'next/link';
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
    removeCookie('access_token', {
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
            <Text as="a" fontSize="md" fontWeight="black">
              🏪 FakeStore
            </Text>
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
              <option value="default">🇧🇷 Português, BR</option>
              <option value="en-US">🇺🇸 English, US</option>
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
