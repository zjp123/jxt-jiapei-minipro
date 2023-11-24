import { View, WebView } from '@tarojs/components'
import Taro, { useLoad } from '@tarojs/taro'

const Consultation = () => {

    useLoad(() =>{
        setTimeout(() => {
            Taro.setNavigationBarTitle({ title: '咨询' }) // 设置自定义标题
        },2000)
    })

    return (
        <View>
            <WebView
                src={'https://jxt.soboten.com/chat/h5/v6/index.html?sysnum=4d43f6416ac84028adb1d29bede67376&source=10'}
            />
        </View>
    )
}

export default Consultation