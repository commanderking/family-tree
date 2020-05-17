import React from "react"
import { FamilyMember } from "../../types/FamilyTree"
import Img from "gatsby-image"
import { useStaticQuery, graphql } from "gatsby"

type Props = { familyMember: FamilyMember | null }

const Profile = ({ familyMember }: Props) => {
  // This doesn't work We'd want this to be dynamic with familyMemebr.image, but with the way the data gets
  // loaded on build, this is impossible: https://github.com/gatsbyjs/gatsby/issues/2293

  // const data = useStaticQuery(graphql`
  //   query {
  //     file(relativePath: { eq: familyMember.image }) {
  //       childImageSharp {
  //         # Specify a fixed image and fragment.
  //         # The default width is 400 pixels
  //         fixed(width: 600, height: 600) {
  //           ...GatsbyImageSharpFixed
  //         }
  //       }
  //     }
  //   }
  // `)

  const data = useStaticQuery(graphql`
    query {
      allImageSharp {
        edges {
          node {
            fixed(width: 600, height: 600) {
              ...GatsbyImageSharpFixed
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
            element.node.fixed.src.split("/").pop() ===
            encodeURI(familyMember.image)
          )
        })
      : null

  let image = null
  if (correctNode) {
    image = correctNode.node.fixed
  }

  return Boolean(familyMember) ? (
    <div>
      <h3>{familyMember.title}</h3>
      {image && <Img fixed={image} />}
    </div>
  ) : (
    <div>Select a Member to see more info</div>
  )
}

export default Profile
