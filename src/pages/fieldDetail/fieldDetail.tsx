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
import ImgList from './img-list'

const normalCallout = {
  id: 1,
  latitude: 23.098994,
  longitude: 113.322520,
  iconPath: '/image/location.png',
  callout: {
    content: '文本内容',
    color: '#ff0000',
    fontSize: 14,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: '#000000',
    bgColor: '#fff',
    padding: 5,
    display: 'ALWAYS',
    textAlign: 'center'
  },
  // label: {
  //   content: 'label 文本',
  //   fontSize: 24,
  //   textAlign: 'center',
  //   borderWidth: 1,
  //   borderRadius: 5,
  //   bgColor: '#fff',
  //   padding: 5
  // }
}

const customCallout1 = {
  id: 2,
  // latitude: 23.097994,
  // longitude: 113.323520,
  latitude: 39.142853,
  longitude: 117.244186,
  iconPath: locationPath,
  // iconPath: '',
  // iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 0,
    display: 'ALWAYS'
  },
}

const customCallout2 = {
  id: 3,
  latitude: 23.096994,
  longitude: 113.324520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 10,
    anchorX: 0,
    display: 'ALWAYS',
  },
}

const customCallout3 = {
  id: 4,
  latitude: 23.095994,
  longitude: 113.325520,
  iconPath: '/image/location.png',
  customCallout: {
    anchorY: 0,
    anchorX: 20,
    display: 'ALWAYS',
  },
}

// const obj = {
//   id: 1,
//   latitude: 0,
//   longitude: 0,
//   iconPath: locationPath,
//   width: 16,
//   height: 16,
//   customCallout: {
//     anchorY: 0,
//     anchorX: 0,
//     display: 'ALWAYS'
//   },
// }

export default function FieldDetail() {
  const { params }: any = useRouter()
  const [data, setData] = useState({
    jxCdPicUrl: [],
    courseName: '',
    latitude: 0,
    longitude: 0,
    name: '',
    vehicleType: '',
    address: '',
    regionDesc: ''
  })
  const [makersObj, setMakersObj] = useState<any>([])
  useEffect(() => {
    getDataFn()
  }, [])

  const getDataFn = async() => {
     Taro.showLoading()
     const res = await getFieldDetailApi('POST', {id: params.id})
     console.log(res, '获取场地详情获取场地详情获取场地详情')
     Taro.hideLoading()
     setMakersObj([{
        id: 1,
        latitude: res.data.latitude,
        longitude: res.data.longitude,
        // latitude: 23.098994,
        // longitude: 113.322520,
        iconPath: locationPath,
        width: 30,
        height: 30,
        content: res.data.address,
        customCallout: {
          anchorY: 0,
          anchorX: 0,
          display: 'ALWAYS'
        },
     }])
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
          <ImgList picUrlList={data.jxCdPicUrl || []}/>
        </View>
        <View className="address">
          <Text className="introduce-title" 
          // onClick={() => {
          //   const markers = [customCallout1]
          //   setMakersObj(markers)
          // }}
          >详细地址</Text>
          <View style={{borderRadius: '12px', marginTop: Taro.pxTransform(24), overflow: 'hidden'}}>
            <Map 
              id="mapId"
              markers={makersObj}
              enableZoom={true}
              enableScroll={true}
              latitude={data.latitude}
              longitude={data.longitude}
              scale={16}
              // bindmarkertap="onMarkerTap"
              // bindcallouttap="onCalloutTap"
              // bindlabeltap="onLabelTap"
            >
              <CoverView 
              // @ts-ignore
              slot='callout'
              >
                  {
                    makersObj.map((item) => {
                      return <CoverView key={item.id} className="customCallout" marker-id={item.id}>
                        <CoverImage className="icon" src={item.iconPath} />
                        <CoverView className="content"> 
                          {item.content}
                        </CoverView> 
                      </CoverView>
                    })
                  }
              </CoverView>
            </Map>
          </View>
        </View>
    </View>
  )
}
