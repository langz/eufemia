import { useState } from 'react'
import { Card, Flex, P } from '@dnb/eufemia'
import { Provider } from '@dnb/eufemia/shared'
import { Field, Form, Iterate, Tools, Wizard } from '@dnb/eufemia/extensions/forms'

type Item = { name?: string }

function Submitted({ data }: { data: unknown }) {
  return data ? (
    <output className="result">Submitted: {JSON.stringify(data)}</output>
  ) : null
}

function EditableItems() {
  return (
    <>
      <Iterate.Array path="/items">
        <Iterate.ViewContainer title="Item">
          <Iterate.ItemNo>Item {'{itemNo}'}</Iterate.ItemNo>
        </Iterate.ViewContainer>
        <Iterate.EditContainer title="Item">
          <Field.String label="Name" itemPath="/name" required />
          <Iterate.RemoveButton />
        </Iterate.EditContainer>
      </Iterate.Array>
      <Iterate.PushButton path="/items" pushValue={{}} text="Add item" />
    </>
  )
}

function InlineItems() {
  return (
    <Iterate.Array path="/items">
      <Flex.Horizontal align="flex-end">
        <Field.String label="Name" itemPath="/name" required />
        <Iterate.RemoveButton />
      </Flex.Horizontal>
    </Iterate.Array>
  )
}

function Scenario1() {
  const [submitted, setSubmitted] = useState(null)
  return (
    <Card stack>
      <Form.MainHeading>1. Edit containers and submit (reported case)</Form.MainHeading>
      <P>
        Add item A and fill it in. Add item B, leave it empty and click
        “Done”. Add item C, fill it in and click “Done”. Remove B, then
        submit. Expected: the form submits.
      </P>
      <Form.Handler id="s1" onSubmit={(data) => setSubmitted(data)}>
        <Flex.Stack>
          <EditableItems />
          <Form.SubmitButton />
          <Submitted data={submitted} />
          <Tools.Errors label="Field errors kept by the form" />
        </Flex.Stack>
      </Form.Handler>
    </Card>
  )
}

function Scenario2() {
  return (
    <Card stack>
      <Form.MainHeading>2. Same flow inside a Wizard</Form.MainHeading>
      <P>
        Follow the steps from scenario 1, then click “Next”. Expected: step 2
        opens.
      </P>
      <Form.Handler id="s2">
        <Wizard.Container>
          <Wizard.Step title="Items">
            <Flex.Stack>
              <EditableItems />
              <Wizard.Buttons />
              <Tools.Errors label="Field errors kept by the form" />
            </Flex.Stack>
          </Wizard.Step>
          <Wizard.Step title="Summary">
            <output className="result">Step 2 reached</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    </Card>
  )
}

function Scenario3() {
  const [submitted, setSubmitted] = useState(null)
  return (
    <Card stack>
      <Form.MainHeading>3. An invalid item moves up</Form.MainHeading>
      <P>
        Click submit to show the error on item 2. Remove item 1. Expected:
        the empty item (now item 1) still shows its error and still blocks
        submit. Fill it in and submit. Expected: the form submits.
      </P>
      <Form.Handler
        id="s3"
        defaultData={{ items: [{ name: 'A' }, {}, { name: 'C' }] as Item[] }}
        onSubmit={(data) => setSubmitted(data)}
      >
        <Flex.Stack>
          <InlineItems />
          <Form.SubmitButton />
          <Submitted data={submitted} />
          <Tools.Errors label="Field errors kept by the form" />
        </Flex.Stack>
      </Form.Handler>
    </Card>
  )
}

function RemoveViaData() {
  const { update } = Form.useData<{ items: Item[] }>('s4')
  return (
    <button
      type="button"
      className="dnb-button dnb-button--secondary"
      onClick={() =>
        update('/items', (items: Item[]) =>
          items.filter((_, index) => index !== 1)
        )
      }
    >
      <span className="dnb-button__text">Remove item 2 via data update</span>
    </button>
  )
}

function Scenario4() {
  const [submitted, setSubmitted] = useState(null)
  return (
    <Card stack>
      <Form.MainHeading>4. Item removed by a data update</Form.MainHeading>
      <P>
        Click submit to show the error on item 2. Remove item 2 with the
        button below (not the item's own remove button), then submit.
        Expected: the form submits.
      </P>
      <Form.Handler
        id="s4"
        defaultData={{ items: [{ name: 'A' }, {}, { name: 'C' }] as Item[] }}
        onSubmit={(data) => setSubmitted(data)}
      >
        <Flex.Stack>
          <InlineItems />
          <RemoveViaData />
          <Form.SubmitButton />
          <Submitted data={submitted} />
          <Tools.Errors label="Field errors kept by the form" />
        </Flex.Stack>
      </Form.Handler>
    </Card>
  )
}

async function checkNameIsFree(value: string) {
  await new Promise((resolve) => setTimeout(resolve, 300))
  if (value?.toLowerCase() === 'admin') {
    return new Error('This name is taken')
  }
}

function Scenario5() {
  const [submitted, setSubmitted] = useState(null)
  return (
    <Card stack>
      <Form.MainHeading>5. Async validator error moves up</Form.MainHeading>
      <P>
        Type “admin” in item 2 and leave the field. Remove item 1. Expected:
        “admin” (now item 1) still blocks submit and shows its error. Change
        it to another name and submit. Expected: the form submits.
      </P>
      <Form.Handler
        id="s5"
        defaultData={{ items: [{ name: 'Alice' }, {}, { name: 'Carol' }] as Item[] }}
        onSubmit={(data) => setSubmitted(data)}
      >
        <Flex.Stack>
          <Iterate.Array path="/items">
            <Flex.Horizontal align="flex-end">
              <Field.String
                label="Name"
                itemPath="/name"
                required
                onBlurValidator={checkNameIsFree}
              />
              <Iterate.RemoveButton />
            </Flex.Horizontal>
          </Iterate.Array>
          <Form.SubmitButton />
          <Submitted data={submitted} />
          <Tools.Errors label="Field errors kept by the form" />
        </Flex.Stack>
      </Form.Handler>
    </Card>
  )
}

export default function App() {
  return (
    <Provider locale="en-GB">
      <Flex.Stack>
        <Scenario1 />
        <Scenario2 />
        <Scenario3 />
        <Scenario4 />
        <Scenario5 />
      </Flex.Stack>
    </Provider>
  )
}
