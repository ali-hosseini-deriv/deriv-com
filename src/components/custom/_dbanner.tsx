import React from 'react'
import styled from 'styled-components'
import type { IGatsbyImageData } from 'gatsby-plugin-image'
import { Flex } from 'components/containers'
import { Header, QueryImage } from 'components/elements'
import { Button } from 'components/form'
import { Localize } from 'components/localization'
import device from 'themes/device'
import useHandleSignup from 'components/hooks/use-handle-signup'
import { useIsRtl } from 'components/hooks/use-isrtl'
import useAuthCheck from 'components/hooks/use-auth-check'
import { handleGetTrading } from 'components/layout/nav/util/nav-methods'
import useRegion from 'components/hooks/use-region'

type DBannerProps = {
    background_pattern?: string
    data?: IGatsbyImageData
    image_alt?: string
    title?: string | JSX.Element
    is_rtl: boolean
}
const Wrapper = styled.div`
    position: relative;
    display: flex;
    flex-direction: row;
    height: 33.3rem;
    width: 100%;
    overflow: hidden;
    border-top: 1px solid rgba(151, 151, 151, 0.2);
    background-color: var(--color-black);

    @media (max-width: 800px) {
        flex-direction: column;
        height: 414px;
    }
`

const BackgroundWrapper = styled(Flex)<DBannerProps>`
    width: 25%;
    background-image: url(${(props) => props.background_pattern});
    clip-path: polygon(0 0, 100% 0%, 80% 100%, 0% 100%);
    transform: ${({ is_rtl }) => {
        return is_rtl ? 'scaleX(-1)' : null
    }};

    @media (max-width: 800px) {
        clip-path: polygon(0 0, 100% 0%, 305% 163%, 0% 60%);
        width: 100%;
        height: 50%;
    }
`

const ImageContainer = styled.div`
    position: absolute;
    left: 10%;
    height: 100%;

    @media (max-width: 1680px) {
        left: 7%;
    }

    @media ${device.laptopL} {
        left: 5%;
    }

    @media (max-width: 800px) {
        left: 0;
        height: unset;
        width: 100%;
        top: 12%;
        margin-bottom: 2rem;
    }
`

const ImageWrapper = styled(Flex)`
    position: relative;
    width: 41.1rem;
    z-index: 2;
    height: 100%;

    div {
        width: 100%;
    }

    @media (max-width: 1680px) {
        width: 35rem;
    }

    @media (max-width: 1440px) {
        width: 30rem;
    }
    @media (max-width: 800px) {
        height: auto;
        width: 286px;
        text-align: center;
        margin: 0 auto;
    }
`

const TextWrapper = styled.div`
    margin: auto;
    text-align: center;
    @media (max-width: 800px) {
        margin-top: 35px;
        margin-bottom: 40px;
    }
    @media (min-width: 1351px) and (max-width: 1385px) {
        margin-right: 60px;
    }
`
const DemoButton = styled(Button)`
    text-align: center;
    height: auto;

    @media ${device.mobileL} {
        margin: unset;
    }
`
const StyledHeader = styled(Header)`
    max-width: 84rem;
    @media ${device.laptopM} {
        font-size: 4rem;
        max-width: 60rem;
    }
    @media (max-width: 800px) {
        font-size: 24px;
        max-width: 329px;
    }
`
const DBanner = ({ title, data, background_pattern, image_alt }: DBannerProps) => {
    const handleSignup = useHandleSignup()
    const { is_eu, is_row } = useRegion()
    const is_rtl = useIsRtl()
    const [is_logged_in] = useAuthCheck()

    return (
        <Wrapper>
            <ImageContainer>
                <ImageWrapper ai="center">
                    {is_row && (
                        <QueryImage data={data['deriv_platform']} alt={image_alt} width="100%" />
                    )}
                    {is_eu && (
                        <QueryImage data={data['deriv_platform_eu']} alt={image_alt} width="100%" />
                    )}
                </ImageWrapper>
            </ImageContainer>
            <BackgroundWrapper
                is_rtl={is_rtl}
                background_pattern={background_pattern}
                direction="column"
                ai="center"
            ></BackgroundWrapper>
            <TextWrapper>
                <StyledHeader as="h4" align="center" color="white" size="5.6rem" mb="3.2rem">
                    {title}
                </StyledHeader>

                {is_logged_in ? (
                    <DemoButton onClick={handleGetTrading} secondary>
                        <Localize translate_text="Get Trading" />
                    </DemoButton>
                ) : (
                    <DemoButton onClick={handleSignup} id="dm-hero-signup" secondary>
                        <Localize translate_text="Create free demo account" />
                    </DemoButton>
                )}
            </TextWrapper>
        </Wrapper>
    )
}

export default DBanner
