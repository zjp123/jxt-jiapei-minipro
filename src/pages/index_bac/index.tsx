import { View, ScrollView, Image } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import Taro, { useLoad, useReady } from '@tarojs/taro'
import { useEffect, useRef } from 'react'
import './index.scss'
import Navigation from '../../components/navbar/navbar'
import SwiperCom from '../../components/swiperCom/swiper'
import { useState } from 'react'

let _freshing = false
export default function Index() {
    const [triggered, setTriggered] = useState(false)
    const [arr, setArr] = useState([])
    const [topPx, setTopPx] = useState()
    // const navRef = useRef()
    const onPulling = (e) => {
        setTriggered(true)
        console.log('onPulling:', e)
    }

    useReady(() => {
        // 初次渲染时，在小程序触发 onReady 后，才能获取小程序的渲染层节点
        Taro.createSelectorQuery()
          .select('#scro_view')
          .boundingClientRect()
          .exec(res => {
              console.log(res, '>>>>')
              setTopPx(res[0].top)
          })
      })

    const onRestore = (e) => {
        console.log('onRestore:', e)
    }

    // 上拉
    const onPuUp = () => {
        if (_freshing || arr.length >= 30) return
        Taro.showLoading({
            title: '加载中',
        })
        _freshing = true
        setTimeout(() => {
            Taro.hideLoading()
            const list: any = []
            for (let i = 0; i < 10; i++) list.push(i)
            setArr(arr.concat(list))
            setTriggered(false)
            _freshing = false
        }, 1000)
    }

    // 下拉刷新
    const onRefresh = () => {
        if (_freshing) return
        Taro.showLoading({
            title: '加载中',
        })
        _freshing = true
        // setTimeout(() => {
        //   this.setData({
        //     triggered: false,
        //   })
        //   this._freshing = false
        // }, 3000)
        setTimeout(() => {
            Taro.hideLoading()
            const list: any = []
            for (let i = 0; i < 10; i++) list.push(i)
            setArr(list)
            setTriggered(false)
            _freshing = false
        }, 1000)
    }

	useEffect(() => {
		// console.log(navRef.current, 'lll')
	}, [])
	useLoad(() => {
		console.log('Page loaded.')
		// Taro.setNavigationBarTitle({
		//     title: <View><text>hhhh</text></View>
		// })scrollStyle
	})

	return (
		<View className='index_box'>
			<Navigation/>
            <ScrollView
                id="scro_view"
                scroll-y
                style="width: 100%; height: 100%; border: 1px solid blue;"
                lowerThreshold={50}
                refresherEnabled={true}
                refresherThreshold={topPx}
                refresherDefaultStyle="white"
                refresherBackground="lightgreen"
                refresherTriggered={triggered}
                // 滚动到底部/右边，会触发 上拉加载
                onScrollToLower={onPuUp}
                // 自定义下拉刷新控件被下拉开始
                onRefresherPulling={onPulling}
                // 自定义下拉刷新被触发 -- 下拉刷新
                onRefresherRefresh={onRefresh}
                onRefresherRestore={onRestore}
                // bindrefresherabort="onAbort"
            >
                <SwiperCom />
                {
                    arr.map((item, index) => {
                        return (
                            <View key={index} style="display: flex; height: 100px;">
                                <Image src="https://images.unsplash.com/photo-1565699894576-1710004524ba?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1832&q=80" />
                                <Image src="https://images.unsplash.com/photo-1566378955258-7633cb5c823e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80" />
                                <Image src="https://images.unsplash.com/photo-1566404394190-cda8c6209208?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=630&q=80" />
                                <Image src="https://images.unsplash.com/photo-1566490595448-be523b4d2914?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=958&q=80" />
                            </View>
                        )
                    })
                }
            </ScrollView>
		</View>
	)
}
