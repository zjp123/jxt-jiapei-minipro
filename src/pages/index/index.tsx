import { View, ScrollView, Image } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import Taro, { useLoad, useReady } from '@tarojs/taro'
import { useEffect } from 'react'
import './index.scss'
import Navigation from '../../components/navbar/navbar'
import SwiperCom from '../../components/swiperCom/swiper'
import { useState } from 'react'
import TextIcon from './components/text-icon/text-icon'
import CoachField from './components/coach-field/coach-field'
import ClassIntroduc from './components/class-introduc/class-introduc'
import CoachStar from './components/coach-star/coach-star'
import SmartSchool from './components/smart-school/smart-school'
import SchoolNews from './components/school-news/school-news'
import ContactUs from './components/contact-us/contact-us'
import ActivityCom from './components/activity-com/activity-com'
import { get as getGlobalData } from '../../global_data'
import { getIndexPageApi } from "@/api/common"

let _freshing = false
export default function Index() {
    const schoolId = getGlobalData('schoolId')
    const [triggered, setTriggered] = useState(false)
    const [isOpenModalVisible, setIsOpenModalVisible] = useState(false)
    // const [arr, setArr] = useState([])
    const [topPx, setTopPx] = useState()
    // const [page, setPage] = useState(1)
    // const totalPages = 6;
    // const navRef = useRef()
    const [fieldList, setFieldList] = useState([])
    const [classIntroducList, setClassIntroducList] = useState([])
    const [coachStarList, setCoachStarList] = useState([])
    const [newsList, setNewsList] = useState([])
    const [contactInfo, setContactInfo] = useState({})
    
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
              // console.log(res, '>>>>')
              setTopPx(res[0].top)
          })
    })

    const fetchData = async () => {
        const res = await getIndexPageApi('POST')
        console.log(res, '>>>>>>')
        setContactInfo(res.data || {})
    }

    // const fetchData = (pageNum?) => {
    //     if (_freshing) return
    //     Taro.showLoading({
    //         title: '加载中',
    //     })
    //     _freshing = true
    //     if (page === 1 || pageNum === 1) {
    //         setTimeout(() => {
    //             Taro.hideLoading()
    //             const list: any = []
    //             for (let i = 0; i < 10; i++) list.push(i)
    //             setArr(list)
    //             setTriggered(false)
    //             _freshing = false
    //         }, 1000)
    //         return
    //     }
    //     setTimeout(() => {
    //         Taro.hideLoading()
    //         const list: any = []
    //         for (let i = 0; i < 10; i++) list.push(i)
    //         setArr(arr.concat(list))
    //         setTriggered(false)
    //         _freshing = false
    //     }, 1000)
    // }

    const onRestore = (e) => {
        console.log('onRestore:', e)
    }

    // 上拉
    // const onPuUp = () => {
    //     if (_freshing || page >= totalPages) return
    //     Taro.showLoading({
    //         title: '加载中',
    //     })
    //     _freshing = true
    //     setPage(page + 1)
    // }

    // 下拉刷新
    const onRefresh = () => {
        // if (_freshing) return
        // Taro.showLoading({
        //     title: '加载中',
        // })
        // _freshing = true
        // setPage(1)
        // fetchData(1)
        fetchData()
    }

	useLoad(() => {
		console.log('Page loaded.')
		// Taro.setNavigationBarTitle({
		//     title: <View><text>hhhh</text></View>
		// })scrollStyle
	})

	return (
		<View className='index_box'>
			<Navigation onchange={() => {
                fetchData()
            }}/>
            <View className="pb-36" style={{display: 'flex', flexDirection: 'column', flex: 1, overflow: 'hidden'}}>
                <ScrollView
                    id="scro_view"
                    scroll-y
                    style={{height: '100%'}}
                    // style="width: 100%; height: 100%;"
                    // style={{width: '100%', height: '100%', marginBottom: getGlobalData('tabbarHeight') + 36 + 'px'}}
                    lowerThreshold={50}
                    refresherEnabled={true}
                    refresherThreshold={topPx}
                    refresherDefaultStyle="black"
                    refresherBackground="#F8F8F8"
                    refresherTriggered={triggered}
                    // 滚动到底部/右边，会触发 上拉加载
                    // onScrollToLower={onPuUp}
                    // 自定义下拉刷新控件被下拉开始
                    onRefresherPulling={onPulling}
                    // 自定义下拉刷新被触发 -- 下拉刷新
                    onRefresherRefresh={onRefresh}
                    onRefresherRestore={onRestore}
                    // bindrefresherabort="onAbort"
                >
                    <SwiperCom />
                    <TextIcon />
                    {/* {
                        arr.map((item, index) => {
                            return (
                                <View key={index} style="display: flex; height: 100px;">
                                    <Image style={{width: '100%'}} src="https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80" />
                                </View>
                            )
                        })
                    } */}
                    <CoachField fieldList={fieldList}/>
                    <ClassIntroduc classIntroducList={classIntroducList}/>
                    <CoachStar coachStarList={coachStarList}/>
                    <SmartSchool />
                    <SchoolNews newsList={newsList}/>
                    <ContactUs contactInfo={contactInfo}/>
                    <View className="zhan-wei" style={{height: Taro.pxTransform(36)}}></View>
                </ScrollView>
                {/* <View className="zhan-wei" style={{height: '36px'}}></View> */}
            </View>
            <View id="activity-img" onClick={() => {
                setIsOpenModalVisible(true)
            }}>
                <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/activity-img.png"/>
            </View>
            {
                isOpenModalVisible && <ActivityCom isOpenModalVisible={isOpenModalVisible} setIsOpenModalVisible={setIsOpenModalVisible}/>
            }
        </View>
	)
}
