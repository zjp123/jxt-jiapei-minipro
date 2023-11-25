import { View, Text, Map, CoverView, CoverImage, Slot } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
// import { useLoad } from '@tarojs/taro'
import './fieldDetail.scss'
// import { set as setGlobalData } from '../../global_data'
import Taro, { useRouter } from '@tarojs/taro'
import { getFieldDetailApi } from "@/api/common"
import { useEffect, useState } from 'react'
import HeaderCard from './header-card'
import locationPath from '../../static/images/location.png'

export default function FieldDetail() {
  const { params }: any = useRouter()
  const [data, setData] = useState({
    jxCdPicUrl: '',
    courseName: '',
    latitude: 0,
    longitude: 0,
    name: '',
    vehicleType: '',
    address: '',
    regionDesc: ''
  })
  const [makersObj, setMakersObj] = useState<any>(
    {
      id: 1,
      latitude: 0,
      longitude: 0,
      iconPath: locationPath,
      width: 16,
      height: 16,
      customCallout: {
        anchorY: 0,
        anchorX: 0,
        display: 'ALWAYS'
      },
    })

  useEffect(() => {
    getDataFn()
  }, [])

  const getDataFn = async() => {
     Taro.showLoading()
     const res = await getFieldDetailApi('POST', {id: params.id})
     Taro.hideLoading()
     setMakersObj({
        id: 1,
        // latitude: res.data.latitude,
        // longitude: res.data.longitude,
        latitude: 23.098994,
        longitude: 113.322520,
        iconPath: locationPath,
        width: 16,
        height: 16,
        customCallout: {
          anchorY: 0,
          anchorX: 0,
          display: 'ALWAYS'
        }
     })
     console.log(res, '>>>>>>>>>>>>>>>')
     setData(res.data || {})
  }

  return (
    <View id='field-detail-wrap'>
        <HeaderCard isDetail lastChild item={data}/>
        <View className="introduce">
          <Text className="introduce-title">练车场地介绍</Text>
          <View className="some-text">{data.regionDesc}</View>
        </View>
        <View className="environment">
          <Text className="introduce-title">场地环境</Text>
        </View>
        <View className="address">
          <Text className="introduce-title">详细地址</Text>
          <Map 
            id="mapId"
            markers={[makersObj]}
            enableZoom={true}
            enableScroll={true}
            // latitude={data.latitude}
            // longitude={data.longitude}
            // bindmarkertap="onMarkerTap"
            // bindcallouttap="onCalloutTap"
            // bindlabeltap="onLabelTap"
          >
            <CoverView 
            // @ts-ignore
            slot='callout'
            >
              {/* <Slot name="callout"> */}
                <CoverView  className="customCallout" marker-id={1}>
                    <CoverImage className="icon" src={locationPath} />
                    <CoverView className="content"> 
                      哈哈哈
                    </CoverView>
                </CoverView>
              {/* </Slot> */}
            </CoverView>
          </Map>
        </View>
    </View>
  )
}
