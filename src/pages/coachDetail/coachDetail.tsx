import React, { useState, useEffect } from 'react'
import { View, Text, ScrollView, CoverImage } from '@tarojs/components'
import Taro from '@tarojs/taro'
import { getCoachDetail, getCoachDetailDpList } from '@/api/common'
import NoData from '@/components/noData/noData'
import { addSyncTrackLog } from '@/utils/utils'
import { defaultCoachImage, shiming, coachAreaImg, contact, anonymousImg, star_img1, star_img2 } from '@/utils/imgUrl'
import './coachDetail.scss'

const pf = [1, 2, 3, 4, 5]

const Index: React.FC = () => {
    const { params, path }: any = Taro.getCurrentInstance().router;
    // 教练数据
    const [data, setData] = useState<any>({});
    // 评论数据
    const [dpList, setDpList] = useState<any>({
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
        getList()
        getPlList({ pageIndex: 1 })
    }, [])
    // 请求数据接口
    const getList = async () => {
        try {
            const res: any = await getCoachDetail('POST', { id: params.id })
            if (res?.code === 0 || res?.code === 200) {
                setData(res?.data)
            }
        } catch (e) {

        }
    }
    // 获取教练详情评论数据
    const getPlList = async (page) => {
        try {
            const res: any = await getCoachDetailDpList('POST', { id: params.id, ...dpList?.pagination, ...page })
            if (res?.code === 0 || res?.code === 200) {
                const data = [...dpList?.list, ...res?.data?.list]
                setDpList({ ...res?.data, list: data })
            }
        } catch (e) {

        }
    }

    // 咨询
    const goConsult = () => {
        addSyncTrackLog('打开客服', path, navigator.userAgent)
    }

    // 上拉加载
    const onLoadMore = () => {
        if (dpList?.list.length === dpList?.pagination?.totalRows) {
            return
        }
        getPlList({ pageIndex: dpList.pagination.pageIndex + 1 })
    };

    return (
        <View className='coach-detail-werrper'>
            <ScrollView
                scrollY
                style={{ height: '100%', backgroundColor: '#F8F8F8' }}
                onScrollToLower={onLoadMore}
                lowerThreshold={50}
            >
                <View className='coach-bg'>
                    <View
                        className='coach-item'
                    >
                        <View className='coach-item-img'>
                            <CoverImage className='img' src={data?.coachPhotoUrl ? data?.coachPhotoUrl + '?w=70&h=70' : defaultCoachImage} />
                        </View>
                        <View className='coach-item-content'>
                            <View className='coach-content-top'>
                                <Text className='coach-title'>{data?.coachName}</Text>
                                <CoverImage className='coach-shiming' src={shiming} />
                                <Text className='coach-year'>{data?.coachYear}年教龄</Text>
                            </View>
                            <View className='coach-content-area'>
                                <CoverImage className='coach-area-img' src={coachAreaImg} />
                                <Text className='coach-area-text'>{data?.coachAreaList?.join('、')}</Text>
                            </View>
                            <View className='coach-content-info'>
                                <Text className='coach-score'>{data?.score}分</Text>
                                <Text className='coach-dp'>
                                    点评<Text className='coach-dpCount'>{data?.dpCount}</Text>条
                                </Text>
                            </View>
                            <View className='coach-tabs'>
                                {
                                    data?.dpInfo?.map((i, index) => (
                                        <Text key={index} className='coach-tab'>{i}</Text>
                                    ))
                                }
                            </View>
                            <View
                                className='coach-contact'
                                onClick={goConsult}
                            >
                                <button
                                    className='coach-contact-btn'
                                    type="link"
                                    size="40"
                                    session-from="sobot|{{userInfo.nickName}}|{{userInfo.avatarUrl}}|{{params}}"
                                    open-type="contact"
                                >
                                    <CoverImage
                                        className='coach-contact-img'
                                        src={contact}
                                    />
                                </button>

                            </View>
                        </View>
                    </View>
                    <View className='coach-detail-content'>
                        <View className='detail-title'>教练基本信息</View>
                        <View className='detail-tip'>
                            {data.coachDesc}
                            {!data?.coachDesc?.length &&
                                <NoData />
                            }
                        </View>
                    </View>
                    <View className='coach-detail-stu-dp'>
                        <View className='detail-title'>学员点评</View>
                        <View className='detail-tip'>
                            {
                                dpList?.list?.map((item, index) => {
                                    return (
                                        <View key={index} className='pl-item' >
                                            <View className='pl-user-head'>
                                                <CoverImage className='pl-user-img' src={item?.anonymous ? anonymousImg : item?.headPicUrl} />
                                            </View>
                                            <View className='pl-user-content'>
                                                <View className='pl-user-top'>
                                                    <Text className='pl-user-name'>{item?.anonymous ? '匿名用户' : item?.stuName}</Text>
                                                    <View className='pl-user-pf'>
                                                        {
                                                            pf.map((i) => {
                                                                return (
                                                                    <CoverImage className='pl-pf-img' key={i} src={i > Number(item?.starts) ? star_img1 : star_img2} />
                                                                )
                                                            })
                                                        }
                                                        <Text className='pl-pf-text'>{item?.starts}分</Text>
                                                    </View>
                                                    <Text className='pl-user-pf'></Text>
                                                </View>
                                                {
                                                    !!item?.dpInfo?.length &&
                                                    <View className='pl-user-tabs'>
                                                        {
                                                            item?.dpInfo?.map((i, ind) => (
                                                                <Text className='pl-user-tab' key={ind}>{i}</Text>
                                                            ))
                                                        }
                                                    </View>
                                                }
                                                <View className='pl-user-text'>{item?.content}</View>
                                                <View className='pl-user-time'>{item?.dpTime}</View>
                                            </View>
                                        </View>
                                    )
                                })
                            }
                            {
                                !dpList?.list?.length &&
                                <View className='no-pl-list'>暂无更多数据～</View>
                            }
                        </View>
                    </View>
                </View>
                {
                    dpList?.list.length === dpList?.pagination?.totalRows && dpList?.pagination?.totalRows !== 0 &&
                    <View className='no-list'>暂无更多~</View>
                }
            </ScrollView>
        </View>
    )
}

export default Index
