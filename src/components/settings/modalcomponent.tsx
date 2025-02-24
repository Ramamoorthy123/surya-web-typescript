import { Button, Form, Input, message, Modal } from "antd"
import { useState } from "react";
import axiosInstance from "../../utils/axios";

interface formtype {
    "old-password": string;
    "password": string;
    "confirm-password": string;
}

const ModalComponent = (props: any) => {
    const { visible, setVisible, email} = props;
    const [loader, setLoader] = useState(false);
    const [form] = Form.useForm();

    const handleCancel = () => {
        setVisible(false)
    }

    const onFinish = async(data: formtype ) => {
        setLoader(true)
        try{
            if(data?.password !== data?.['confirm-password']){
                message.error("Password Doesn't Match")
            }
            else{
                await axiosInstance.post(`auth/reset-password`, {
                    email: email, 
                    new_password: data?.password, 
                    old_password: data?.["old-password"]
                })
                message.success("Password changed Successfully")
                form.resetFields()
                setVisible(false)
            }
        }
        catch(err) {
            console.log(err)
            message.error("Something Went Wrong")
        } finally {
            setLoader(false)
        }

    }

    return (
        <Modal
            title={<div className="text-xl">{"Change Password"}</div>}
            open={visible} 
            footer={false} 
            onCancel={handleCancel}
            width={'450px'}
        >
            <div className="pt-4">
                <Form
                    name="basic"
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
                    layout="vertical"
                    requiredMark={false}
                    
                >
                    <Form.Item
                        label={<span className="text-[16px] text-gray-500">Old Password</span>}
                        name="old-password"
                        rules={[{ required: true, message: 'Please input your old password!' }]}
                    >
                        <Input.Password className="text-[16px] p-3" placeholder="Enter your old password" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-[16px] text-gray-500">Password</span>}
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password className="text-[16px] p-3" placeholder="Enter your password" />
                    </Form.Item>

                    <Form.Item
                        label={<span className="text-[16px] text-gray-500">Confirm Password</span>}
                        name="confirm-password"
                        rules={[{ required: true, message: 'Please input your confirm password!' }]}
                    >
                        <Input.Password className="text-[16px] p-3" placeholder="Enter your confirm password" />
                    </Form.Item>

                    <Form.Item >
                        <div className="flex justify-end gap-4">
                            <Button className="font-[400] text-[16px] w-[100px] rounded-xl h-[40px]" onClick={handleCancel}>Cancel</Button>
                            <Button type="primary" loading={loader} className="font-[400] w-[130px] text-[16px] rounded-xl h-[40px]" htmlType="submit">
                                Update                               
                            </Button>
                        </div>
                    </Form.Item>
                </Form>
            </div>
        </Modal>
    )
}

export default ModalComponent;