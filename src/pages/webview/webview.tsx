import React from 'react'
import { WebView} from '@tarojs/components'
import Taro from '@tarojs/taro'

const Index: React.FC = () => {
    const params: any = Taro.getCurrentInstance().router?.params;
    const handleMessage = (data) => {
        console.log(data)
    }
    console.log(params, '=======>')
    return (
        <WebView src={params?.url + `?tenantId=${params.tenantId}&classesId=${params.classesId}&carType=${params.carType}`} onMessage={handleMessage} />
    )
}

export default Index
