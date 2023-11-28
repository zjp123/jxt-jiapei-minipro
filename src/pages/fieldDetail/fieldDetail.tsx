import { View, Text, Map, CoverView, CoverImage } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
// import { useLoad } from '@tarojs/taro'
import './fieldDetail.scss'
// import { set as setGlobalData } from '../../global_data'
import Taro, { useLoad, useRouter } from '@tarojs/taro'
import { getFieldDetailApi } from "@/api/common"
import { useEffect, useState } from 'react'
import HeaderCard from './header-card'
import locationPath from '../../static/images/location.png'
import ImgList from './img-list'
import NoData from '@/components/noData/noData'


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

let mapCtx: any = null

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

  useLoad(() => {
    // const query = Taro.createSelectorQuery()
    // query.select('#mapId')
    mapCtx = Taro.createMapContext('mapId')
    // console.log(mapCtx, 'dddddddddddddddddddd')
  })

  const getDataFn = async() => {
     Taro.showLoading()
     const res = await getFieldDetailApi('POST', {id: params.id})
     console.log(res, '获取场地详情获取场地详情获取场地详情')
     Taro.hideLoading()
     setTimeout(() => {
      setData(res.data || {})
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
     }, 100);
     
  }

  return (
    <View id='field-detail-wrap'>
        <HeaderCard mapCtx={mapCtx} address={data.address} longitude={data.longitude} latitude={data.latitude} isDetail lastChild item={data}/>
        <View className="introduce">
          <Text className="introduce-title">练车场地介绍</Text>
          {data.regionDesc ? <View className="some-text">{data.regionDesc}</View> : <NoData />}
        </View>
        <View className="environment">
          <Text className="introduce-title">场地环境</Text>
          {data.jxCdPicUrl.length ? <ImgList picUrlList={data.jxCdPicUrl}/> : <NoData />}
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
              onClick={() => {
                mapCtx.openMapApp({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  destination: data.address,
                  success:()=>{
                    console.log('导航触发成功');
                  },
                  fail:()=>{
                    console.log('导航触发失败');
                  }, 
                }) 
              }}
              onError={(e) => {
                console.log('地图发生错误', e)
              }}
              markers={makersObj}
              enableZoom={true}
              enableScroll={true}
              latitude={data.latitude}
              longitude={data.longitude}
              scale={16}
              onMarkerTap={() => {
                mapCtx.openMapApp({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  destination: data.address,
                  success:()=>{
                    console.log('导航触发成功');
                  },
                  fail:()=>{
                    console.log('导航触发失败');
                  }, 
                }) 
              }}
              onCalloutTap={() => {
                mapCtx.openMapApp({
                  latitude: data.latitude,
                  longitude: data.longitude,
                  destination: data.address,
                  success:()=>{
                    console.log('导航触发成功');
                  },
                  fail:()=>{
                    console.log('导航触发失败');
                  }, 
                }) 
              }}
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
