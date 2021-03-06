/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const Style = styled.div`
  span.dnb-number {
    display: block;
  }
`

class Example extends React.PureComponent {
  render() {
    return (
      <Style>
        <ComponentBox
          title="Default numbers"
          data-dnb-test="number-default"
        >
          {
            /* @jsx */ `
<P>
  <Number value="12345" />
  <Number>-12345678.9</Number>
  <Number prefix={<b>prefix</b>} suffix="suffix">-12345678.9</Number>
  <Number options={{ maximumFractionDigits: 1 }}>-1234.54321</Number>
</P>
          `
          }
        </ComponentBox>
        <ComponentBox title="Currency" data-dnb-test="number-currency">
          {
            /* @jsx */ `
<P>
  <Number currency>12345</Number>
  <Number currency currency_position="after" value={-12345678.9} />
  <Number currency value={-12345678.95} decimals={0} />
  <Number currency value={-12345678.9} currency_display="code" />
</P>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Phone number"
          caption="By using selectall={false} you disable the auto select all feature"
          data-dnb-test="number-phone"
        >
          {
            /* @jsx */ `
<P>
  <Number value="99999999" phone />
  <Number value="4799999999" phone />
  <Number value="++4799999999" phone />
  <Number value="+4780022222" phone link="sms" />
  <Number value="+47116000" phone selectall="false" />
  <Number value="+4702000" phone />
</P>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Bank Account number (Kontonummer)"
          data-dnb-test="number-ban"
        >
          {
            /* @jsx */ `
<P>
  <Number value="20001234567" ban />
</P>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="National Identification number (Fødselsnummer)"
          data-dnb-test="number-nin"
        >
          {
            /* @jsx */ `
<P>
  <Number value="18089212345" nin />
</P>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Organization number (Organisasjonsnummer)"
          data-dnb-test="number-org"
        >
          {
            /* @jsx */ `
<P>
  <Number value="123456789" org suffix="MVA" />
</P>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Numbers and currencies in different locales"
          data-dnb-test="number-locales"
        >
          {
            /* @jsx */ `
<H3>Numbers</H3>
<P>
  <Number locale="nb-NO" value="-12345678.9" />
  <Number locale="en-US" value="-12345678.9" />
  <Number locale="de-DE" value="-12345678.9" />
  <Number locale="de-CH" value="-12345678.9" />
  <Number locale="fr-CH" value="-12345678.9" />
</P>

<H3>Currencies</H3>
<P>
  <Number locale="nb-NO" value="-12345.6" currency />
  <Number locale="en-US" value="-12345.6" currency />
  <Number locale="de-DE" value="-12345.6" currency />
  <Number locale="de-CH" value="-12345.6" currency />
  <Number locale="fr-CH" value="-12345.6" currency />
</P>

<br/>
          `
          }
        </ComponentBox>
      </Style>
    )
  }
}

export default Example
