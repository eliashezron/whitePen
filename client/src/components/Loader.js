import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

import React from 'react'

function Loader() {
const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
    return (

        <>
        <Spin 
        indicator={antIcon} />
        </>
    )
}

export default Loader
