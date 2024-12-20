'use client'

import { authenticate } from "../lib/actions"
import { useForm, SubmitHandler } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react"

import { useFormState } from "react-dom"
import { LoginResponseFormData } from "../lib/schemas"


export function FormLogin() {
    const initalValue = { success: false, data: undefined, error: undefined } as LoginResponseFormData;
    const [errorMessage, dispatch] = useFormState(authenticate, undefined)
    return (
        <div className="flex flex-row justify-center items-center">

            <form action={dispatch} className="flex flex-1 flex-col p-2">
                <div className="flex flex-col gap-1">
                    <label htmlFor="email">Email</label>
                    <input type="text" name="email" />

                </div>
                <div className="flex flex-col gap-1">
                    <label htmlFor="password">Password</label>
                    <input type="text" name="password" />

                </div>

                <button type="submit" className="bg-orange-600 rounded-md p-1 text-white">Entrar</button>

            </form>
            <div className="flex flex-1     p-2 ">
                <div className="flex  h-40 w-40 rounded-md  bg-slate-500">
                    <pre>
                        {JSON.stringify(errorMessage, null, 2)}
                    </pre>
                </div>
            </div>
        </div>
    )
}