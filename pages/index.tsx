/* eslint-disable no-await-in-loop */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { memo, useCallback, useEffect } from 'react';
import useCountDown from 'react-countdown-hook';
import BigPicture from '../components/BigPicture';
import { IObjectArt } from '../interfaces/ObjectArt';
import ArtProvider from '../providers/ArtService';

const Home: React.FC<{ indexes: number[]; initialBlackList: number[]; initialObjectArt: IObjectArt }> = ({
  indexes,
  initialBlackList,
  initialObjectArt
}) => {
  const baseSeconds = 10;
  const initialTimeMiliseconds = 1000 * baseSeconds;
  const intervaMiliseconds = 1000 * baseSeconds;

  const [timeLeft, { start, pause, resume }] = useCountDown(initialTimeMiliseconds, intervaMiliseconds);

  const [blackList, setBlackList] = React.useState<number[]>(initialBlackList);
  const [objectArtOne, setObjectArtOne] = React.useState<IObjectArt>(initialObjectArt);
  const [objectArtTwo, setObjectArtTwo] = React.useState<IObjectArt>(initialObjectArt);

  const oneOrTwo = blackList.length % 2 === 0;

  const updateIndexes = (): void => {
    const indexesFiltered = indexes.filter((index) => !blackList.includes(index));
    const randomized = Math.floor(Math.random() * indexesFiltered.length);
    const newIndex = indexesFiltered[randomized];
    setBlackList((oldState) => [...oldState, newIndex]);
  };

  const nextCicle = useCallback((): void => {
    if (timeLeft === 0) start();
  }, [start, timeLeft]);

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
      {!oneOrTwo && <BigPicture objectArt={objectArtOne} onPause={pause} onResume={resume} />}
      {oneOrTwo && <BigPicture objectArt={objectArtTwo} onPause={pause} onResume={resume} />}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { objectArt, blacklist, indexes } = await new ArtProvider().getObject();
  const oneDayInSeconds = 60 * 60 * 24;

  return {
    props: {
      initialObjectArt: objectArt,
      initialBlackList: blacklist,
      indexes
    },
    revalidate: oneDayInSeconds
  };
};

export default memo(Home);
