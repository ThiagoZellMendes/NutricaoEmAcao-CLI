// import React from 'react';

// import { PatientDetailsProps } from './props';
// import { Container, Icon, TextContent } from './styles';

// export function PatientCardDetailComponet({ iconName, title, iconSize }: PatientDetailsProps) {
//   return (
//     <Container>
//       <Icon name={iconName} size={iconSize} color={iconSize} />
//       <TextContent>{title}</TextContent>
//       <Icon name={iconName} size={iconSize} color={iconSize} />
//     </Container>
//   );
// }

import React, { useState } from 'react';
import { View } from 'react-native';
import { PatientDetailsProps } from './props';
import { Container, ContainerIconRight, Icon, IconRight, TextCard, TextInputEditing, TitleCard } from './styles'; // Importe os ícones necessários

export function PatientCardDetailComponent({ iconName, iconSize, titleCard, textCard }: PatientDetailsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(textCard);

  const handleEditIconPress = () => {
    if (isEditing) {
      setIsEditing(false);
    } else {
      setIsEditing(true);
    }
  };

  const handleTitleChange = (newTitle: string) => {
    setEditedTitle(newTitle);
  };

  const handleConfirmEdit = () => {
    setEditedTitle(editedTitle);
    setIsEditing(false);
  };

  const handleBlur = () => {
    if (isEditing) {
      handleConfirmEdit();
      setIsEditing(false);
    }
  };

  return (
    <Container>
      <Icon name={iconName} size={iconSize} color={iconSize} />
      <View style={{ flex: 1, justifyContent: 'center' }}>
        <TitleCard>{titleCard}</TitleCard>
        {isEditing ? (
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <TextInputEditing value={editedTitle} onChangeText={handleTitleChange} onBlur={handleBlur} />
            <ContainerIconRight onPress={handleConfirmEdit}>
              <IconRight name="x" size={20} color={'#65717B'} />
            </ContainerIconRight>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', alignItems: 'center' }}>
            <TextCard>{editedTitle}</TextCard>
            <ContainerIconRight onPress={handleEditIconPress}>
              <IconRight name="edit" size={20} color={'#65717B'} />
            </ContainerIconRight>
          </View>
        )}
      </View>
    </Container>
  );
}
