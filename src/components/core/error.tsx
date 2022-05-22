import { Container, Flex, Text, Button } from '@chakra-ui/react';

import { FaRegSadTear } from 'react-icons/fa';

import { Layout } from '@components/core/layout';
import { useLocale } from '@shared/hooks/useLocale';

export function ErrorBox() {
  const { locale } = useLocale();

  return (
    <Layout>
      <Container maxW="container.lg" py="32">
        <Flex direction="column" alignItems="center" experimental_spaceY={6}>
          <FaRegSadTear size={128} />
          <Text fontSize="lg">{locale.loadError.title}</Text>
          <Button onClick={() => window.location.reload()}>
            {locale.loadError.button}
          </Button>
        </Flex>
      </Container>
    </Layout>
  );
}
