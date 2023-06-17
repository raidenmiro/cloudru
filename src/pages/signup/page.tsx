import { StepForm } from '@/shared/layouts/stepform'
import { Stepper } from '@/shared/lib/stepper'

import { AboutMe } from './step/aboutme'
import { Advantages } from './step/advantages'
import { Bio } from './step/bio'

export const SignUpPage = () => {
  return (
    <StepForm>
      <Stepper.Step description="Biography" label="1">
        <Bio />
      </Stepper.Step>
      <Stepper.Step description="Advantages" label="2">
        <Advantages />
      </Stepper.Step>
      <Stepper.Step description="About me" label="3">
        <AboutMe />
      </Stepper.Step>
    </StepForm>
  )
}
