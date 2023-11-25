import { View, Text, Image } from '@tarojs/components'
import './index.scss'
import { defaultTrainImage } from '@/utils/imgUrl'

const SingleCard = (props) => {
    const {item = {}, lastChild, isNotIndexPage = false} = props
    return <View className="single-card-box" style={{borderBottom: lastChild ? 'none' : isNotIndexPage ? 'static' : '1px solid #EDEDED' }}>
            <Image className="img-left-width" src={item.jxCdPicUrl && item.jxCdPicUrl[0] ? item.jxCdPicUrl[0] + '?w=107&h=72&ss=1' : defaultTrainImage} />
            <View className="card-right">
                <Text className="card-right-title">{item.courseName}{item.name}</Text>
                <View className="card-right-jz">
                    <Image className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_jz.png" />
                    <Text className="max-line-one">{item.vehicleType.replace(/,/g, '/')}</Text>
                </View>
                <View className="card-right-jz">
                    <Image data-longitude={item.longitude} data-latitude={item.latitude} className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_dz.png" />
                    <Text className="max-line-one" numberOfLines={1} maxLines={1}>{item.address}</Text>
                </View>
            </View>
    </View>
}

export default SingleCard