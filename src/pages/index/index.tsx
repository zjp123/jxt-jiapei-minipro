import { View, ScrollView } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import Taro, { useReady, useRouter } from '@tarojs/taro'
import { useEffect, useState, useRef } from 'react'
import './index.scss'
import Navigation from '../../components/navbar/navbar'
import SwiperCom from '../../components/swiperCom/swiper'
import TextIcon from './components/text-icon/text-icon'
import CoachField from './components/coach-field/coach-field'
import ClassIntroduc from './components/class-introduc/class-introduc'
import CoachStar from './components/coach-star/coach-star'
import SmartSchool from './components/smart-school/smart-school'
import SchoolNews from './components/school-news/school-news'
import ContactUs from './components/contact-us/contact-us'
import ActivityCom from './components/activity-com/activity-com'
import ResultCom from './components/result-com/result-com'
import { get as getGlobalData, set as setGlobalData } from '../../global_data'
import {
    getIndexPageApi,
    getFieldListApi,
    getClassTypeApi,
    getCocahStarApi,
    getNewsApi,
    getOpenIdApi
} from '@/api/common'

let _freshing = false
export default function Index() {
    const router = useRouter()
    const schoolId = getGlobalData('schoolId')
    const [triggered, setTriggered] = useState(false)
    const [isOpenModalVisible, setIsOpenModalVisible] = useState(false)
    const [isSureModalVisible, setIsSureModalVisible] = useState(false)
    const [topPx, setTopPx] = useState()
    const navRef = useRef()
    const [fieldList, setFieldList] = useState([])
    const [classIntroducList, setClassIntroducList] = useState([])
    const [coachStarList, setCoachStarList] = useState([])
    const [newsList, setNewsList] = useState([])
    const [contactInfo, setContactInfo] = useState({})
    console.log(router, '路由路由路由路由')
    const onPulling = (e) => {
        setTriggered(true)
        console.log('onPulling:', e)
    }
    // Taro.hideTabBar()
    // useEffect(() => {
    //     fetchData()
    // }, [page]);

    useEffect(() => {
        fetchData()
    }, [])

    useReady(() => {
        // 初次渲染时，在小程序触发 onReady 后，才能获取小程序的渲染层节点
        Taro.createSelectorQuery()
            .select('#scro_view')
            .boundingClientRect()
            .exec(res => {
                setTopPx(res[0].top)
            })
        const storeOpenId = Taro.getStorageSync('openId')
        if (storeOpenId) { // 如果已有openid 不在重新获取
            return
        }
        Taro.login({
            async success(res) {
                if (res.code) {
                    //发起网络请求
                    let data: any = null
                    try {
                        data = await getOpenIdApi('POST', { code: res.code }, 'BASE_SAAS')
                        console.log('获取openid结果', data)
                        if (data.code === 0) {
                            // 存储 openid
                            Taro.setStorage({
                                key: 'openId',
                                data: data.data.openid
                            })
                            setGlobalData('openId', data.data.openid)
                        }
                    } catch (error) {
                        console.log('getopenidgetopenidgetopenid', error)
                    }

                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        })
    })

    const fetchData = async (handChange?) => {
        if (_freshing) return
        Taro.showLoading({
            title: '加载中'
        })
        _freshing = true
        try {
            let res_contac: any = {}
            if (handChange) {
                res_contac = await getIndexPageApi('POST')
            } else {
                res_contac = await getIndexPageApi('POST', {}, router.params.ydtId)
            }
            const pageInfo = {
                pageIndex: 1,
                pageSize: 3
            }
            setGlobalData('schoolId', res_contac.data.id) // 更新最新一点通id
            const p2 = getFieldListApi('POST',pageInfo)
            const p3 = getClassTypeApi('POST',pageInfo)
            const p4 = getCocahStarApi('POST', { schoolId, isHome: true,...pageInfo })
            const p5 = getNewsApi('POST',pageInfo)
            // const res_contac = await p1
            setContactInfo(res_contac.data || {})
            const res_field = await p2
            setFieldList(res_field?.data?.list || [])
            const res_class_type = await p3
            setClassIntroducList(res_class_type?.data?.list || [])
            const res_cocah_type = await p4
            setCoachStarList(res_cocah_type?.data?.list || [])
            const res_news_list = await p5
            console.log(res_cocah_type, '>>>>>>>>>>>>')
            setNewsList(res_news_list?.data?.list || [])
            Taro.hideLoading()
            setTriggered(false)
            _freshing = false
        } catch (error) {
            Taro.hideLoading()
            setTriggered(false)
            _freshing = false
        }
    }

    const onRestore = (e) => {
        console.log(navRef, '00000000000')
        console.log('onRestore:', e)
        _freshing = false
        setTriggered(false)
        Taro.hideLoading()
    }

    // 下拉刷新
    const onRefresh = () => {
        fetchData()
    }

    return (
        <View className='index_box'>
            <Navigation contactInfo={contactInfo} ref={navRef} onchange={() => {
                fetchData(true)
            }} />
            <View className='pb-36' style={{ display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden' }}>
                <ScrollView
                    id='scro_view'
                    scroll-y
                    style={{ height: '100%' }}
                    lowerThreshold={50}
                    refresherEnabled={true}
                    refresherThreshold={topPx}
                    refresherDefaultStyle='black'
                    refresherBackground='#F8F8F8'
                    refresherTriggered={triggered}
                    // 滚动到底部/右边，会触发 上拉加载
                    // onScrollToLower={onPuUp}
                    // 自定义下拉刷新控件被下拉开始
                    onRefresherPulling={onPulling}
                    // 自定义下拉刷新被触发 -- 下拉刷新
                    onRefresherRefresh={onRefresh}
                    onRefresherRestore={onRestore}>
                    <SwiperCom />
                    <TextIcon />
                    <CoachField fieldList={fieldList} />
                    <ClassIntroduc classIntroducList={classIntroducList} />
                    <CoachStar coachStarList={coachStarList} />
                    <SmartSchool />
                    <SchoolNews newsList={newsList} />
                    <ContactUs contactInfo={contactInfo} />
                    <View className='zhan-wei' style={{ height: Taro.pxTransform(36) }}></View>
                </ScrollView>
            </View>
            {isOpenModalVisible &&
                <ActivityCom isOpenModalVisible={isOpenModalVisible} setIsOpenModalVisible={setIsOpenModalVisible}
                             setIsSureModalVisible={setIsSureModalVisible} />
            }
            {
                isSureModalVisible &&
                <ResultCom isSureModalVisible={isSureModalVisible} setIsSureModalVisible={setIsSureModalVisible} />
            }
        </View>
    )
}
