'use client'

import { useImperativeHandle, useRef } from "react";
import { FC, forwardRef, useCallback, useState } from "react";

interface TurnDisableInputProps {
    children: React.ReactNode,
    disable: boolean
}

const TurnDisableInput: FC<TurnDisableInputProps> = ({ children, disable }) => {
    return (
        <div className="flex-1">
            <fieldset disabled={disable}>
                {children}
            </fieldset>
        </div>
    );
}

export default TurnDisableInput;