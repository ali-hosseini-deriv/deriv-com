import React from 'react'
import styled from 'styled-components'
import {
    Wrapper,
    Line,
    LogoDescription,
    MobileWrapper,
    HamburgerMenu,
    CloseIcon,
} from '../styles/nav-styles'
import { handleGetTrading } from '../util/nav-methods'
import device from 'themes/device'
import { LocalizedLink, localize, LanguageSwitcher } from 'components/localization'
import { Button } from 'components/form'
import { OffCanvasMenu, useMoveOffCanvasMenu } from 'components/elements'
import Hamburger from 'images/svg/layout/hamburger_menu.svg'
import Close from 'images/svg/layout/close-long.svg'
import LogoOnly from 'images/svg/layout/logo-deriv-only.svg'
import GetTrading from 'images/svg/layout/get-trading.svg'
import useHandleLogin from 'components/hooks/use-handle-login'
import useRegion from 'components/hooks/use-region'
import useAuthCheck from 'components/hooks/use-auth-check'
import { useIsRtl } from 'components/hooks/use-isrtl'

type NavMobileProps = {
    is_ppc?: boolean
    is_ppc_redirect?: boolean
    hide_language_switcher?: boolean
    hide_signup_login?: boolean
}

const LogoWrapper = styled(LocalizedLink)`
    display: flex;
    align-items: center;
    margin-left: 2rem;
`
const LeftSection = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;
`
const StyledButton = styled(Button)`
    font-size: 14px;
    margin-left: 0.8rem;
    @media ${device.mobileL} {
        font-size: 12px;
    }
`

const NavMobile = ({
    is_ppc,
    is_ppc_redirect,
    hide_language_switcher,
    hide_signup_login,
}: NavMobileProps) => {
    const [is_canvas_menu_open, openOffCanvasMenu, closeOffCanvasMenu] = useMoveOffCanvasMenu()
    const handleLogin = useHandleLogin()
    const { is_region_loading } = useRegion()
    const [is_logged_in] = useAuthCheck()
    const is_rtl = useIsRtl()

    return (
        <MobileWrapper>
            <Wrapper width="95%">
                {is_canvas_menu_open ? (
                    <CloseIcon src={Close} alt="close menu" onClick={closeOffCanvasMenu} />
                ) : (
                    <HamburgerMenu
                        src={Hamburger}
                        alt="hamburger menu"
                        onClick={openOffCanvasMenu}
                    />
                )}

                <LogoWrapper to="/" aria-label="Home">
                    <img src={LogoOnly} alt="deriv logo" width={115} />
                    <LogoDescription ai="center">
                        <Line />
                        <img src={GetTrading} alt="get trading" />
                    </LogoDescription>
                </LogoWrapper>

                <LeftSection>
                    {!hide_language_switcher && <LanguageSwitcher is_high_nav />}
                    {!hide_signup_login && (
                        <>
                            {is_logged_in ? (
                                <StyledButton
                                    disabled={is_region_loading}
                                    onClick={handleGetTrading}
                                    id="dm-hero-signup"
                                    primary
                                >
                                    {localize('Get Trading')}
                                </StyledButton>
                            ) : (
                                <StyledButton
                                    disabled={is_region_loading}
                                    id="dm-nav-login-button"
                                    onClick={handleLogin}
                                    primary
                                >
                                    {localize('Log in')}
                                </StyledButton>
                            )}
                        </>
                    )}
                </LeftSection>

                <OffCanvasMenu
                    is_canvas_menu_open={is_canvas_menu_open}
                    closeOffCanvasMenu={closeOffCanvasMenu}
                    is_ppc={is_ppc}
                    is_rtl={is_rtl}
                    is_ppc_redirect={is_ppc_redirect}
                />
            </Wrapper>
        </MobileWrapper>
    )
}

export default NavMobile
