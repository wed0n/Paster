import {
  Body1Stronger,
  Button,
  FluentProvider,
  Input,
  InputOnChangeData,
  Label,
  Spinner,
  webLightTheme,
} from '@fluentui/react-components'
import { useRef, useState } from 'react'
export default function App() {
  const [stand, setStand] = useState('50')
  const lastStand = useRef('50')
  const [float, setFloat] = useState('20')
  const lastFloat = useRef('20')
  const [counter, setCounter] = useState(-1)
  const [buttonDisabled, setButtonDisabled] = useState(false)

  const onChange = (
    set: React.Dispatch<React.SetStateAction<string>>,
    _event: React.ChangeEvent<HTMLInputElement>,
    data: InputOnChangeData
  ) => {
    set(data.value)
  }
  const onBlur = (
    current: string,
    set: React.Dispatch<React.SetStateAction<string>>,
    last: React.MutableRefObject<string>
  ) => {
    if (/^[1-9]\d{0,5}$/.test(current)) {
      last.current = current
    } else {
      set(last.current)
    }
  }
  const onClick = () => {
    console.log(lastStand.current, lastFloat.current)
    setButtonDisabled(true)
    setCounter(3)
    const interval = setInterval(() => {
      setCounter((counter) => {
        if (counter == 0) {
          clearInterval(interval)
          setButtonDisabled(false)
        }
        return counter - 1
      })
    }, 1000)
  }
  return (
    <FluentProvider
      style={{
        width: '100%',
        height: '100%',
      }}
      theme={webLightTheme}>
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          padding: 15,
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
        <Body1Stronger>
          单击按钮后, 将在3S后开始, 延迟范围为[基本延迟, 基本延迟+浮动值]
        </Body1Stronger>
        <div
          style={{
            height: '36%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'flex-end',
          }}>
          <div>
            <Label weight="semibold">基本延迟:</Label>
            <Input
              value={stand}
              size="small"
              style={{ marginLeft: 8, width: 60 }}
              onChange={onChange.bind(null, setStand)}
              onBlur={onBlur.bind(null, stand, setStand, lastStand)}
            />
          </div>
          <div>
            <Label weight="semibold">浮动值:</Label>
            <Input
              value={float}
              size="small"
              style={{ marginLeft: 8, width: 60 }}
              onChange={onChange.bind(null, setFloat)}
              onBlur={onBlur.bind(null, float, setFloat, lastFloat)}
            />
          </div>
        </div>
        <Button
          appearance="primary"
          disabled={buttonDisabled}
          onClick={onClick}>
          {counter == -1 ? (
            '粘贴'
          ) : counter == 0 ? (
            <Spinner size="tiny" />
          ) : (
            counter
          )}
        </Button>
      </div>
    </FluentProvider>
  )
}
