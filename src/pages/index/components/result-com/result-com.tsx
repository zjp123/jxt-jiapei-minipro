import Taro from '@tarojs/taro'
import { View, Image, Button } from '@tarojs/components'
import { AtModal, AtModalContent, AtModalAction, AtButton } from 'taro-ui'
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
              isOpened={isSureModalVisible}
              onClose={onClose}
            >
              {/* <AtModalHeader>标题</AtModalHeader> */}
              <AtModalContent>
                <View className='modal-content'>
                  这里是正文内容，欢迎加入京东凹凸实验室
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