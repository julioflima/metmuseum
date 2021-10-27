/* eslint-disable no-await-in-loop */
import { GetStaticProps } from 'next';
import Head from 'next/head';
import React, { memo } from 'react';
import BigPicture from '../components/BigPicture';
import { IObjectArt } from '../interfaces/ObjectArt';

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
  const [loadedSecond, setLoadSecond] = React.useState<boolean>();

  const isToLoadSecond = (): boolean => (new Date().getTime() - nextCicle) / 1000 > 5;

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

  // useEffect(() => {
  //   setTimeout(() => {
  //     updateCicle();
  //   }, baseMiliseconds);
  // });

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
  // const { objectArt, blackList, indexes } = await new ArtProvider().getObject();
  const oneDayInSeconds = 60 * 60 * 24;

  return {
    props: {
      indexes: [],
      initialObjectArt: {
        objectID: 16308,
        isHighlight: false,
        accessionNumber: '1997.488.5',
        accessionYear: '1997',
        isPublicDomain: true,
        primaryImage: 'https://images.metmuseum.org/CRDImages/ad/original/DP216607.jpg',
        primaryImageSmall: 'https://images.metmuseum.org/CRDImages/ad/web-large/DP216607.jpg',
        additionalImages: [
          'https://images.metmuseum.org/CRDImages/ad/original/DP216599.jpg',
          'https://images.metmuseum.org/CRDImages/ad/original/DP216598.jpg',
          'https://images.metmuseum.org/CRDImages/ad/original/DP216608.jpg',
          'https://images.metmuseum.org/CRDImages/ad/original/263649_1997.488.5.jpg'
        ],
        constituents: [
          {
            constituentID: 2036,
            role: 'Maker',
            name: 'Bartholomew Le Roux',
            constituentULAN_URL: 'http://vocab.getty.edu/page/ulan/500094073',
            constituentWikidata_URL: 'https://www.wikidata.org/wiki/Q55720927',
            gender: ''
          }
        ],
        department: 'The American Wing',
        objectName: 'Salt',
        title: 'Trencher Salt',
        culture: 'American',
        period: '',
        dynasty: '',
        reign: '',
        portfolio: '',
        artistRole: 'Maker',
        artistPrefix: '',
        artistDisplayName: 'Bartholomew Le Roux',
        artistDisplayBio: 'ca. 1665–1713',
        artistSuffix: '',
        artistAlphaSort: 'Le Roux, Bartholomew',
        artistNationality: '',
        artistBeginDate: '1663',
        artistEndDate: '1713',
        artistGender: '',
        artistWikidata_URL: 'https://www.wikidata.org/wiki/Q55720927',
        artistULAN_URL: 'http://vocab.getty.edu/page/ulan/500094073',
        objectDate: '1690–1710',
        objectBeginDate: 1690,
        objectEndDate: 1710,
        medium: 'Silver',
        dimensions: '1 5/16 x 2 3/4 in. (3.3 x 7 cm); 2 oz. 10 dwt. (77.2 g)',
        measurements: [
          {
            elementName: 'Overall',
            elementDescription: [],
            elementMeasurements: []
          }
        ],
        creditLine: 'Gift of Suzanne dePeyster and Valerie dePeyster, 1997',
        geographyType: 'Made in',
        city: 'New York',
        state: 'New York',
        county: '',
        country: '',
        region: 'Mid-Atlantic',
        subregion: '',
        locale: '',
        locus: '',
        excavation: '',
        river: '',
        classification: '',
        rightsAndReproduction: '',
        linkResource: '',
        metadataDate: '2021-05-11T04:40:58.817Z',
        repository: 'Metropolitan Museum of Art, New York, NY',
        objectURL: 'https://www.metmuseum.org/art/collection/search/16308',
        tags: null,
        objectWikidata_URL: '',
        isTimelineWork: false,
        GalleryNumber: '750'
      },
      initialBlackList: []
    },
    revalidate: oneDayInSeconds
  };
};

export default memo(Home);
