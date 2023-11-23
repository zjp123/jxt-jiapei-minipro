import React from 'react'
import { WebView} from '@tarojs/components'
import Taro from '@tarojs/taro'
import {get} from '@/global_data'

const Index: React.FC = () => {
    const params: any = Taro.getCurrentInstance().router?.params;
    const handleMessage = (data) => {
        console.log(data)
    }
    
    return (
        <WebView src={params?.url + `?tenantId=${params.tenantId}&classesId=${params.classesId}&carType=${params.carType}&phone=${get('userInfo')?.phone}`} onMessage={handleMessage} />
    )
}

export default Index
