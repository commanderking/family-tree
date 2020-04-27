import React from "react"
import { FamilyMember } from "../../types/FamilyTree"

type Props = { familyMember: FamilyMember | null }

const Profile = ({ familyMember }: Props) => {
  return Boolean(familyMember) ? (
    <div>
      <h3>{familyMember.title}</h3>
    </div>
  ) : (
    <div>Select a Member to see more info</div>
  )
}

export default Profile
