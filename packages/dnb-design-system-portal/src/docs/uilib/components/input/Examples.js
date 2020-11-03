Wrapper
/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  display: block;
  width: 100%;

  .dnb-input input {
    min-width: 10rem;
  }
  .dnb-form-label + .dnb-input {
    margin-top: 0;
  }
`

export const InputDefault = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-placeholder">
      {
        /* @jsx */ `
<Input
  label="Label:"
  placeholder="Placeholder text"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputSearch = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-search">
      {
        /* @jsx */ `
<Input
  label="Search:"
  type="search"
  submit_button_title="Search"
  placeholder="Search text placeholder"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
  on_submit={({ value }) => {
    console.log('Submit:', value)
  }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputMedium = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-medium">
      {
        /* @jsx */ `
<Input
  size="medium"
  type="search"
  stretch="true"
  value="Medium search value"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputWithIcon = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-icon">
      {
        /* @jsx */ `
<Input
  label="Input with icon:"
  placeholder="Input"
  label_direction="vertical"
  icon="check"
  bottom
/>
<Input
  label="Input with icon:"
  label_sr_only
  placeholder="Input with a placeholder asd dsd  asd asd"
  icon_position="right"
  icon="check"
  align="right"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputDisabled = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-disabled">
      {
        /* @jsx */ `
<Input
  disabled
  label="Disabled input:"
  placeholder="Disabled Input with a placeholder"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputFailureStatus = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<Input
  label="Show status:"
  status="error"
  value="Shows status with border only"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputFormStatus = () => (
  <Wrapper>
    <ComponentBox data-visual-test="input-error">
      {
        /* @jsx */ `
<Input
  label="With FormStatus:"
  status="You have to fill in this field"
  value="Input value with error"
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputSuffix = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<Input
  label={<Space element="span" className="dnb-h--large">Fødselsnummer</Space>}
  label_direction="vertical"
  autocomplete="on"
  placeholder="Placeholder text"
  suffix={<Modal title="Info" trigger_size="large">Some content</Modal>}
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputStretched = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<FormRow
  label="Long label labwl Adipiscing mauris dis proin nec:"
  indent="true"
  indent_offset="large"
  wrap
>
  <Input value="I stretch ..." stretch />
</FormRow>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputNumbers = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<Input
  label="My Status:"
  autocomplete="on"
  placeholder="Placeholder text"
  status="Numbers are ligned by using Proportional Lining"
  status_state="info"
  status_animation="fade-in"
  value="This is the value 1234567890"
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
/>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const InputSubmit = () => (
  <Wrapper>
    <ComponentBox>
      {
        /* @jsx */ `
<FormSet
  prevent_submit={true}
  on_submit={(event) => {
    console.log('FormRow.on_submit', event)
  }}
>
  <FormRow>
    <Input
      type="search"
      label="Label:"
      value="Input ..."
      selectall="true"
      on_submit={event => {
        console.log('Input.on_submit', event)
      }}
      on_change={({ value }) => {
        console.log('on_change:', value)
      }}
      onChange={({ value }) => {
        console.log('onChange:', value)
      }}
      right="small"
      bottom="x-small"
    />
    <Button text="Submit" type="submit" />
  </FormRow>
</FormSet>
`
      }
    </ComponentBox>
  </Wrapper>
)

export const ScreenshotTests = () => {
  if (!global.IS_TEST) {
    return <></>
  }
  return (
    <Wrapper>
      <ComponentBox data-visual-test="input-align">
        {
          /* @jsx */ `
<FormRow label="Left aligned" vertical>
  <Input value="Plain" />
  <Input value="Search" type="search" />
  <Input value="Search" size="medium" type="search" />
  <Input value="Search" size="large" type="search" />
  <Input
    value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
    icon="calendar"
  />
  <Input
    placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
    icon_position="right"
    icon="calendar"
  />
  <Input
    size="medium"
    value="Value"
    icon="calendar"
  />
  <Input
    size="medium"
    placeholder="Placeholder"
    icon_position="right"
    icon="calendar"
  />
  <Input
    size="large"
    value="Value"
    icon="calendar"
  />
  <Input
    size="large"
    placeholder="Placeholder"
    icon_position="right"
    icon="calendar"
  />
</FormRow>
<FormRow label="Right aligned" vertical top>
  <Input value="Plain" align="right" />
  <Input value="Search" type="search" align="right" />
  <Input value="Search" size="medium" type="search" align="right" />
  <Input value="Search" size="large" type="search" align="right" />
  <Input
    value="Value Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
    icon="calendar"
    align="right"
  />
  <Input
    placeholder="Placeholder Eu pretium sit magnis suscipit cursus dis proin rutrum elementum"
    icon_position="right"
    icon="calendar"
    align="right"
  />
  <Input
    size="medium"
    value="Value"
    icon="calendar"
    align="right"
  />
  <Input
    size="medium"
    placeholder="Placeholder"
    icon_position="right"
    icon="calendar"
    align="right"
  />
  <Input
    size="large"
    value="Value"
    icon="calendar"
    align="right"
  />
  <Input
    size="large"
    placeholder="Placeholder"
    icon_position="right"
    icon="calendar"
    align="right"
  />
</FormRow>
`
        }
      </ComponentBox>
    </Wrapper>
  )
}
