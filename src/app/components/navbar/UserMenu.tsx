'use client';

import { AiOutlineMenu } from 'react-icons/ai'
import Avatar from '../Avatar';
import { useCallback } from 'react';
import MenuItem from './MenuItem';
import useRegisterModal from '../../hooks/useRegisterModal';
import { useLoginModal } from '../../hooks/useLoginModal';
import { signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import useTaskEditModal from '@/app/hooks/useTaskEditModal';
import useToggle from '@/app/hooks/utils/useToggle';

interface UserMenuProps {

}

const UserMenu: React.FC<UserMenuProps> = () => {
    const router = useRouter();
    const registerModal = useRegisterModal();
    const loginModal = useLoginModal();
    const taskEditModal = useTaskEditModal();
    const isOpen = useToggle()
    const { data } = useSession()

    const handleLogout = useCallback(() => {
        signOut({ redirect: false }).then(callback => {
            toast.success('deslogado')
            isOpen.toggleState()
            router.refresh()
        })
    }, [router, isOpen])

    const handleLogin = useCallback(() => {
        isOpen.toggleState()
        loginModal.onOpen()
    }, [isOpen, loginModal]);

    const handleTaskEdit = useCallback(() => {
        isOpen.toggleState()
        taskEditModal.onOpen()
    }, [taskEditModal, isOpen])



    const handleRedirectRoles = useCallback(() => {
        isOpen.toggleState()
        if (data?.user) {
            router.push(`/${data?.user.id}/listingRoles`)
        }
        console.log(data?.user)

    }, [isOpen, data?.user, router])
    return (
        <div className="relative">
            <div className="flex flex-row items-center justify-end gap-3 ">
                <div
                    onClick={() => { }}
                    className="
                        hidden
                        md:block
                        text-sm
                        font-semibold
                        py-3
                        px-4
                        rounded-full
                        hover:bg-neutral-100
                        transition
                        cursor-pointer
                    "
                >
                    appManeger your home
                </div>
                <div
                    onClick={isOpen.toggleState}
                    className="
                        p-4
                        md:py-1
                        md:px-2
                        border-[1px]
                        border-neutral-200
                        flex
                        flex-row
                        items-center
                        gap-3
                        rounded-full
                        cursor-pointer
                        hover:shadow-md
                        transition
                    "
                    data-testid='button_menu_show_option_user_profile'
                >
                    <AiOutlineMenu />
                    <div>
                        <Avatar />
                    </div>
                </div>
            </div>
            {isOpen.state && (
                <div
                    className='
                        absolute
                        rounded-xl
                        shadow-md
                        w-[40vw]
                        md:w-3/4
                        bg-white
                        overflow-hidden
                        right-0
                        top-12
                        text-sm
                    '
                >
                    <div className='flex flex-col cursor-pointer'>
                        {data?.user && (
                            <>
                                <MenuItem
                                    onClick={() => { }}
                                    label='Perfil'
                                />

                                <MenuItem
                                    onClick={() => { }}
                                    label='My Home'
                                />
                                <MenuItem
                                    onClick={handleRedirectRoles}
                                    label='My roles'
                                />
                                <MenuItem
                                    onClick={handleTaskEdit}
                                    label='task'
                                />
                                <hr />
                                <MenuItem
                                    onClick={handleLogout}
                                    label='Sair'
                                />
                            </>
                        )}
                        {!data?.user && (
                            <>
                                <MenuItem
                                    onClick={handleLogin}
                                    label='Login'
                                    data-testId='button_menu_show_modal_login'
                                />
                                <MenuItem
                                    onClick={registerModal.onOpen}
                                    label='Sign up'
                                />

                                <MenuItem
                                    onClick={handleTaskEdit}
                                    label='task'
                                />
                            </>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}

export default UserMenu;