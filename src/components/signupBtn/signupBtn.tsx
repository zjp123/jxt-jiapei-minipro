import React, { useState, useEffect } from 'react'
import { View, Text, Button } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getPhoneApi, loginApi } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import {url} from '@/utils/utils'
import './signupBtn.scss'

interface Props {
    data: any // 
}

const Index: React.FC<Props> = (props) => {
    const { data } = props
    const accountInfo = Taro.getAccountInfoSync();
    const { path }: any = Taro.getCurrentInstance().router;

    // 按钮展示
    const [isShowBtn, setIsShowBtn] = useState(!!(Taro.getStorageSync('openId') && Taro.getStorageSync('phone')))

    useEffect(() => {
        setIsShowBtn(!!(Taro.getStorageSync('openId') && Taro.getStorageSync('phone')))
    }, [data])

    // 跳转报名页
    const goSignup = () => {
        const openId = Taro.getStorageSync('openId')
        const phone = Taro.getStorageSync('phone')
        console.log(openId, '=====>openId', phone)
        Taro.navigateTo({
            url: `/pages/reportEntry/webview?url=${url}&tenantId=${data.tenantId}&classesId=${data.id}&carType=${data.dicTrainType}&openId=${openId}&phone=${phone || ''}&appId=${accountInfo?.miniProgram?.appId || ''}`
        })
    }
    const loginFn = async (data) => {
        return await loginApi('POST', { ...data })
    }

    // 登陆
    const goLogin = async (e) => {
        console.log(e)
        if (!e.target.code) {
            Taro.showToast({
                title: '请登录在进行报名',
                icon: 'none',
                duration: 2000,
                mask: true,
            })
            return
        }
        try {
            Taro.showLoading()
            const res = await getPhoneApi('POST', { code: e.target.code })
            console.log(res, '手机号手机号手机号手机号手机号')
            const telPhone = res.data.phone
            Taro.setStorage({
                key: "phone",
                data: telPhone
            })
            const loginRes = await loginFn({ phone: telPhone, loginType: 3, openId: Taro.getStorageSync('openId') })
            Taro.hideLoading()
            console.log(loginRes, '获取token获取token获取token获取token')
            Taro.setStorage({
                key: 'tokenId',
                data: loginRes.data.token
            })
            goApplication()
        } catch (error) {
            Taro.hideLoading()
        }
    }

    // 报名
    const goApplication = async () => {
        addSyncTrackLog('在线报名', path, navigator.userAgent)
        goSignup()
    }

    return (
        <View
            className='btn-warrper'
            onClick={(e) => {
                e.stopPropagation()
            }}
        >
            {
                isShowBtn ?
                    <Text className='class-btn' onClick={(e) => {
                        e.stopPropagation()
                        goApplication()
                    }}>在线报名</Text> :
                    <Button
                        className='class-btn'
                        openType='getPhoneNumber'
                        onGetPhoneNumber={goLogin}
                    >在线报名</Button>
            }

        </View>
    )
}

export default Index
