'use client';

import axios from 'axios'
import { toast } from 'react-hot-toast'
import { AiFillGithub } from 'react-icons/ai'
import { FcGoogle } from 'react-icons/fc'
import { useCallback, useState } from 'react';
import {
    FieldValues,
    SubmitHandler,
    useForm
} from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import useRegisterModal from '../../hooks/useRegisterModal';

const RegisterModal = () => {
    const registerModal = useRegisterModal();
    const [isLoading, setIsLoading] = useState(false)
    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            name: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        axios.post('/api/register', data)
            .then(() => {
                registerModal.onClose();
            })
            .catch((error) => {
                toast.error('algo deu errado no registro')
            })
            .finally(() => {
                setIsLoading(false);
            })
    }

    const bodyContent = (
        <div className='flex flex-col gap-4  ' >
            <Heading
                title='Bem vindo ao appManager'
                subtitle='Crei sua conta'
                center
            />
            <Input
                id='email'
                label='Email'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                id='name'
                label='Name'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
            <Input
                type='password'
                id='password'
                label='Password'
                disabled={isLoading}
                register={register}
                errors={errors}
                required
            />
        </div>
    )

    const footerContent = (
        <div className=' flex flex-col gap-4 mt-3'>
            <hr />
            <Button
                outline
                label='Continue with Google'
                icon={FcGoogle}
                onClick={() => { }}
            />
            <Button
                outline
                label='Continue with Github'
                icon={AiFillGithub}
                onClick={() => { }}
            />
            <div
                className='
                text-neutral-500
                text-center
                mt-4
                font-light
                '
            >
                <div className='flex flex-row items-center gap-2'>
                    <div>
                        Already have an account?
                    </div>
                    <div
                        onClick={registerModal.onClose}
                        className='text-neutral-800 cursor-pointer hover:underline'>
                        Log in
                    </div>
                </div>

            </div>
        </div>
    )

    return (
        <Modal
            disabled={isLoading}
            isOpen={registerModal.isOpen}
            title='Register'
            onClose={registerModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel='Continue'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default RegisterModal;