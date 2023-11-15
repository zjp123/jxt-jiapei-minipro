import { View, CoverImage, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// import { useState, useEffect } from 'react'
import './navbar.scss'
import { get as getGlobalData } from '../../global_data'
// import Taro from '@tarojs/taro'
import logoPath from '../../static/images/58.png'

export default function Navbar(props) {
	// useEffect(() => {
		
	// }, [])
	useLoad(() => {
		console.log('Page loaded.')
		// Taro.setNavigationBarTitle({
		//     title: <View><text>hhhh</text></View>
		// })
	})

	return (
        <>
            <View className={`navigationPage ${props.size}`} style={{ backgroundColor: props.backgroundColor }}>
                {/* // 手机状态栏的高度 */}
                <View style={{height: getGlobalData('statusBarHeight') + 'px', width: '100%'}}></View>
                {/* // 导航高度 */}
                <View style={{height: getGlobalData('navBarHeight') + 'px', width: '100%'}} className="head">
                    <View className="navigationIcon">
                        <Text>北京</Text>
                    </View>
                    <View className="navigationTitle">
                        <CoverImage className='logoimg' src={logoPath} />
                        <Text className="ml">{props.title}</Text>
                    </View>
                </View>
            </View>
            {/* 空白view元素占用高度 */}
            {/* <View style={{height: props.height + 'px'}}></View> */}
        </>
	)
}
Navbar.defaultProps = {
    title:'驾培集团',
    // height:20,
    paddingTop:0,
    backgroundColor:'#fff',
    size:'default'
}
