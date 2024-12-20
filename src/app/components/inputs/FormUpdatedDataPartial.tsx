
'use client'
import { FC } from "react";
import { FieldValues, RegisterOptions, useForm } from "react-hook-form";
import FormInput from "./FormInput";
import TurnDisableInput from "./TurnDisableInput";
import ButtonOption from "./ButtonOption";
import useToggle from "@/app/hooks/utils/useToggle";
import { twMerge } from "tailwind-merge";

interface FormUpdateDataPartialProps<T extends Object> extends FormUpdateDataRulesProps {
    initialValue: string
    placeholder?: string | undefined
    inputStyle: React.InputHTMLAttributes<HTMLInputElement>['className']
    actionSubmit: (data: T) => void
}

interface FormUpdateDataRulesProps {
    rules?: RegisterOptions
}

interface FormUpdateDataProps {
    field: string
}

const FormUpdateDataPartial: FC<FormUpdateDataPartialProps<FieldValues>> = ({ initialValue, placeholder = '', actionSubmit, inputStyle, rules }) => {

    const {
        register,
        formState: { errors },
        setValue,

        handleSubmit,
    } = useForm<FormUpdateDataProps>({ defaultValues: { field: initialValue } })

    const {
        state,
        toggleState
    } = useToggle()


    return (
        <form
            onSubmit={handleSubmit((data) => {
                setValue('field', data.field)
                actionSubmit(data)
            })}
            className="flex flex-row gap-1 w-full "
        >
            <TurnDisableInput disable={state}>
                {
                    <FormInput<FormUpdateDataProps>
                        id={"field"}
                        name={"field"}
                        type="text"
                        label={placeholder}
                        placeholder={placeholder}
                        register={register}
                        rules={rules}
                        errors={errors}
                        className={twMerge(!state ? " border border-zinc-500 rounded-md" : "", inputStyle)}
                    />
                }

            </TurnDisableInput>
            <ButtonOption
                type="submit"
                className={`${state && "hidden"} mx-auto transition duration-200`}>Save</ButtonOption>
            <ButtonOption onClick={(e) => {
                e.preventDefault()
                toggleState()
            }} className="mx-auto">Editar</ButtonOption>
        </form>
    );
}

export default FormUpdateDataPartial;
