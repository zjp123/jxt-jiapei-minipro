// import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction } from 'taro-ui'
// import { useState } from 'react'
import './index.scss'

const ResultCom = (props) => {
    // const [isOpened, setIsOpened] = useState(props.isOpened || false)
    // const handleChange = () => {
    //     setIsOpened(true)
    // }
    const {isSureModalVisible, setIsSureModalVisible} = props
    const onClose = () => {
      setIsSureModalVisible(false)
    }
    return (
        <>
            <AtModal
              className="result-modal-wrap"
              isOpened={isSureModalVisible}
              onClose={onClose}
            >
              {/* <AtModalHeader>标题</AtModalHeader> */}
              <AtModalContent>
                <View className='img-header'>
                  <Image src="https://img.58cdn.com.cn/dist/jxt/images/jxtschool/duihao.png"/>
                </View>
                <View className='modal-content'>
                  <View className="font-style">优惠领取成功！</View>
                  <View className="con-desc">这里是正文内容，欢迎加入京东凹凸实验室</View>
                  <View style={{display: 'flex', justifyContent: 'center'}}>
                    <Button onClick={() => {
                      setIsSureModalVisible(false)
                    }} className='result-sure'>确定</Button>
                  </View>
                </View>
              </AtModalContent>
              <AtModalAction>
                {/* <Button onClick={() => {}}>确定</Button> */}
              </AtModalAction>
            </AtModal>
        </>
    )
}

export default ResultCom