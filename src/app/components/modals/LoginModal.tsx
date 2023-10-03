'use client';
import { signIn, useSession } from 'next-auth/react';
import { toast } from 'react-hot-toast';
import { AiFillGithub } from 'react-icons/ai';
import { FcGoogle } from 'react-icons/fc';
import {
    FieldValues,
    SubmitHandler,
    useForm,
} from 'react-hook-form';
import Modal from './Modal';
import Heading from '../Heading';
import Input from '../inputs/Input';
import Button from '../Button';
import { useRouter } from 'next/navigation';
import useRegisterModal from '../../hooks/useRegisterModal';
import useLoginModal from '../../hooks/useLoginModal';
import { useLoading } from '@/app/hooks/utils/useLoading';
import { useCallback } from 'react';
const LoginModal = () => {
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const loadManager = useLoading(false);
    const router = useRouter()
    const { data: userInfo, update } = useSession()
    const {
        register,
        handleSubmit,
        formState: {
            errors
        },
        reset
    } = useForm<FieldValues>({
        defaultValues: {
            email: '',
            password: ''
        }
    })



    const onSubmit: SubmitHandler<FieldValues> = async (data) => {
        loadManager.setLoanding()
        const result = await signIn('credentials', {
            ...data,
            redirect: false
        })

        if (result?.ok) {
            toast.success('Sucesso ao logar')
            loadManager.setLoaded()
            reset({})
            loginModal.onClose()
        }
        if (result?.error) {
            toast.error(result.error)
        }
        loadManager.setLoaded()

        if (userInfo?.user.id) {
            console.log('userLogged::', userInfo)

        }

        router.push(`/redirectautenticated`)
    }

    const bodyContent = (
        <div className='flex flex-col gap-4  ' >
            <Heading
                title='Bem vindo'
                subtitle='Entre com sua email e senha'
            />
            <Input
                id='email'
                label='Email'
                disabled={loadManager.isLoanding}
                register={register}
                errors={errors}
                required
            />
            <Input
                type='password'
                id='password'
                label='Password'
                disabled={loadManager.isLoanding}
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
            disabled={loadManager.isLoanding}
            isOpen={loginModal.isOpen}
            title='Login'
            onClose={loginModal.onClose}
            onSubmit={handleSubmit(onSubmit)}
            actionLabel='Continue'
            body={bodyContent}
            footer={footerContent}
        />
    )
}

export default LoginModal;