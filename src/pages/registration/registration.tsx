import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './registration.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className=''>
      <Text>报名</Text>
    </View>
  )
}
