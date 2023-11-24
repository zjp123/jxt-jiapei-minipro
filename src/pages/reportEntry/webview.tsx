import React from 'react'
import { WebView} from '@tarojs/components'
import Taro from '@tarojs/taro'

const Index: React.FC = () => {
    const params: any = Taro.getCurrentInstance().router?.params;
    const handleMessage = (data) => {
        console.log(data)
    }
    console.log(params?.url + `?openId=${params.openId || ''}&tenantId=${params.tenantId || ''}&classesId=${params.classesId || ''}&carType=${params.carType || ''}&phone=${params.phone || ''}`, '=====>params')
    return (
        <WebView src={params?.url + `?openId=${params.openId || ''}&tenantId=${params.tenantId || ''}&classesId=${params.classesId || ''}&carType=${params.carType || ''}&phone=${params.phone || ''}`} onMessage={handleMessage} />
    )
}

export default Index
