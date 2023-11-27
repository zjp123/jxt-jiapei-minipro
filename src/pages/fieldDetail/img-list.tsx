// import React from 'react'
import { View, Image, Swiper, SwiperItem } from '@tarojs/components'
import Taro from '@tarojs/taro'
const ImgList = (props) => {
    const {picUrlList = [] } = props

    // 图片预览
    const previewImage = (list, index) => {
        Taro.previewImage({
            current: list[index],
            urls: list
        })
    }
    
    return <View className="img-list-wrap" >
            <View className='detail-swipe'>
                  {
                      !!picUrlList?.length &&
                      <Swiper
                          className='detail-swipe-box'
                      >
                          {
                              picUrlList?.map((item, index) => {
                                  return (
                                      <SwiperItem key={index} className='detail-swipe-item'>
                                          <Image onClick={() => previewImage(picUrlList, index)} className='detail-swipe-item-img' src={item} />
                                      </SwiperItem>
                                  )
                              })
                          }
                      </Swiper>
                  }
          </View>
      </View>
  }
export default ImgList