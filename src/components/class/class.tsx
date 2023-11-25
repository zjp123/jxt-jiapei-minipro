import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getClassList } from '@/api/common'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultClassesImage } from '@/utils/imgUrl'
import SignupBtn from '@/components/signupBtn/signupBtn'
import './class.scss'

const Index: React.FC = () => {
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
                                            {
                                                !!item?.learnDriverTime &&
                                                <View className='class-margin-top'>
                                                    <Text className='class-tab'>{item?.learnDriverTime}</Text>
                                                </View>
                                            }
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
                                            <SignupBtn data={item} />
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
