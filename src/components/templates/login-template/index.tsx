import { FormEvent, useEffect, useState } from 'react';

import { useRouter } from 'next/router';

import {
  Container,
  Input,
  Stack,
  Text,
  InputGroup,
  InputLeftElement,
  Flex,
  Button,
} from '@chakra-ui/react';

import { FiLock } from 'react-icons/fi';
import { toast } from 'react-toastify';

import { Layout } from '@components/core/layout';

import { useLocale } from '@shared/hooks/useLocale';
import { useUsers } from '@shared/hooks/useUsers';

export function LoginTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [accessTokenValue, setAccessTokenValue] = useState('');

  const router = useRouter();
  const { locale } = useLocale();
  const { validateAuthToken } = useUsers();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    setIsLoading(true);

    try {
      await validateAuthToken(accessTokenValue);
      router.push('/products');
    } catch {
      toast.error(locale.login.accessError);
      setIsLoading(false);
    }
  }

  return (
    <Layout>
      <Container
        bg="white"
        borderRadius="lg"
        height="full"
        p="8"
        experimental_spaceY={8}
        my="16"
        boxShadow="lg"
      >
        <Stack textAlign="center" spacing={2}>
          <Text fontSize="lg" fontWeight="600">
            {locale.login.title}
          </Text>
          <Text fontSize="sm">{locale.login.subtitle}</Text>
        </Stack>

        <Flex
          as="form"
          direction="column"
          experimental_spaceY={8}
          onSubmit={(e) => handleSubmit(e)}
        >
          <InputGroup>
            <InputLeftElement>
              <FiLock />
            </InputLeftElement>
            <Input
              placeholder={locale.login.inputPlaceholder}
              colorScheme="orange"
              disabled={isLoading}
              value={accessTokenValue}
              onChange={(e) => setAccessTokenValue(e.target.value)}
            />
          </InputGroup>
          <Button
            type="submit"
            width="full"
            colorScheme="orange"
            isLoading={isLoading}
          >
            Verificar
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
}
