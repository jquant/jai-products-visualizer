import { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';

import { Environment } from 'jai-sdk/dist/tsc/environment-management/environment';
import { useForm } from 'react-hook-form';

import {
  Container,
  Input,
  Stack,
  Text,
  Flex,
  Button,
  Box,
  InputGroup,
  InputRightElement,
  InputLeftElement,
  Select,
} from '@chakra-ui/react';

import { MdClose } from 'react-icons/md';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { toast } from 'react-toastify';

import { useLocale } from '@shared/hooks/useLocale';
import { useUsers } from '@shared/hooks/useUsers';

type FormData = {
  access_token: string;
  access_environment: string;
};

export function LoginTemplate() {
  const [isLoading, setIsLoading] = useState(false);
  const [isAValidAccessToken, setIsAValidAccessToken] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [environments, setEnvironments] = useState<Environment[]>([]);

  const { register, handleSubmit, reset } = useForm<FormData>();

  const router = useRouter();
  const { locale } = useLocale();
  const { validateAuthToken, authenticateUser, validateEnvCollections } =
    useUsers();

  async function onSubmit(data: FormData) {
    setIsLoading(true);

    if (!isAValidAccessToken) {
      try {
        const { isValid, environments: envs } = await validateAuthToken(
          data.access_token
        );

        setIsAValidAccessToken(isValid);
        setEnvironments(envs);
      } catch {
        toast.error('The inserted key is probably invalid');
      }
    } else {
      const validateEnv = await validateEnvCollections({
        access_token: data.access_token,
        environment: data.access_environment,
        collections: ['hm_imgs'],
      });

      if (!validateEnv) {
        setIsLoading(false);
        return toast.error(locale.login.accessError);
      }

      try {
        await authenticateUser(data.access_token, data.access_environment);
        router.push('/products');
      } catch (e) {
        const { message } = e as Error;
        toast.error(message);
      }
    }

    setIsLoading(false);
  }

  return (
    <Container maxW="container.lg">
      <Flex
        minH="100vh"
        direction="column"
        justifyContent="center"
        alignItems="center"
      >
        <Flex alignItems="center" justifyContent="center" gridGap="2" mb="8">
          <Image
            src="/images/jai_logo.png"
            alt="Jai Logo"
            width={60}
            height={24}
            objectFit="contain"
            quality={100}
          />
          <Text fontWeight="600">No-Code AI</Text>
        </Flex>

        <Box
          bg="white"
          borderRadius="lg"
          w={{
            base: '100%',
            md: '96',
          }}
          overflow="hidden"
          boxShadow="lg"
        >
          <Flex minH="md">
            <Flex
              direction="column"
              p={{
                base: '6',
                md: '8',
              }}
              flex="1"
            >
              <Flex
                as="form"
                gridGap="4"
                direction="column"
                height="full"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Stack spacing={2}>
                  <Text fontSize="2xl" fontWeight="600">
                    {locale.login.title}
                  </Text>
                  <Text color="gray.500">{locale.login.subtitle}</Text>
                </Stack>
                <InputGroup>
                  {isAValidAccessToken && (
                    <InputLeftElement
                      as="button"
                      type="button"
                      top="50%"
                      transform="translateY(-50%)"
                      cursor="pointer"
                      onClick={() => {
                        setIsAValidAccessToken(false);
                        reset();
                      }}
                    >
                      <MdClose size={16} />
                    </InputLeftElement>
                  )}
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    variant="filled"
                    placeholder={locale.login.inputKeyPlaceholder}
                    disabled={isLoading || isAValidAccessToken}
                    {...register('access_token', {
                      required: true,
                    })}
                  />
                  {!(isLoading || isAValidAccessToken) && (
                    <InputRightElement
                      as="button"
                      type="button"
                      top="50%"
                      transform="translateY(-50%)"
                      cursor="pointer"
                      onClick={() => setShowPassword(!showPassword)}
                      disabled={isLoading || isAValidAccessToken}
                    >
                      {showPassword ? (
                        <AiOutlineEye />
                      ) : (
                        <AiOutlineEyeInvisible />
                      )}
                    </InputRightElement>
                  )}
                </InputGroup>
                <Select
                  variant="filled"
                  placeholder={locale.login.inputEnvPlaceholder}
                  visibility={isAValidAccessToken ? 'visible' : 'hidden'}
                  {...register('access_environment', {
                    required: isAValidAccessToken,
                  })}
                >
                  {environments.map((env) => (
                    <option key={env.id} value={env.name}>
                      {env.name}
                    </option>
                  ))}
                </Select>
                <Button
                  type="submit"
                  width="full"
                  mt="auto"
                  colorScheme="orange"
                  isLoading={isLoading}
                >
                  {isAValidAccessToken
                    ? locale.login.buttonAccess
                    : locale.login.buttonCheck}
                </Button>
              </Flex>
            </Flex>
            {/* <Flex
              direction="column"
              position="relative"
              flex="1"
              display={{
                base: 'none',
                md: 'flex',
              }}
              minW="50%"
            >
              <Image
                src="/images/jai_network.gif"
                alt="Jai Network GIF"
                layout="fill"
                objectFit="cover"
                priority
              />
            </Flex> */}
          </Flex>
        </Box>
      </Flex>
      {/*
       */}
    </Container>
  );
}
