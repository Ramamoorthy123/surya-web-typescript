import { useState } from "react";
import AuthContainer from "../container";
import { Button, Form, Input, message } from "antd";
import axiosInstance from "../../utils/axios";
import { useNavigate, useSearchParams } from "react-router-dom";


interface PasswordResetType {
    "password": string,
    "confirm-password": string
}

const ResetPassword = () => {
    const [loader, setLoader] = useState<boolean>(false);
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();
    const Email = searchparams?.get('email')

    const onFinish = async (data: PasswordResetType) => {
        setLoader(true)
        try {
            if(data?.password === data?.["confirm-password"]) {
                let res = await axiosInstance.post(`auth/reset-password`, {email: Email, password: data?.password});
                if(res?.data) {
                    message.error("Password Updated Successfully")
                    navigate("/login")
                }
            } else {
                message.error("Password or confirm password mismatch")
            }
        } catch(error) {
            console.log(error)
            message.error("Something Went Wrong")
        } finally {
            setLoader(false)
        }
    }

    return (
        <div className='w-full h-full'>
            <AuthContainer>
                <div>
                    <div>
                        <img src='/suryalogo.svg' alt='' width="230px" height="50px" className="mb-5" />
                    </div>
                    <div className="flex items-center pt-2 pb-4 text-2xl font-[500] text-[#383838] cursor-pointer gap-4">
                        <div>Change Password</div>
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
                                label={<span className="text-lg text-gray-500">Password</span>}
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input.Password className="text-lg p-3" placeholder="Enter your password" />
                            </Form.Item>

                            <Form.Item
                                label={<span className="text-lg text-gray-500">Confirm Password</span>}
                                name="confirm-password"
                                rules={[{ required: true, message: 'Please input your confirm password!' }]}
                            >
                                <Input.Password className="text-lg p-3" placeholder="Enter your confirm password" />
                            </Form.Item>

                            <Form.Item >
                                <Button type="primary" loading={loader} className="w-[400px] font-[500] text-lg rounded-3xl h-[60px]" htmlType="submit">
                                    Update                               
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </AuthContainer>
        </div>
    )
}

export default ResetPassword;