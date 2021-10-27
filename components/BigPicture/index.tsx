/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState } from 'react';
import { IObjectArt } from '../../interfaces/ObjectArt';
import { Container, ImageContainer, Informations } from './styles';

const BigPicture: React.FC<{ objectArt: IObjectArt; onPause: () => void; onResume: () => void }> = ({
  objectArt,
  onResume,
  onPause
}) => {
  const [openInfo, setOpenInfo] = useState(false);

  const handleClick = (): void => {
    setOpenInfo((oldState) => {
      const result = !oldState;

      if (result) onPause();
      else onResume();

      return result;
    });
  };

  return (
    <Container onClick={handleClick}>
      {objectArt && (
        <>
          <ImageContainer>
            <img draggable="false" src={objectArt.primaryImage} />
          </ImageContainer>

          <Informations id="info" open={openInfo}>
            <h1>{objectArt.objectName}</h1>
            <h4>{objectArt.creditLine}</h4>
          </Informations>
        </>
      )}
    </Container>
  );
};

export default BigPicture;
