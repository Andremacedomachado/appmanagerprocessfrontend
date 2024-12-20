import fetch, { Response } from 'node-fetch';
import useLogin from "./useLoginModal";
import { Summary } from '../../../mocks/Summary';
import { ComponentMock, ComponentMockProps } from '../../../mocks/ComponetUtilMock';
import { render, renderHook } from '@testing-library/react';

interface User {
    id: number;
    name: string;
    email: string;
}

interface Product {
    id: number;
    name: string;
    price: number;
}

const userData: User = {
    id: 1,
    name: "John Doe",
    email: "johndoe@example.com"
};

const productData: Product = {
    id: 1,
    name: "Smartphone",
    price: 999
};



describe('useLoginModal', () => {
    it('should call useLoginModal and intercept', () => {

    })

})