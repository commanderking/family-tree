import React from "react"
import _ from "lodash"

import { FamilyMember } from "../../types/FamilyTree"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"
import memberDetails from "../../../content/familyMemberDetails.json"
import MemberInfo from "./MemberInfo"

type Props = { familyMember: FamilyMember | null }

const Profile = ({ familyMember }: Props) => {
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

  const correctNode =
    familyMember && familyMember.image
      ? data.allImageSharp.edges.find(element => {
          // Match string after final slash
          return (
            element.node.fluid.src.split("/").pop() ===
            encodeURI(familyMember.image)
          )
        })
      : null

  let treeBranchImage = null
  if (correctNode) {
    treeBranchImage = correctNode.node.fluid
  }

  let familyPhotoImage
  const familyPhotoNode = familyMember?.familyPhoto
    ? data.allImageSharp.edges.find(element => {
        // Match string after final slash
        return (
          element.node.fluid.src.split("/").pop() ===
          encodeURI(familyMember.familyPhoto)
        )
      })
    : null

  if (familyPhotoNode) {
    familyPhotoImage = familyPhotoNode.node.fluid
  }

  // TODO: Memoize this so hash not calculated on every re-render.
  const memberDetailsHash = _.keyBy(memberDetails, "id")

  const members =
    familyMember?.members
      ?.map(member => memberDetailsHash[member])
      .filter(Boolean) || []

  return Boolean(familyMember) ? (
    <div style={{ width: "600px" }}>
      <h3>{familyMember.title}</h3>
      {treeBranchImage && <Img fluid={treeBranchImage} />}
      {familyPhotoImage && <Img fluid={familyPhotoImage} />}
      <MemberInfo members={members} />
    </div>
  ) : (
    <div>Select a Member to see more info</div>
  )
}

export default Profile
