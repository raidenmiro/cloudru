import { StepForm } from '@/shared/layouts/stepform'
import { Stepper } from '@/shared/lib/stepper'

import { AboutMe } from './step/aboutme'
import { Advantages } from './step/advantages'
import { Bio } from './step/bio'

export const SignUpPage = () => {
  return (
    <StepForm>
      <Stepper.Step label="1" description="Biography">
        <Bio />
      </Stepper.Step>
      <Stepper.Step label="2" description="Advantages">
        <Advantages />
      </Stepper.Step>
      <Stepper.Step label="3" description="About me">
        <AboutMe />
      </Stepper.Step>
    </StepForm>
  )
}
