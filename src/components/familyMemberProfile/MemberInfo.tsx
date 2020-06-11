import React from "react"
import { Tabs, Descriptions } from "antd"
const { TabPane } = Tabs
import { MemberDetail } from "../../types/FamilyTree"

type Props = {
  members: MemberDetail[]
}

const MemberInfo = ({ members }: Props) => {
  console.log("members", members)
  return (
    <div>
      <Tabs defaultActiveKey="1" tabPosition={"left"}>
        {members.map(member => (
          <TabPane tab={member.chineseName} key={member.id}>
            <Descriptions column={1} title="个人信息">
              <Descriptions.Item label="(Chinese Name)">
                {member.chineseName}
              </Descriptions.Item>
              <Descriptions.Item label="(English Name)">
                {member.englishName}
              </Descriptions.Item>
              <Descriptions.Item label="(Country of Residence)">
                {member.countryOfResidence}
              </Descriptions.Item>
              <Descriptions.Item label="(Birth Date)">
                {member.birthDate}
              </Descriptions.Item>
              <Descriptions.Item label="(Cell Phone)">
                {member.cellPhone || ""}
              </Descriptions.Item>
              <Descriptions.Item label="(Schools Attended)">
                {member?.schoolsAttended?.map(school => (
                  <span>{school}</span>
                ))}
              </Descriptions.Item>
            </Descriptions>
          </TabPane>
        ))}
      </Tabs>
    </div>
  )
}

export default MemberInfo
