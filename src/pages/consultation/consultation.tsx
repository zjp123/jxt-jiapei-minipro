import { View, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import './consultation.less'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className=''>
      <Text>咨询</Text>
    </View>
  )
}
