import styled from 'styled-components'

export const Wrapper = styled.div`
  position: fixed;
  z-index: 1100; //Maior do que o 1000 do Leaflet
  top: var(--medium);
  right: var(--medium);
  color: var(--white);

  cursor: pointer;

  svg {
    transition: color 0.3s ease-in-out;
  }

  &:hover {
    svg {
      color: var(--highlight);
    }
  }
`
