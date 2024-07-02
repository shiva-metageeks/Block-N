import { blog } from './schemas/blog/blog'
import { caseStudy } from './schemas/case-study/case-study'
import { serviceHero } from './schemas/service/hero'
import { serviceProcess } from './schemas/service/process'
import { serviceTechStack } from './schemas/service/tech'

export const schema = {
  types: [blog, caseStudy, serviceHero, serviceProcess, serviceTechStack],
}
