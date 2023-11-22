import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getClassDetail, getOpenIdApi } from '@/api/common'
import './classbriefDetail.scss'

const Index: React.FC = () => {
    const defaultClassesImage = 'https://img.58cdn.com.cn/dist/jxt/images/jxtschool/h5/classes-default.png'
    const url =
    process.env.NODE_ENV === 'production'
        ? `https://jxtm.jxedt.com/h5/#/spScanCode`
        : process.env.NODE_ENV === 'development'
            ? `http://jxtguns.58v5.cn/h5/#/spScanCode`
            : `http://jxtguns.58v5.cn/h5/#/spScanCode`
    const params: any = Taro.getCurrentInstance().router?.params;
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
                setData(res?.data)
            }
        } catch (e) {

        }
    }

    // 报名
    const goApplication = () => {
        Taro.navigateTo({
            url: `/pages/webview/webview?url=${url}&tenantId=${data.tenantId}&classesId=${data.id}&carType=${data.dicTrainType}`
        })
        // Taro.checkSession({
        //     success: function () {
        //         //session_key 未过期，并且在本生命周期一直有效
        //         Taro.navigateTo({
        //             url: `pages/webview/webview?url=http://jxtguns.58v5.cn/h5/#/spScanCode?tenantId=${item.tenantId}&classesId=${item.id}&carType=${item.dicTrainType}`
        //         })
        //     },
        //     fail: function () {
        //         // session_key 已经失效，需要重新执行登录流程
        //         Taro.login({
        //             async success(res) {
        //                 if (res.code) {
        //                     console.log("第一个code", res)
        //                     //发起网络请求
        //                     let data: any = null
        //                     try {
        //                         data = await getOpenIdApi('POST', { code: res.code })
        //                         console.log('获取openid结果', data)
        //                         // if (data.code === 0) {
        //                         //     let params = {
        //                         //         openId: data.data.openid,
        //                         //         code: res.code,
        //                         //     }
        //                         // }
        //                     } catch (error) {
        //                         console.log('getopenidgetopenidgetopenid', error)
        //                     }

        //                 } else {
        //                     console.log("登录失败！" + res.errMsg);
        //                 }
        //             },
        //         });
        //     }
        // })
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
                            <CoverImage className='img' src={data?.picUrl ? data?.picUrl + '?w=233&h=175' : defaultClassesImage} />
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
                            {
                                !!data?.remarksList?.length &&
                                <View className='class-content-tip'>
                                    {
                                        data?.remarksList?.map((e, index) => {
                                            return (
                                                <View key={index} className='class-tip-item'>{e}</View>
                                            )
                                        })
                                    }

                                </View>
                            }
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
                </View>
            </ScrollView>
        </View>
    )
}

export default Index
