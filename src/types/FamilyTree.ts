export type FamilyMember = {
  title: string
  key: string
  children?: FamilyMember[]
  image?: string
  familyPhoto?: string
  members: string[]
}

export type MemberDetail = {
  id: string
  chineseName: string
  englishName?: string
  countryOfResidence?: string
  birthDate?: string
  cellPhone?: string
  schoolsAttended?: string[]
}
