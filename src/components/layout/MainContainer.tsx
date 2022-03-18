import { Container } from "@mui/material";
import { Mixins } from "@mui/material/styles/createMixins";
import { styled } from '@mui/system';
import { BackgroundPatternTiny } from "assets/img";
import Image from "components/image/image";
import React, { CSSProperties, PropsWithChildren } from "react";

const toolbarRows = 2;

const calcMainLayout = (toolbarMixins: CSSProperties) => {
  return Object.entries(toolbarMixins).reduce<[string, unknown][]>((acc, [key, value]) => {
    if (key.startsWith("@media")) {
      const { minHeight } = value as { minHeight: number };
      return [
        ...acc,
        [
          key,
          {
            paddingTop: `${minHeight * toolbarRows}px`,
          }
        ]
      ]
    } else {
      return [
        ...acc,
        ['paddingTop', `${value * toolbarRows}px`],
      ];
    }
  }, []);
}

const StyledContainer = styled('main')(({ theme: { mixins } }) => {
  const { toolbar: toolbarMixins } = mixins as Mixins;
  const toolbarCalc = calcMainLayout(toolbarMixins);

  return {
    position: 'relative',
    flex: 1,
    ...Object.fromEntries(toolbarCalc),
  }
});

const BackgroundWrapper = styled('div')(() => ({
  position: 'fixed',
  height: '100%',
  width: '100%',
  overflow: 'hidden',
  zIndex: -1,
  opacity: 0.3,
  top: 0,
}));

type MainContainerProps = {};

export const MainContainer = ({ children }: PropsWithChildren<MainContainerProps>) => {
  return (
    <StyledContainer>
      <BackgroundWrapper>
        <Image
          src={BackgroundPatternTiny}
          alt="Background pattern"
          layout="fill"
          placeholder="blur"
          objectFit="cover"
        />
      </BackgroundWrapper>
      <Container
        maxWidth="lg"
        disableGutters
        sx={{
          height: '100%',
        }}
      >
        <>
          {children}
        </>
      </Container>
    </StyledContainer>
  );
};