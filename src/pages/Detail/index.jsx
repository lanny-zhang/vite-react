import { LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons'
import React from 'react'
import { Avatar, List, Space } from 'antd'
import PageLayout from '@@/src/components/PageLayout'

const data = Array.from({
  length: 23,
}).map((_, i) => ({
  href: 'https://ant.design',
  title: `ant design part ${i}`,
  avatar: `https://xsgames.co/randomusers/avatar.php?g=pixel&key=${i}`,
  description:
    'Ant Design, a design language for background applications, is refined by Ant UED Team.',
  content:
    'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
}))
const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
)
const Detail = () => {
  return (
    <PageLayout>
      <List
        itemLayout='vertical'
        size='large'
        pagination={{
          onChange: (page) => {
            console.log(page)
          },
          pageSize: 3,
        }}
        dataSource={data}
        renderItem={(item) => (
          <List.Item
            key={item.title}
            actions={[
              <IconText icon={StarOutlined} text='156' key='list-vertical-star-o' />,
              <IconText icon={LikeOutlined} text='156' key='list-vertical-like-o' />,
              <IconText icon={MessageOutlined} text='2' key='list-vertical-message' />,
            ]}
            extra={(
              <img
                width={272}
                alt='logo'
                src='https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png'
              />
            )}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.avatar} />}
              title={<a href={item.href}>{item.title}</a>}
              description={item.description}
            />
            {item.content}
          </List.Item>
        )}
      />
    </PageLayout>
  )
}
export default Detail
