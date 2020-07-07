import React from "react"
import { Tabs, Descriptions } from "antd"
const { TabPane } = Tabs
import { MemberDetail } from "../../types/FamilyTree"
import { useStaticQuery, graphql } from "gatsby"
import Img from "gatsby-image"

type Props = {
  members: MemberDetail[]
}

const MemberInfo = ({ members }: Props) => {
  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fluid(maxWidth: 500) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  `)

  const getPortrait = member => {
    const correctNode =
      member && member.photo
        ? data.allImageSharp.edges.find(element => {
            // Match string after final slash
            return (
              element.node.fluid.src.split("/").pop() ===
              encodeURI(member.photo)
            )
          })
        : null

    let photo = null
    if (correctNode) {
      photo = correctNode.node.fluid
    }
    return photo
  }
  console.log("members", members)

  return (
    <div>
      <Tabs
        defaultActiveKey="1"
        tabPosition={"left"}
        style={{ padding: "15px" }}
      >
        {members.map(member => {
          const photo = getPortrait(member)
          console.log("photo", photo)
          return (
            <TabPane tab={member.chineseName} key={member.id}>
              <h4>个人信息</h4>
              <div style={{ width: 200 }}>{photo && <Img fluid={photo} />}</div>
              <Descriptions column={1}>
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
          )
        })}
      </Tabs>
    </div>
  )
}

export default MemberInfo
