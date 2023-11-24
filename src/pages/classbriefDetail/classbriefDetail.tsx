import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getClassDetail, getPersonalInfo, loginApi, getPhoneApi } from '@/api/common'
import NoData from '@/components/noData/noData'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultClassesImage } from '@/utils/imgUrl'
import './classbriefDetail.scss'

const Index: React.FC = () => {
    const url =
        process.env.NODE_ENV === 'production'
            ? `https://jxtm.jxedt.com/h5/#/spScanCode`
            : process.env.NODE_ENV === 'development'
                ? `http://jxtguns.58v5.cn/h5/#/spScanCode`
                : `http://jxtguns.58v5.cn/h5/#/spScanCode`
    const { params, path }: any = Taro.getCurrentInstance().router;
    const [data, setData] = useState<any>({});
    // 初始化
    useEffect(() => {
        getList()
    }, [])
    // 请求数据接口
    const getList = async () => {
        try {
            const res: any = await getClassDetail('POST', { id: params.id })
            if (res?.code === 0 || res?.code === 200) {
                res.data.remarksList = res?.data?.remarks
                    .replace(/[\.。；]/g, ';')
                    .split(';')
                    .filter((item: any) => item)

                setData(res?.data)
            }
        } catch (e) {

        }
    }
    // 跳转报名页
    const goSignup = () => {
        const openId = Taro.getStorageSync('openId')
        const phone = Taro.getStorageSync('phone')
        console.log(openId, '=====>openId', phone)
        Taro.navigateTo({
            url: `/pages/reportEntry/webview?url=${url}&tenantId=${data.tenantId}&classesId=${data.id}&carType=${data.dicTrainType}&openId=${openId}&phone=${phone}`
        })
    }

    const loginFn = async (data) => {
        return await loginApi('POST', { ...data })
    }

    // 登陆
    const goLogin = () => {
        Taro.login({
            async success(res) {
                Taro.showLoading()
                if (res.code) {
                    try {
                        let data = await getPhoneApi('POST', { code: res.code })
                        console.log('获取openid结果', data)
                        console.log(res, '手机号手机号手机号手机号手机号')
                        const telPhone = data.data.phone
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
                        goSignup()
                    } catch (error) {
                        Taro.hideLoading()
                    }

                } else {
                    console.log("登录失败！" + res.errMsg);
                }
            },
        });
    }

    // 报名
    const goApplication = async () => {
        addSyncTrackLog('在线报名', path, navigator.userAgent)
        try {
            const res: any = await getPersonalInfo('POST', {})
            // 登陆失效 重新登陆
            if (res?.code === 4100) {
                goLogin()
            } else {
                goSignup()
            }
        } catch (e) {

        }
    }


    // 图片预览
    const previewImage = (list, index) => {
        Taro.previewImage({
            current: list[index],
            urls: list
        })
    }

    return (
        <View className='class-detail-werrper'>
            <ScrollView
                scrollY
                style={{ height: '100%', backgroundColor: '#F8F8F8' }}
            >
                <View className='class-bg'>
                    <View className='class-item'>
                        <View className='class-item-img'>
                            <Image className='img' src={data?.picUrl ? data?.picUrl + '?w=233&h=175' : defaultClassesImage} />
                        </View>
                        <View className='class-item-content'>
                            <View className='class-content-top'>
                                <Text className='class-title'>{data?.dicTrainType} {data?.name}</Text>
                            </View>
                            <View className='class-content-tab'>
                                <View>
                                    <Text className='class-tab'>最快{data?.naBen}天拿证</Text>
                                    <Text className='class-tab class-right'>{data?.ctdK2}</Text>
                                </View>
                                <View className='class-margin-top'>
                                    <Text className='class-tab'>{data?.learnDriverTime}</Text>
                                </View>
                            </View>
                            <View className='class-content-car'>
                                <Text className='class-car-text'>车辆：</Text>
                                <Text className='class-car-name'>{data?.carType}</Text>
                            </View>
                            <View className='class-content-price'>
                                <Text className='class-price-text'>活动价¥</Text>
                                <Text className='class-price-num'>{data?.price}</Text>
                                <Text className='class-price-prve'>原价¥{data?.originalPrice}</Text>
                            </View>
                            <View className='class-content-btn'>
                                <Text className='class-btn' onClick={(e) => {
                                    e.stopPropagation()
                                    goApplication()
                                }}>在线报名</Text>
                            </View>
                        </View>
                    </View>
                    <View className='class-detail-content'>
                        <View className='detail-title'>班型介绍</View>
                        <View className='detail-tip'>
                            {
                                data?.remarksList?.map((e, index) => {
                                    return (
                                        <View key={index} className='class-tip-item'>{e}</View>
                                    )
                                })
                            }
                            {!data?.remarksList?.length &&
                                <NoData />
                            }
                        </View>
                        <View className='detail-swipe'>
                            {
                                !!data?.picUrlList?.length &&
                                <Swiper
                                    className='detail-swipe-box'
                                >
                                    {
                                        data?.picUrlList?.map((item, index) => {
                                            return (
                                                <SwiperItem key={index} className='detail-swipe-item'>
                                                    <Image onClick={() => previewImage(data?.picUrlList, index)} className='detail-swipe-item-img' src={item} />
                                                </SwiperItem>
                                            )
                                        })
                                    }
                                </Swiper>
                            }
                            {
                                !data?.picUrlList?.length &&
                                <NoData />
                            }
                        </View>
                    </View>
                </View>
            </ScrollView>
        </View>
    )
}

export default Index
