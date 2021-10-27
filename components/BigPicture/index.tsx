/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { IObjectArt } from '../../interfaces/ObjectArt';
import { Container, ImageContainer, Informations } from './styles';

const BigPicture: React.FC<{ objectArt: IObjectArt }> = ({ objectArt }) => {
  const [openInfo, setOpenInfo] = useState(false);

  const handleClick = (): void => setOpenInfo((oldState) => !oldState);

  return (
    <Container onClick={handleClick}>
      <ImageContainer>
        <img draggable="false" src={objectArt.primaryImage} />
      </ImageContainer>

      <Informations open={openInfo}>
        <h1>{objectArt.objectName}</h1>
        <h4>{objectArt.creditLine}</h4>
      </Informations>
    </Container>
  );
};

export default BigPicture;
