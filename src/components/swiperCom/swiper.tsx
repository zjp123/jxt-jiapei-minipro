import { Image, Swiper, SwiperItem } from '@tarojs/components'
// import { useState } from 'react'
// import { useLoad } from '@tarojs/taro'
// import { useState, useEffect } from 'react'
import './swiper.scss'
// import { get as getGlobalData } from '../../global_data'
// import Taro from '@tarojs/taro'
// import logoPath from '../../static/images/58.png'
// import { AtActionSheet, AtActionSheetItem } from "taro-ui"
// import { useState } from 'react'

export default function SwiperCom() {
    // const [current, setCurrent] = useState(1)
	return (
        <>
            <Swiper
                className='swiper_com'
                indicatorColor='#999'
                indicatorActiveColor='#333'
                circular={true}
                // current={current}
                indicatorDots={true}
                autoplay={true}
                interval={3000}
            >
                <SwiperItem>
                    <Image className='slide-image' src='https://img.58cdn.com.cn/dist/jxt/images/jxtschool/ba1.png'/>
                </SwiperItem>
                <SwiperItem>
                    <Image className='slide-image' src='https://img.58cdn.com.cn/dist/jxt/images/jxtschool/ba2.png'/>
                </SwiperItem>
            </Swiper>
        </>
	)
}
SwiperCom.defaultProps = {
    
}
