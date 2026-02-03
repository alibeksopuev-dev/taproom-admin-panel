import styled from 'styled-components'

export const Root = styled.div`
  position: absolute;
  top: 25%;
  height: 50%;
  width: 2px;
  background: rgba(255, 255, 255, 0.35);
  cursor: col-resize;
  user-select: none;
  touch-action: none;
  margin-right: 5px;

  &.ltr {
    right: 0;
  }

  &.rtl {
    left: 0;
  }

  &.isResizing {
    background: #774cff;
    opacity: 1;
  }

  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    height: 100%;
    background: transparent;
    cursor: col-resize;
  }

  &::before {
    left: -5px;
    width: 5px;
  }

  &::after {
    right: -5px;
    width: 5px;
  }

  @media (hover: hover) {
    opacity: 0;

    *:hover > & {
      opacity: 1;
    }
  }
`
