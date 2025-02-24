import { useState } from "react";
import AuthContainer from "../container";
import { Button, Form, Input, message } from "antd";
import Cookies from 'js-cookie';
import { decodeJWT } from "../../utils/jwt";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { AiOutlineMobile } from "react-icons/ai"
import { useAtom } from "jotai";
import { getUserData } from "../../atoms/settings/setting";



interface logintype {
    email: string,
    password: string
}

const LoginPage = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const [, setUserDetails] = useAtom(getUserData)

    const onFinish = async (data: logintype) => {
        setLoader(true)
        try {
            const res = await axiosInstance.post(`/auth/login`, {
                "email": data?.email,
                "password": data?.password
            });

            if(res?.data) {
                const decoded = decodeJWT(res.data["access_token"]);
                setUserDetails(decoded)
                Cookies.set("access_token", res.data["access_token"], { expires: new Date(decoded.exp * 1000) });
                Cookies.set("refresh_token", res.data["refresh_token"], { expires: new Date(decoded.exp * 1000) });
                localStorage.setItem("Theme", 'light')
                localStorage.setItem("project_permissions", JSON.stringify(res.data.project_permissions))
                message.success("Login Successfully")
                navigate('/dashboard')
            } else {
                message.error("Invalid email or password") 
            }
        } catch(error) {
            console.log(error)
            message.error("Invalid email or password")
        } finally {
            setLoader(false)
        }
    }

    const handleNavigate = () => {
        navigate("/forgot-password")
    }

    return (
        <div className='w-full h-full'>
            <AuthContainer>
                <div>
                    <div>
                        <img src='/suryalogo.svg' alt='' width="230px" height="50px" className="mb-5" />
                    </div>
                    <div className="w-[400px]">
                        <Form
                            name="basic"
                            style={{ maxWidth: 600 }}
                            onFinish={onFinish}
                            autoComplete="off"
                            layout="vertical"
                            requiredMark={false}
                        >
                            <Form.Item
                                label={<span className="text-lg py-2 text-gray-500">Email ID</span>}
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input  className="text-lg p-3" placeholder="Enter your email"/>
                            </Form.Item>

                            <Form.Item
                                className="mb-2"
                                label={<span className="text-lg text-gray-500">Password</span>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password className="text-lg p-3" placeholder="Enter your password" />
                            </Form.Item>

                            <div 
                                className="pt-2 pb-8 text-lg font-[500] text-[#545252] cursor-pointer flex justify-end"
                                onClick={handleNavigate}
                            >
                                Forgot Password?
                            </div>

                            <Form.Item >
                                <Button type="primary" loading={loader} className="w-[400px] font-[500] text-lg rounded-3xl h-[60px]" htmlType="submit">
                                    Sign In
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                    <div className='flex justify-center mt-16'>
                        <div className='flex cursor-pointer' onClick={() => window.location.replace("https://tablet.suryaweb.app/install")}>
                            <AiOutlineMobile className='text-[#f16253] font-[500] mt-0.5 mr-1 text-xl' style={{ rotate: "270deg" }} />
                            <p className=' underline underline-offset-2 font-[500] text-[#f16253]'>Download Tablet App</p>
                        </div>
                    </div>
                </div>
                
            </AuthContainer>
        </div>
    )
}

export default LoginPage;