import { View } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
import Class from '@/components/class/class'
import './registration.scss'

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <View className=''>
      <Class />
    </View>
  )
}
