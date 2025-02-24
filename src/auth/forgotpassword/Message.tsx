import { useNavigate, useSearchParams } from "react-router-dom";
import AuthContainer from "../container";

const MessageComponent = () => {
    const navigate = useNavigate();
    const [searchparams] = useSearchParams();
    const Email = searchparams?.get('email')

    return(
        <div className='w-full h-full'>
            <AuthContainer>
                <div className='w-screen h-screen flex flex-col items-center justify-center'>
                    <img src='/Success.jpg' alt='tick logo' />
                    <div className='text-2xl font-bold pt-2 pb-4'>Email Sent Successfully</div>
                    <div className='font-medium text-lg text-gray-400 text-center'>Please check your inbox or spam folder at<br /> <span className="text-[#5353f1] font-semibold">{Email}</span>  for a link to reset your password.</div>
                    <div className='text-[#f16253] mt-4 text-xl underline font-bold cursor-pointer' onClick={() => navigate("/login")}>Go Back to Log in Page</div>
                </div>
            </AuthContainer>
        </div>
    )
}

export default MessageComponent;