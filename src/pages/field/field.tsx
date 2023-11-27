import { View } from '@tarojs/components'
// import { AtButton } from 'taro-ui'
import Taro, { usePullDownRefresh, useReachBottom } from '@tarojs/taro'
import './field.scss'
import { get as getGlobalData } from '../../global_data'
import SingleField from '../index/components/coach-field/single-field'
import { useState, useEffect} from 'react'
import { getFieldListApi} from "@/api/common"
// 如果页面内容不足以滚动到底部，则不会触发该事件

export default function Field() {
    const schoolId = getGlobalData('schoolId')
    const [dataList, setDataList] = useState([])
    const [pageIndex, setPageIndex] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const fetchData = async (pageNum?) => {
        Taro.showLoading({
            title: '加载中',
        })
        const res = await getFieldListApi('POST', {isHome: false, schoolId, pageSize: 12, pageIndex: pageNum || pageIndex})
        Taro.hideLoading()
        console.log(res, '-----------')
        if (pageNum === 1) {
          setDataList(res?.data?.list || [])
        } else {
          setDataList(dataList.concat(res?.data?.list || []))
        }
        setTotalPages(res?.data?.pagination.totalPages)
        // setTotalPages(5)
        Taro.stopPullDownRefresh()
      }
	
    useEffect(() => {
        fetchData()
    }, [pageIndex])
    usePullDownRefresh(() => {
        fetchData(1)
        console.log('下拉刷新')
    })

    useReachBottom(() => {
	  	console.log('上拉加载更多')
	    if (pageIndex >= totalPages) return
        setPageIndex(pageIndex + 1)
    })

    return (
      <View id='page-field'>
		{dataList.map((item: any) => {
			return <SingleField key={item.id} item={item} isNotIndexPage/>
		})}
        {pageIndex >= totalPages && <View className="not-more-data">暂无更多数据~</View>}
      </View>
    )
}
