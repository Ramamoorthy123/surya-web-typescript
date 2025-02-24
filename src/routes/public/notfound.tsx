import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';

const Index: React.FC = () => {
    const navigate = useNavigate()
    return (
        <Result
        status="404"
        title="404"
        subTitle="Page Not Found"
        extra={<Button type="primary" onClick={() => navigate('/login')}>Back to Login</Button>}
      />
    )
 
};

export default Index;