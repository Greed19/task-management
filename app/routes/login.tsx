import { useEffect, useState } from "react"
import { useNavigate } from "react-router"
import { useLoginStore } from "~/store/login"
type Account = {
email: string,
password: string,
count: number
}
export default function Login() {
    const navigate = useNavigate()
    const {login} = useLoginStore()
    const [account , setAccount] = useState<Account>({
        email: '',
        password: '',
        count:0
    })

    const onChange = (e:React.ChangeEvent<HTMLInputElement>) => {
        const {name,value} = e.target
        setAccount((prev) => ( {...prev,[name]:value}))
    }
    console.log(account)
    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setAccount(prev => ({...prev, count: prev.count + 1}))
        if(account.password === 'Testpassw0rd!'){
            login()
            navigate('taskmanagement')
        }
    }

    useEffect(() => {
        if(account.count >= 3){
            setTimeout(() =>{
                setAccount(prev => ({...prev, count: 0}))
            },60000)
        }
    },[account.count])
    return(
        <main 
            className="h-screen w-full bg-custom-gradient text-black flex justify-center items-center"
            >
            <section className="w-1/2 h-1/2 bg-white/30  backdrop-blur-md border border-white flex flex-col items-center p-[20px] gap-[40px] rounded-[20px] border-2-white">
                <h2>Login</h2>
                <form onSubmit={onSubmit} className="flex flex-col items-center w-full h-full gap-[20px]">
                    <div className="flex w-full justify-start items-center">
                    <label htmlFor="">Email
                    </label>
                    <input 
                    className="w-1/2 mr-[50px] ml-auto py-[20px] px-[10px] bg-transparent"
                        type="email"
                        value={account.email}
                        name="email"
                        onChange={onChange}
                        placeholder="Enter Email Address"
                        required
                        />
                    </div>
                    <div className="flex w-full justify-start items-center">
                    <label htmlFor="">Password
                    </label>
                    <input 
                    className="w-1/2 mr-[50px] ml-auto py-[20px] px-[10px] bg-transparent"
                        type="password"
                        value={account.password}
                        name="password"
                        onChange={onChange}
                        required
                        placeholder="Enter Password"
                        />
                    </div>
                    {account.count >= 3 ? <span className="text-red-500">3 incorrect attempts try again after 1 minute</span> : null}
                    <button disabled={account.count >= 3 ? true: false} type="submit" className="bg-btn-gradient w-1/2 h-1/8 rounded-sm disabled:bg-gray-400 disabled:cursor-not-allowed">Login</button>
                </form>
            </section>
        </main>
    )
}