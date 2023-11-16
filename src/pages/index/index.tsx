// import { View, Text } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { useEffect } from 'react'
import './index.scss'
import Navigation from '../../components/navbar/navbar'
import SwiperCom from '../../components/swiperCom/swiper'

export default function Index() {
	// const [padTop, setPadTop] = useState<number>()
	useEffect(() => {
		
	}, [])
	useLoad(() => {
		console.log('Page loaded.')
		// Taro.setNavigationBarTitle({
		//     title: <view><text>hhhh</text></view>
		// })
	})

	return (
		<>
			<Navigation />
            <SwiperCom />
			{/* <View className='box'>
				<Text>Hello world!</Text>
				<Text>58驾培</Text>
			</View> */}
		</>
	)
}
