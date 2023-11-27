import React from 'react'
import { WebView } from '@tarojs/components'
import Taro from '@tarojs/taro'

const Index: React.FC = () => {
    const url =
    process.env.NODE_ENV === 'production'
        ? `https://jxtm.jxedt.com/h5/#/spScanCode`
        : process.env.NODE_ENV === 'development'
            ? `http://jxtguns.58v5.cn/h5/#/spScanCode`
            : `http://jxtguns.58v5.cn/h5/#/spScanCode`
    const params: any = Taro.getCurrentInstance().router?.params;
    
    return (
        <WebView src={url + `/supplierAllBack?source=1&${params.payStatus ? `&payStatus=${params.payStatus}` : ''}`} />
    )
}

export default Index
