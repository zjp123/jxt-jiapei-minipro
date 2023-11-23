import React, { useState } from 'react'
import { View } from '@tarojs/components'
import { AtTabs, AtTabsPane } from 'taro-ui'
import Newlist from './newlist'
import './news.scss'

const Index: React.FC = () => {
    const [current, setCurrent] = useState(0)

    const changeCurrent = (index) => {
        setCurrent(index)
    }

    return (
        <View className='news-werrper'>
            <AtTabs
                animated={false}
                current={current}
                tabList={[
                    { title: '驾校新闻' },
                    { title: '驾校公告' },
                    { title: '常见问题' }
                ]}
                onClick={changeCurrent}>
                <AtTabsPane current={current} index={0} >
                    <Newlist current={current} />
                </AtTabsPane>
                <AtTabsPane current={current} index={1}>
                   <Newlist current={current} />
                </AtTabsPane>
                <AtTabsPane current={current} index={2}>
                    <Newlist current={current} />
                </AtTabsPane>
            </AtTabs>
        </View>
    )
}

export default Index
