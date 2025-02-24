import { useState } from "react";
import AuthContainer from "../container";
import { Button, Form, Input, message } from "antd";
import axiosInstance from "../../utils/axios";
import { useNavigate } from "react-router-dom";
import { BiArrowBack } from "react-icons/bi"


interface ForgotPasswordType {
    email: string,
}

const LoginPage = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();

    const onFinish = async (data: ForgotPasswordType) => {
        setLoader(true)
        try {
            let res = await axiosInstance.post(`/auth/forget-password?email=${data?.email}`);
            if(res?.data) {
                navigate(`/forgot-password/success?email=${data?.email}`)
            }
        } catch(error) {
            console.log(error)
            message.error("Invalid user email")
        } finally {
            setLoader(false)
        }
    }

    const handleBack = () => {
        navigate("/login")
    }

    return (
        <div className='w-full h-full'>
            <AuthContainer>
                <div>
                    <div>
                        <img src='/suryalogo.svg' alt='' width="230px" height="50px" className="mb-5" />
                    </div>
                    <div className="flex items-center pt-2 pb-4 text-2xl font-[500] text-[#383838] cursor-pointer gap-4">
                        <div onClick={handleBack}><BiArrowBack /></div>
                        <div>Forgot Password</div>
                    </div>
                    {/* <div className="text-[#383838] font-[500] py-4 text-xl">
                       Don’t worry! we got your back
                    </div> */}
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
                                label={<span className="text-lg py-2 text-gray-500">Email</span>}
                                name="email"
                                rules={[{ required: true, message: 'Please input your email!' }]}
                            >
                                <Input  className="text-lg p-3" placeholder="Enter your email"/>
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" loading={loader} className="w-[400px] font-[500] text-lg rounded-3xl h-[60px]" htmlType="submit">
                                    Send Reset Link                                
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </AuthContainer>
        </div>
    )
}

export default LoginPage;