import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getClassList, getOpenIdApi } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultClassesImage } from '@/utils/imgUrl'
import './class.scss'

const Index: React.FC = () => {
    const url =
        process.env.NODE_ENV === 'production'
            ? `https://jxtm.jxedt.com/h5/#/spScanCode`
            : process.env.NODE_ENV === 'development'
                ? `http://jxtguns.58v5.cn/h5/#/spScanCode`
                : `http://jxtguns.58v5.cn/h5/#/spScanCode`
    const { path }: any = Taro.getCurrentInstance().router;
    const [triggered, setTriggered] = useState(false)
    const [list, setList] = useState({
        list: [],
        pagination: {
            pageIndex: 1,
            pageSize: 10,
            totalPages: 1,
            totalRows: 1,
        }
    });
    // 初始化
    useEffect(() => {
        getList({ pageIndex: 1 })
    }, [])
    // 请求数据接口
    const getList = async (page, flag = false) => {
        try {
            const res: any = await getClassList('POST', { ...list?.pagination, ...page })
            if (res?.code === 0 || res?.code === 200) {
                res.data.list.forEach((item: any) => {
                    if (item.remarks) {
                        item.remarksList = item.remarks
                            .replace(/[\.。；]/g, ';')
                            .split(';')
                            .filter((item: any) => item)
                    }
                })

                if (flag) {
                    const data = [...list?.list, ...res?.data?.list]
                    setList({
                        ...res?.data,
                        list: data
                    })
                } else {
                    setList(res?.data)
                }
            }
            setTriggered(false)
        } catch (e) {

        }
    }
    // 下拉触发
    const onPulling = () => {
        setTriggered(true)
    }

    // 下拉重新加载
    const onRefresh = () => {
        getList({ pageIndex: 1 })
    };
    // 上拉加载
    const onLoadMore = () => {
        if (list?.list.length === list?.pagination?.totalRows) {
            return
        }
        getList({ pageIndex: list.pagination.pageIndex + 1 }, true)
    };

    // 报名
    const goApplication = (item) => {
        addSyncTrackLog('在线报名', path, navigator.userAgent)
        // Taro.getStorageSync('openId')  Taro.getStorageSync('phone') Taro.getStorageSync('tokenId')
        const d = Taro.getStorageSync('openId')
        console.log(d, '=====>')
        // Taro.navigateTo({
        //     url: `/pages/webview/webview?url=${url}&tenantId=${item.tenantId}&classesId=${item.id}&carType=${item.dicTrainType}`
        // })
        // Taro.getUserProfile({
        //     desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
        //     success: (res) => {
        //         console.log(res, '获取昵称和头像结果')
        //         // 开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        //     },
        //     fail: () => {
        //         console.log('拒绝获取头像和昵称')
        //     }
        // })
        // Taro.login({
        //     async success(res) {
        //         if (res.code) {
        //             console.log("第一个code", res)
        //             //发起网络请求
        //             let data: any = null
        //             try {
        //                 data = await getOpenIdApi('POST', { code: res.code })
        //                 console.log('获取openid结果', data)
        //                 // if (data.code === 0) {
        //                 //     let params = {
        //                 //         openId: data.data.openid,
        //                 //         code: res.code,
        //                 //     }
        //                 // }
        //             } catch (error) {
        //                 console.log('getopenidgetopenidgetopenid', error)
        //             }

        //         } else {
        //             console.log("登录失败！" + res.errMsg);
        //         }
        //     },
        // });
    }

    // 班制详情
    const goDetail = (item) => {
        addSyncTrackLog('班型详情', path, navigator.userAgent)
        Taro.navigateTo({
            url: `/pages/classbriefDetail/classbriefDetail?id=${item.id}`
        })
    }

    return (
        <View className='class-werrper'>
            <ScrollView
                scrollY
                style={{ height: '100%', backgroundColor: '#F8F8F8' }}
                onScrollToLower={onLoadMore}
                lowerThreshold={50}
                refresherEnabled={true}
                refresherThreshold={50}
                refresherDefaultStyle="black"
                refresherBackground="#F8F8F8"
                refresherTriggered={triggered}
                // 自定义下拉刷新控件被下拉开始
                onRefresherPulling={onPulling}
                // 自定义下拉刷新被触发 -- 下拉刷新
                onRefresherRefresh={onRefresh}
            >
                <View className='class-bg'>
                    {
                        list?.list?.map((item: any, index) => {
                            return (
                                <View
                                    key={index}
                                    className='class-item'
                                    onClick={() => {
                                        goDetail(item)
                                    }}
                                >
                                    <View className='class-item-img'>
                                        <Image className='img' src={item?.picUrl ? item?.picUrl + '?w=233&h=175' : defaultClassesImage} />
                                    </View>
                                    <View className='class-item-content'>
                                        <View className='class-content-top'>
                                            <Text className='class-title'>{item?.dicTrainType} {item?.name}</Text>
                                        </View>
                                        <View className='class-content-tab'>
                                            <View>
                                                <Text className='class-tab'>最快{item?.naBen}天拿证</Text>
                                                <Text className='class-tab class-right'>{item?.ctdK2}</Text>
                                            </View>
                                            <View className='class-margin-top'>
                                                <Text className='class-tab'>{item?.learnDriverTime}</Text>
                                            </View>
                                        </View>
                                        {
                                            !!item?.remarksList?.length &&
                                            <View className='class-content-tip'>
                                                {
                                                    item?.remarksList?.map((e, index) => {
                                                        return (
                                                            <View key={index} className='class-tip-item'>{e}</View>
                                                        )
                                                    })
                                                }

                                            </View>
                                        }
                                        <View className='class-content-price'>
                                            <Text className='class-price-text'>活动价¥</Text>
                                            <Text className='class-price-num'>{item?.price}</Text>
                                            <Text className='class-price-prve'>原价¥{item?.originalPrice}</Text>
                                        </View>
                                        <View className='class-content-btn'>
                                            <Text className='class-btn' onClick={(e) => {
                                                e.stopPropagation()
                                                goApplication(item)
                                            }}>在线报名</Text>
                                        </View>
                                    </View>
                                </View>
                            )
                        })
                    }
                </View>
                {
                    list?.list.length === list?.pagination?.totalRows &&
                    <View className='no-list'>暂无更多~</View>
                }
            </ScrollView>
        </View>
    )
}

export default Index
