import React from "react"
import { FamilyMember } from "../../types/FamilyTree"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

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

  let image = null
  if (correctNode) {
    image = correctNode.node.fluid
  }

  return Boolean(familyMember) ? (
    <div style={{ width: "500px" }}>
      <h3>{familyMember.title}</h3>
      {image && <Img fluid={image} />}
    </div>
  ) : (
    <div>Select a Member to see more info</div>
  )
}

export default Profile
