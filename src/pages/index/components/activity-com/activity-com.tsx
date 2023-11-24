// // import React from 'react'
// import { View, Text, Image } from '@tarojs/components'
// import './index.scss'

// const ActivityCom = () => {
//     return <View id="activity-content">
//         <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/huo-dong-nr.png"/>
//     </View>
// }

// export default ActivityCom

import Taro from '@tarojs/taro'
import { View, Image } from '@tarojs/components'
import { AtCurtain, AtButton } from 'taro-ui'
// import { useState } from 'react'
import './index.scss'

const ActivityCom = (props) => {
    // const [isOpened, setIsOpened] = useState(props.isOpened || false)
    // const handleChange = () => {
    //     setIsOpened(true)
    // }
    const {isOpenModalVisible, setIsOpenModalVisible} = props
    const onClose = () => {
        setIsOpenModalVisible(false)
    }

    return (
        <>
            <AtCurtain
                className="activity-content"
                isOpened={isOpenModalVisible}
                onClose={onClose}
            >
                <Image
                    // style='width:574px;height:804px'
                    style={{width: Taro.pxTransform(574), height: Taro.pxTransform(804)}}
                    src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/huo-dong-nr.png"
                />
                <Image className="ling-qu" src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/lingqu.png"/>
            </AtCurtain>
            {/* <AtButton
                onClick={handleChange}>
                右上关闭幕帘
            </AtButton> */}
        </>
    )
}

export default ActivityCom