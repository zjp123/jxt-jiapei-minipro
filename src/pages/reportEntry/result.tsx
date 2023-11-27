import React from 'react'
import { WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'
import {url} from '@/utils/utils'

const Index: React.FC = () => {
    const params: any = Taro.getCurrentInstance().router?.params;
    const path = url + `/supplierAllBack?source=1&${params.payStatus ? `&payStatus=${params.payStatus}` : ''}`

    console.log(path, '=======>url')
    
    return (
        <WebView src={path} />
    )
}

export default Index
