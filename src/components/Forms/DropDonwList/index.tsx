import React, {useState} from 'react';
import {DropdownList, TitleInput} from './styles';
import { Text } from 'react-native';

interface DropdownProps {
  data: [{label: string; value: string}];
  placeholder: string;
  setValue: (item: string) => void;
  value: string;
}

export const DropdownComponent = ({
  data,
  placeholder,
  setValue,
  value,
}: DropdownProps) => {
  // const [value, setValue] = useState<string>()
  // const ref = useRef<IDropdownRef>(null)
  return (
    <>
      <TitleInput>Gênero</TitleInput>
      <DropdownList<any>
        // ref={ref}
        // search
        // searchPlaceholder="Search..."
        // onChangeText={() => {}} // Keep search keyword
        data={data}
        labelField="label"
        valueField="value"
        placeholder={placeholder}
        value={value}
        onChange={(item: any) => {
          setValue(item.value);
        }}
        // onChangeValue={() => {value}}
      />
    </>
  );
};
