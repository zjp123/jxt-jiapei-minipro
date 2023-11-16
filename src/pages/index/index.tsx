// import { View, Text } from '@tarojs/components'
// import Taro from '@tarojs/taro'
import { useLoad } from '@tarojs/taro'
import { useEffect } from 'react'
import './index.scss'
import Navigation from '../../components/navbar/navbar'

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
			{/* <View className='box'>
				<Text>Hello world!</Text>
				<Text>58驾培</Text>
			</View> */}
		</>
	)
}
