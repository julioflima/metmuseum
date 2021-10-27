import styled from 'styled-components';

export const Container = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: center;
  justify-content: center;

  & > * {
    user-select: none;
    -webkit-user-drag: none;
    -khtml-user-drag: none;
    -moz-user-drag: none;
    -o-user-drag: none;
    user-drag: none;
  }
`;

export const ImageContainer = styled.div`
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  align-content: center;
  justify-content: center;
  transition: all 0.2s ease-in-out;

  & > Image {
    width: 100%;
    height: 100%;
    object-fit: contain;
    opacity: 0;
    pointer-events: none;
  }
`;

export const Informations = styled.div<{ open: boolean }>`
  transition: all 1s ease-in-out;
  opacity: ${({ open }) => (open ? 1 : 0)};
  position: absolute;
  width: 100%;
  bottom: 0;
  background: ${({ theme }) => theme.colors.quintenary.one};
  color: ${({ theme }) => theme.colors.quaternary.one};

  padding: 1rem;

  & > h4 {
    font-weight: 400;
  }
`;
