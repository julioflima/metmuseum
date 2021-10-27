/* eslint-disable no-await-in-loop */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { memo, useEffect } from 'react';
import BigPicture from '../components/BigPicture';
import { IObjectArt } from '../interfaces/ObjectArt';
import ArtProvider from '../providers/ArtService';

const Home: React.FC<{ indexes: number[]; initialBlackList: number[]; initialObjectArt: IObjectArt }> = ({
  indexes,
  initialBlackList,
  initialObjectArt
}) => {
  const baseSeconds = 10;
  const baseMiliseconds = 1000 * baseSeconds;

  const [blackList, setBlackList] = React.useState<number[]>(initialBlackList);
  const [objectArtOne, setObjectArtOne] = React.useState<IObjectArt>(initialObjectArt);
  const [objectArtTwo, setObjectArtTwo] = React.useState<IObjectArt>(initialObjectArt);
  const [nextCicle, setNextCicle] = React.useState<number>(new Date().getTime() + baseMiliseconds);

  const oneOrTwo = blackList.length % 2 === 0;

  const updateIndexes = (): void => {
    const indexesFiltered = indexes.filter((index) => !blackList.includes(index));
    const randomized = Math.floor(Math.random() * indexesFiltered.length);
    const newIndex = indexesFiltered[randomized];
    setBlackList((oldState) => [...oldState, newIndex]);
  };

  const updateCicle = (): void => {
    setNextCicle(new Date().getTime() + baseMiliseconds);
    updateIndexes();
  };

  useEffect(() => {
    setTimeout(() => {
      updateCicle();
    }, baseMiliseconds);
  });

  // useEffect(() => {
  //   setTimeout(() => {
  //     // setNextCicle(new Date().getTime() + baseMiliseconds);
  //   }, 1000);
  // });

  return (
    <div style={{ width: '100%' }}>
      <Head>
        <title>ArtWork</title>
      </Head>
      {!oneOrTwo && <BigPicture objectArt={objectArtOne} />}
      {oneOrTwo && <BigPicture objectArt={objectArtTwo} />}
    </div>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const { objectArt, blackList, indexes } = await new ArtProvider().getObject();
  const oneDayInSeconds = 60 * 60 * 24;

  return {
    props: {
      objectArt,
      blackList,
      indexes
    },
    revalidate: oneDayInSeconds
  };
};

export default memo(Home);
