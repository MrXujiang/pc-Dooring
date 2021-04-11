import React, { memo, useMemo } from 'react';
import { Avatar } from 'antd';

interface IProp {
    collapsed: boolean;
    list?: Array<any>
}

const listTpl = [
    'Walker',
    'Rope',
    'Jerryli',
    '道霖',
    '秋涛',
    '王冰',
    '萧枫',
    '瑞云',
    'Art',
    '刘小灰',
    'Louis'
]

const generateRandomColor = () => {
    return '#'+('00000'+ (Math.random()*0x1000000<<0).toString(16)).substr(-6);
}

const AvatorGrounp = (props:IProp) => {
    const { collapsed } = props;

    const userList = useMemo(() => {
        return listTpl.map(item => ({ n: item, color: generateRandomColor() }))
    }, [])

    return <Avatar.Group style={{padding: '12px 0 16px'}}>
            { collapsed && <Avatar style={{ backgroundColor: '#f56a00' }}>199+</Avatar>}
            {
                userList.map((item, i) => {
                    return <Avatar style={{ backgroundColor: item.color }} key={i}>{ item.n }</Avatar>
                })
            }
            <Avatar style={{ backgroundColor: '#f56a00' }}>199+</Avatar>
            <span style={{paddingTop: '6px', display: 'inline-block', marginLeft: '3px'}}>使用</span>
        </Avatar.Group>
}

export default memo(AvatorGrounp)