// import React from 'react'
import { View, Text, Image } from '@tarojs/components'
function formatPhoneNumber(phoneNumber) {
  return phoneNumber.replace(/(\d{3})\d{4}(\d{4})/, '$1 $2');
}

const HeaderCard = (props) => {
    const {item = {jxCdPicUrl: []}} = props
    console.log(item, '>>>>>>>>>>>.')
    return <View className="single-card-box" >
            <Image className="img-left-width" src={item.jxCdPicUrl ? item.jxCdPicUrl[0] : ''} />
            <View className="card-right">
                <View className='fl'> 
                  <Text className="card-right-title">{item.name}</Text>
                  <Text className="kemu">{item.courseName}</Text>
                </View>
                <View className="card-right-jz">
                    <Image className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_jz.png" />
                    <Text className="max-line-one">{item.vehicleType.replace(/,/g, '、')}</Text>
                </View>
                <View className="phone-wrap">
                  <Image className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon-shouji-cd.png" />
                  <Text className="name"></Text>
                  <Text>{formatPhoneNumber(item.phone || '')}</Text>
                </View>
                <View className="card-right-jz text-line-address">
                    <Image data-longitude={item.longitude} data-latitude={item.latitude} className="icon-width" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/icon_dz.png" />
                    <Text className="max-line-one">{item.address}</Text>
                </View>
            </View>
    </View>
}

export default HeaderCard