import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './my.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className=''>
      <Text>我的</Text>
    </View>
  )
}
