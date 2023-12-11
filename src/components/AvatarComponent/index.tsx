import React, { useState } from 'react';
import { ImagePickerResponse, launchImageLibrary } from 'react-native-image-picker';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import ProfileDefault from '../../assets/profile.png';
import { AddImageButton, AvatarContainer, AvatarImage, Container } from './styles';

export function AvatarComponent() {
  const [avatarImage, setAvatarImage] = useState<string | undefined>(undefined);

  const handleAddImage = () => {
    const options = {
      mediaType: 'photo' as const,
      storageOptions: {
        path: 'image'
      }
    };
    launchImageLibrary(options, (response: ImagePickerResponse) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.errorMessage) {
        console.log('ImagePicker Error: ', response.errorMessage);
      } else if (response.assets && response.assets.length > 0) {
        setAvatarImage(response.assets[0].uri);
      }
    });
  };

  return (
    <Container>
      <AvatarContainer>
        {avatarImage ? (
          <AvatarImage
            source={{
              uri: avatarImage
            }}
            resizeMode="cover"
          />
        ) : (
          <AvatarImage source={ProfileDefault} resizeMode="cover" />
        )}
      </AvatarContainer>
      <AddImageButton onPress={() => handleAddImage()}>
        <MaterialIcons name="add-a-photo" size={25} color="white" />
      </AddImageButton>
    </Container>
  );
}
