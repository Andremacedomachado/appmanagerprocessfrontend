import { FormLogin } from "../components/formLogin";

export default function LoginPage() {

    return (
        <main className="flex flex-col  justify-center items-center p-10  ">

            <div className="flex flex-col gap-2 rounded-md p-4 shadow-md h-full ">
                <div className="flex  items-end bg-gradient bg-orange-600 h-24 rounded-md p-2 ">

                    <h1 className="text-white font-serif font-extrabold ">Login</h1>
                </div>
                <div className="flex ">
                    <FormLogin />
                </div>

            </div>
        </main>
    )
}