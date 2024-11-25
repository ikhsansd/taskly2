import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { FormControl, FormErrorMessage } from '@chakra-ui/form-control';
import { Input, Button, Text, Box, Flex, Heading, Stack } from '@chakra-ui/react';

export default function SignUp() {
    // Menggunakan react-hook-form untuk form handling
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm();

    // Fungsi untuk menangani submit form
    const doSubmit = async (values) => {
        alert('Sign Up Successful. You are now logged in');
    };

    return (
        <Box p='3' maxW='lg' mx='auto'>
            <Heading as='h1' textAlign='center' fontSize='3xl' fontWeight='semibold' my='7'>
                Create an Account
            </Heading>

            {/* Formulir Sign Up */}
            <form onSubmit={handleSubmit(doSubmit)}>
                <Stack gap='4'>
                    {/* Form control untuk Username */}
                    <FormControl isInvalid={errors.username}>
                        <Input
                            id='username'
                            type='text'
                            placeholder='Username'
                            {...register('username', { required: 'Username is required' })}
                        />
                        <FormErrorMessage>
                            {errors.username && errors.username.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Form control untuk Email */}
                    <FormControl isInvalid={errors.email}>
                        <Input
                            id='email'
                            type='email'
                            placeholder='Email'
                            {...register('email', { required: 'Email is required' })}
                        />
                        <FormErrorMessage>
                            {errors.email && errors.email.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Form control untuk Password */}
                    <FormControl isInvalid={errors.password}>
                        <Input
                            id='password'
                            type='password'
                            placeholder='Password'
                            {...register('password', { required: 'Password is required' })}
                        />
                        <FormErrorMessage>
                            {errors.password && errors.password.message}
                        </FormErrorMessage>
                    </FormControl>

                    {/* Tombol submit dengan loading state */}
                    <Button
                        type='submit'
                        isLoading={isSubmitting}
                        colorScheme='teal'
                        textTransform='uppercase'
                    >
                        Sign Up
                    </Button>
                </Stack>
            </form>

            {/* Tautan untuk Sign In */}
            <Flex gap='2' mt='5'>
                <Text>Have an Account?</Text>
                <Link to={'/signin'}>
                    <Text as='span' color='blue.400'>
                        Sign In
                    </Text>
                </Link>
            </Flex>
        </Box>
    );
}