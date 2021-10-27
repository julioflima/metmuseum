/* eslint-disable no-await-in-loop */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { memo, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import BigPicture from '../components/BigPicture';
import { IObjectArt } from '../interfaces/ObjectArt';
import ArtProvider from '../providers/ArtService';

const Home: React.FC<{
  indexes: number[];
  initialBlackList: number[];
  initialObjectArtOne: IObjectArt;
  initialObjectArtAux: IObjectArt;
}> = ({ indexes, initialBlackList, initialObjectArtOne, initialObjectArtAux }) => {
  const baseSeconds = 10;
  const initialTimeMiliseconds = 1000 * baseSeconds;
  const intervaMiliseconds = 1000 * baseSeconds;

  const [timeLeft, { start, pause, resume }] = useCountDown(initialTimeMiliseconds, intervaMiliseconds);

  const [blacklist, setBlacklist] = React.useState<number[]>(initialBlackList);

  // Added system of cache image.
  const [objectsArts, setObjectsArts] = React.useState<IObjectArt[]>([initialObjectArtOne, initialObjectArtAux]);

  const updateImages = useCallback(async (): Promise<void> => {
    setObjectsArts((oldState) => oldState.slice(1));

    const { objectArt: objectArtUpdatedOne, blacklist: blacklistUpdatedOne } = await new ArtProvider().getObject(
      blacklist,
      indexes
    );
    const { objectArt: objectArtUpdatedAux, blacklist: blacklistUpdated } = await new ArtProvider().getObject(
      blacklistUpdatedOne,
      indexes
    );

    setObjectsArts((oldState) => [...oldState, objectArtUpdatedOne, objectArtUpdatedAux]);
    setBlacklist(blacklistUpdated);
  }, [blacklist, indexes]);

  const nextCicle = useCallback((): void => {
    if (timeLeft === 0) {
      start();
      updateImages();
    }
  }, [start, timeLeft, updateImages]);
  useEffect(() => {
    start();
  }, [start]);

  useEffect(() => {
    nextCicle();
  }, [nextCicle]);

  return (
    <div style={{ width: '100%' }}>
      <Head>
        <title>ArtWork</title>
      </Head>

      {objectsArts.map((objectArt) => (
        <BigPicture key={objectArt.objectID} objectArt={objectArt} onPause={pause} onResume={resume} />
      ))}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const {
    objectArt: objectArtUpdatedOne,
    blacklist: blacklistUpdatedOne,
    indexes
  } = await new ArtProvider().getObject();
  const { objectArt: objectArtUpdatedAux, blacklist } = await new ArtProvider().getObject(blacklistUpdatedOne);
  const oneDayInSeconds = 60 * 60 * 24;

  return {
    props: {
      initialObjectArtOne: objectArtUpdatedOne,
      initialObjectArtAux: objectArtUpdatedAux,
      initialBlackList: blacklist,
      indexes
    },
    revalidate: oneDayInSeconds
  };
};

export default memo(Home);
