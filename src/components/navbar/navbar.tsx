import { View, CoverImage, Text } from '@tarojs/components'
import { useLoad } from '@tarojs/taro'
// import { useState, useEffect } from 'react'
import './navbar.scss'
import { get as getGlobalData, set as setGlobalData } from '../../global_data'
import Taro from '@tarojs/taro'
import { AtActionSheet, AtActionSheetItem } from "taro-ui"
import { useState, forwardRef, useEffect } from 'react'
const Navbar = forwardRef((props: any, ref) => {
    const {contactInfo} = props
    const [isOpened, setIsOpened] = useState(false)
    const [area, setArea] = useState('佛山')
    // 1707325546549014529 22144
    const [areaList, setAreaList] = useState<Array<any>>([
      {
        cityName: '佛山',
        id: process.env.NODE_ENV === 'development' ? '1128592555575894016' : '1707325546549014529'
        // id: '1707325546549014529'
      },
      {
        cityName: '石家庄',
        id: process.env.NODE_ENV === 'development' ? '1426060676178128896' : '22144'
        // id: '22144'
      }
    ])
    useEffect(() => {
      const ele = areaList.find((item) => item.id === contactInfo.id)
      if (!ele && contactInfo.id) { // 如果不在默认列表里
        setAreaList(areaList.concat([{
          cityName: contactInfo.city,
          id: contactInfo.id
        }]))
        setArea(contactInfo.city)
        setGlobalData('schoolId', contactInfo.id)
      }
    }, [contactInfo.id])

    useLoad(() => {
          // Taro.hideTabBar()
      console.log('Page loaded.')
      // Taro.setNavigationBarTitle({
      //     title: <View><text>hhhh</text></View>
      // })
    })

    const handleCancel = () => {
        setIsOpened(false)
        Taro.showTabBar()
    }
    const handleClose = () => {
        setIsOpened(false)
        Taro.showTabBar()
    }
    const handleClick = (area, schoolId) => {
        setGlobalData('schoolId', schoolId)
        props.onchange && props.onchange(area, schoolId)
        setArea(area)
        setIsOpened(false)
        Taro.showTabBar()
    }

	return (
        <>
            <View ref={ref} className={`navigationPage ${props.size}`} style={{ backgroundColor: props.backgroundColor }}>
                {/* // 手机状态栏的高度 */}
                <View style={{height: getGlobalData('statusBarHeight') + 'px', width: '100%'}}></View>
                {/* // 导航高度 */}
                <View style={{height: getGlobalData('navBarHeight') + 'px', width: '100%'}} className="head">
                    <View 
                        className="navigationIcon"
                    >
                        <Text 
                            className='change_area'
                            onClick={() => {
                                Taro.hideTabBar()
                                setIsOpened(true)
                            }}
                        >{area}</Text>
                        <AtActionSheet isOpened={isOpened} cancelText='取消' onCancel={ handleCancel } onClose={ handleClose }>
                            {areaList.map((item) => {
                                return <AtActionSheetItem key={item.id} onClick={ () => {handleClick(item.cityName, item.id)} }>
                                    {item.cityName}
                                </AtActionSheetItem>
                            })}
                            {/* <AtActionSheetItem onClick={ () => {handleClick('佛山', '1128592555575894016')} }>
                                佛山
                            </AtActionSheetItem>
                            <AtActionSheetItem onClick={ () => {handleClick('石家庄', '1426060676178128896')} }>
                                石家庄
                            </AtActionSheetItem> */}
                        </AtActionSheet>
                    </View>
                    <View className="navigationTitle">
                        <CoverImage className='logoimg' src='https://img.58cdn.com.cn/dist/jxt/images/jxtschool/58_mini_jiapei.png' />
                        <Text className="ml">{props.title}</Text>
                    </View>
                </View>
            </View>
            {/* 空白view元素占用高度 */}
            {/* <View style={{height: props.height + 'px'}}></View> */}
        </>
	)
})
Navbar.defaultProps = {
    title:'驾培集团',
    // height:20,
    paddingTop:0,
    backgroundColor:'#fff',
    size:'default',
    onchange: (area) => {
        console.log(area)
    }
}

// export default forwardRef(Navbar)
export default Navbar